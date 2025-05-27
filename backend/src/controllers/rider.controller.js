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
    const { source_lat, source_lng, destination_lat, destination_lng } = req.body;
    // faceh route data by ola api
    console.log(source_lat, source_lng, destination_lat, destination_lng);
    
    try {
        if (!source_lat || !source_lng || !destination_lat || !destination_lng) {
            throw new ApiError(400, "Incomplete Source & Destination");
        }

        const data = await fetchRouteData_OLA_Api(source_lat, source_lng, destination_lat, destination_lng);
        // console.log(data);
        
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
//         const segment = getSegment(pickup.lat, pickup.lng, 7);
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
        const segment = getSegment(pickup.coordinates.lat, pickup.coordinates.lng, 6);
        const neighborSegments = [segment, ...getNeighbours(segment)].map(String);
        console.log(pickup);
        // console.log(neighborSegments);

        // Aggregate pipeline to fetch drivers
        const drivers = await Segment.aggregate([
            { $match: { segment: { $in: neighborSegments } } },
            {
                $lookup: {
                    from: "users",
                    let: { driverIds: "$drivers" },
                    pipeline: [
                        { $match: { $expr: { $in: ["$_id", "$$driverIds"] } } },
                        { $project: { _id: 1, name: 1, phoneNo: 1, currentRide: 1, vehicle: 1, location: 1 } }
                    ],
                    as: "driversInfo"
                }
            },
            { $unwind: { path: "$driversInfo", preserveNullAndEmptyArrays: false } },
            {
                $lookup: {
                    from: "rides",
                    localField: "driversInfo.currentRide",
                    foreignField: "_id",
                    pipeline: [{ $project: { path: 1, passengers: 1, status: 1 } }],
                    as: "currentRideInfo"
                }
            },
            {
                $lookup: {
                    from: "vehicles",
                    localField: "driversInfo.vehicle",
                    foreignField: "_id",
                    pipeline: [{ $project: { licensePlate: 1, type: 1, carImages: 1, maxCap: 1, make: 1, model: 1 } }],
                    as: "vehicleInfo"
                }
            },
            { $addFields: { currentRideInfo: { $first: "$currentRideInfo" }, vehicleInfo: { $first: "$vehicleInfo" } } },
            {
                $match: {
                    $or: [
                        { "currentRideInfo": null },
                        { "currentRideInfo.path": path },
                        { "currentRideInfo.path": { $regex: path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } }
                    ]
                }
            },
            {
                $project: {
                    driverId: "$driversInfo._id",
                    name: "$driversInfo.name",
                    phone: "$driversInfo.phoneNo",
                    vehiclePlateNo: "$vehicleInfo.licensePlate",
                    location: "$driversInfo.location", // Add location for distance calculation
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
                        passengerCount: { $cond: { if: { $isArray: "$currentRideInfo.passengers" }, then: { $size: "$currentRideInfo.passengers" }, else: 0 } },
                        status: "$currentRideInfo.status"
                    },
                    vehicle: {
                        type: "$vehicleInfo.type",
                        images: "$vehicleInfo.carImages",
                        maxCap: "$vehicleInfo.maxCap",
                        make: "$vehicleInfo.make",
                        model: "$vehicleInfo.model",
                    },
                    isFree: { $eq: ["$driversInfo.currentRide", null] }
                }
            }
        ]).option({ maxTimeMS: 30000 });

        // Fetch duration for each driver asynchronously
        const driversWithDurations = await Promise.all(drivers.map(async (driver) => {
            try {
                const x = await feach_DistanceMatrix_OLA_Api(
                    pickup.coordinates.lat,
                    pickup.coordinates.lng,
                    driver.location.lat,
                    driver.location.lng
                );
                driver.duration = convertDuration(x.rows[0].elements[0].duration);
            } catch (error) {
                console.error("Error fetching duration for driver:", driver.driverId, error);
                driver.duration = null; // Handle errors gracefully
            }
            return driver;
        }));

        // Separate free and busy drivers
        const freeDrivers = driversWithDurations.filter(driver => driver.isFree);
        const busyDrivers = driversWithDurations.filter(driver => !driver.isFree);

        return res.status(200).json({
            success: true,
            drivers: busyDrivers,
            freeDrivers,
            count: driversWithDurations.length,
            freeCount: freeDrivers.length,
            message: "Drivers fetched successfully"
        });

    } catch (error) {
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
         segment : getSegment(pickup.coordinates.lat,pickup.coordinates.lng,7),
         lat:pickup.coordinates.lat,
         lng:pickup.coordinates.lng
     }
     const dropLocation = {
         segment: getSegment(dropoff.lat,dropoff.lng,7),
         lat:dropoff.lat,
         lng:dropoff.lng
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


