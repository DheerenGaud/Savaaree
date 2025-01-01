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


const DriverAroundLatLong = asyncHandler(async (req, res) => {
    const { lat, long } = req.body;

    try {
        if (!lat || !long) {
            throw new ApiError(400, "Latitude and Longitude are required.");
        }
        // find segemnt
        // get all driver in that segment
        // collect  distance and time of each driver from socre lat,long
        

        const segment = getSegment(lat, long, 7);
        const neighborSegments = [segment, ...getNeighbours(segment)];

        // Fetch all drivers in nearby segments
        const drivers = await Segment.aggregate([
            {
                $match: {
                    segment: { $in: neighborSegments }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "drivers",
                    foreignField: "_id",
                    as: "Driver_Details"
                }
            },
            {
                $unwind: "$Driver_Details"
            },
            {
                $match: {
                    "Driver_Details.role": "driver"
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$Driver_Details.name",
                    location: "$Driver_Details.location"
                }
            }
        ]);

        const destinations = drivers
            .map(driver => `${driver.location.coordinates[1]},${driver.location.coordinates[0]}`)
            .join('|');

        const matrixData = await feach_DistanceMatrix_OLA_Api(lat,long,destinations);

        if (matrixData.status !== "SUCCESS") {
            throw new ApiError(400, "Failed to fetch distance matrix");
        }

        const driversWithDistance = drivers.map((driver, index) => ({
            ...driver,
            distance: matrixData.rows[0].elements[index].distance,
            duration: matrixData.rows[0].elements[index].duration
        }));

        return res.status(200).json(
            new ApiResponse(
                200,
                { drivers: driversWithDistance },
                "Successfully fetched drivers with distances."
            )
        );

    } catch (error) {
        throw new ApiError(
            error.statusCode || 500,
            error.message || "Failed to fetch drivers around Lat & Long.",
            [],
            error.stack
        );
    }
});


export{
    fetchRouteData , DriverAroundLatLong
}


