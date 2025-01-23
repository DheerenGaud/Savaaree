import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// OLA api
import { feach_DistanceMatrix_OLA_Api, fetchRouteData_OLA_Api } from "../ola_api/routing_api.js";

// utils
import { getNeighbours, getSegment } from "../utils/geoHash.js";

// Model
import { Segment } from "../models/segment.model.js";
import { User } from "../models/user.model.js";
import { Ride } from "../models/ride.model.js";

const createPassenger = (pickupLocation, dropLocation, userId, duration, distance) => {
    return {
        userId,
        pickupLocation,
        dropLocation,
        joinTime: new Date().toISOString(), // Current time in ISO format
        dropTime: new Date(Date.now() + duration * 1000).toISOString(), // Adds duration in milliseconds
        distance: convertDistance(distance), // Calls convertDistance to format distance
        duration: convertDuration(duration), // Calls convertDuration to format duration
    };
};


function convertDistance(distance) {
    const readableDistance = (distance / 1000).toFixed(2); // Convert to km and round to 2 decimal places
    return `${readableDistance} km`;
}

function convertDuration(duration) {
    const hours = Math.floor(duration / 3600); // Calculate hours
    const minutes = Math.floor((duration % 3600) / 60); // Calculate remaining minutes
    return `${hours} hours ${minutes} minutes`;
}


const fetchRouteData = asyncHandler(async (req, res) => {
    const { source_lat, source_long, destination_lat, destination_long } = req.body;
    // faceh route data by ola api
    try {
        if (!source_lat || !source_long || !destination_lat || !destination_long) {
            throw new ApiError(400, "Incomplete Source & Destination");
        }

        const data = await fetchRouteData_OLA_Api(source_lat, source_long, destination_lat, destination_long);

        if (data.status !== "SUCCESS") {
            throw new ApiError(400, "Failed to Fetch Route Data");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                data,
                "Successfully Fetched Route Data"
            )
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message || "Failed to fetch route data.", [], error.stack);
    }
});

// const getDriversForRoute = asyncHandler(async (req, res) => {
//     const { locations, path } = req.body;
//     const { pickup } = locations;

//     try {
//         const segment = getSegment(pickup.lat, pickup.long, 7);
//         const neighbors = getNeighbours(segment);
//         const neighborSegments = [segment, ...neighbors].map(String);

//         // Escape special characters in the path for safe regex
//         const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

//         const drivers = await Segment.aggregate([
//             {
//                 $match: {
//                     segment: { $in: neighborSegments }
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "users",
//                     localField: "drivers",
//                     foreignField: "_id",
//                     as: "driversInfo"
//                 }
//             },
//             {
//                 $unwind: "$driversInfo"
//             },
//             {
//                 $lookup: {
//                     from: "rides",
//                     localField: "driversInfo.currentRide",
//                     foreignField: "_id",
//                     as: "currentRideInfo"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "vehicles",
//                     localField: "driversInfo.vehicle",
//                     foreignField: "_id",
//                     as: "vehicleInfo"
//                 }
//             },
//             {
//                 $addFields: {
//                     currentRideInfo: { $arrayElemAt: ["$currentRideInfo", 0] },
//                     vehicleInfo: { $arrayElemAt: ["$vehicleInfo", 0] }
//                 }
//             },
//             {
//                 $match: {
//                     $or: [
//                         // Exact path match
//                         { "currentRideInfo.path": path },
//                         // Partial path match
//                         { "currentRideInfo.path": { $regex: escapedPath, $options: "i" } },
//                         // Check if path contains current ride path
//                         { "currentRideInfo.path": { $in: [path] } }
//                     ]
//                 }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     driverId: "$driversInfo._id",
//                     name: "$driversInfo.name",
//                     phone: "$driversInfo.phoneNo",
//                     vehiclePlateNo: "$vehicleInfo.licensePlate",
//                     rideDistance: {
//                         $sum: "$currentRideInfo.passengers.distance"
//                     },
//                     rideDuration: {
//                         $sum: {
//                             $map: {
//                                 input: "$currentRideInfo.passengers",
//                                 as: "passenger",
//                                 in: {
//                                     $subtract: [
//                                         { $toDate: "$$passenger.dropTime" },
//                                         { $toDate: "$$passenger.joinTime" }
//                                     ]
//                                 }
//                             }
//                         }
//                     },
//                     passengerCount: { $size: "$currentRideInfo.passengers" },
//                     currentRideStatus: "$currentRideInfo.status",
//                     vehicleType: "$vehicleInfo.type",
//                     vehicleImages: "$vehicleInfo.carImages"
//                 }
//             }
//         ]);

//         return res.status(200).json({
//             success: true,
//             drivers,
//             message: "Drivers fetched successfully"
//         });

//     } catch (error) {
//         console.error("Error in getDriverForRoute:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error while fetching drivers",
//             error: error.message
//         });
//     }
// });

const getDriversForRoute = asyncHandler(async (req, res) => {
    const { locations, path } = req.body;
    const { pickup } = locations;

    try {
        // Compute segments more efficiently
        const segment = getSegment(pickup.lat, pickup.long, 7);
        const neighborSegments = [
            segment, 
            ...getNeighbours(segment)
        ].map(String);

        // Aggregate pipeline with optimized stages
        const drivers = await Segment.aggregate([
            // Early filtering of segments
            {
                $match: {
                    segment: { $in: neighborSegments }
                }
            },
            // Efficient lookups with early projections
            {
                $lookup: {
                    from: "users",
                    let: { driverIds: "$drivers" },
                    pipeline: [
                        { $match: { $expr: { $in: ["$_id", "$$driverIds"] } } },
                        { $project: {
                            _id: 1,
                            name: 1,
                            phoneNo: 1,
                            currentRide: 1,
                            vehicle: 1
                        }}
                    ],
                    as: "driversInfo"
                }
            },
            // Unwind carefully
            {
                $unwind: {
                    path: "$driversInfo",
                    preserveNullAndEmptyArrays: false
                }
            },
            // Parallel lookups with minimal processing
            {
                $lookup: {
                    from: "rides",
                    localField: "driversInfo.currentRide",
                    foreignField: "_id",
                    pipeline: [
                        { $project: {
                            path: 1,
                            passengers: 1,
                            status: 1
                        }}
                    ],
                    as: "currentRideInfo"
                }
            },
            {
                $lookup: {
                    from: "vehicles",
                    localField: "driversInfo.vehicle",
                    foreignField: "_id",
                    pipeline: [
                        { $project: {
                            licensePlate: 1,
                            type: 1,
                            carImages: 1
                        }}
                    ],
                    as: "vehicleInfo"
                }
            },
            // Efficient array element extraction
            {
                $addFields: {
                    currentRideInfo: { $first: "$currentRideInfo" },
                    vehicleInfo: { $first: "$vehicleInfo" }
                }
            },
            // Optimized path matching
            {
                $match: {
                    $or: [
                        { "currentRideInfo.path": path },
                        { "currentRideInfo.path": { $regex: path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } }
                    ]
                }
            },
            // Efficient projection with computed fields
            {
                $project: {
                    driverId: "$driversInfo._id",
                    name: "$driversInfo.name",
                    phone: "$driversInfo.phoneNo",
                    vehiclePlateNo: "$vehicleInfo.licensePlate",
                    rideDetails: {
                        distance: { $sum: "$currentRideInfo.passengers.distance" },
                        duration: {
                            $sum: {
                                $map: {
                                    input: "$currentRideInfo.passengers",
                                    as: "passenger",
                                    in: {
                                        $subtract: [
                                            { $toDate: "$$passenger.dropTime" },
                                            { $toDate: "$$passenger.joinTime" }
                                        ]
                                    }
                                }
                            }
                        },
                        passengerCount: { $size: "$currentRideInfo.passengers" },
                        status: "$currentRideInfo.status"
                    },
                    vehicle: {
                        type: "$vehicleInfo.type",
                        images: "$vehicleInfo.carImages"
                    }
                }
            }
        ]).option({ maxTimeMS: 30000 }); // Add a timeout to prevent long-running queries

        // Structured response
        return res.status(200).json({
            success: true,
            drivers,
            count: drivers.length,
            message: "Drivers fetched successfully"
        });

    } catch (error) {
        // Comprehensive error handling
        console.error("Error in getDriversForRoute:", error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching drivers",
            errorDetails: {
                name: error.name,
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            }
        });
    }
});

const confirmRide = asyncHandler(async (req, res) => {
    const {shereingStatus,driverId,path,locations,duration,distance,rideId,vehicle} = req.body;
    
   try {
    if(req.user.currentRide!=null){
        throw new ApiError(400, "Alredy have Ride");
    }

     const { pickup, dropoff } = locations;
     const pickupLocation = {
         segment : getSegment(pickup.lat,pickup.long,7),
         lat:pickup.lat,
         long:pickup.long
     }
     const dropLocation = {
         segment: getSegment(dropoff.lat,dropoff.long,7),
         lat:dropoff.lat,
         long:dropoff.long
     }
     const newPassenger = createPassenger(pickupLocation,dropLocation,req.user._id,duration,distance)
     
     if(!rideId){
        
         const newRide =  await Ride.create({
             driver:driverId,
             startLocation:pickupLocation,
             endLocation:dropLocation,
             passengers:[newPassenger],
             shereingStatus:shereingStatus,
             path:path,
             vehicle:vehicle
         })
         //send notification
         await User.findOneAndUpdate({_id:driverId},{
            currentRide:newRide._id,
         },)
         await User.findOneAndUpdate(req.user._id,{
            currentRide:newRide._id,
         },)
     }
     else{
         await Ride.findOneAndUpdate(
            {_id:rideId},
            {
              $push:{
                passengers:newPassenger
              }
            },
      )
      
      await User.findOneAndUpdate(req.user._id,{
        currentRide:rideId,
     },)
     }
     return res.status(200).json(
        new ApiResponse(
             200,
            "Successfully confirmRide"
        )
    );
   } catch (error) {
    throw new ApiError(error.statusCode || 500, error.message || "Failed to confirmRide.", [], error.stack);
   }
      

})    
export{
    fetchRouteData , getDriversForRoute,confirmRide
}


