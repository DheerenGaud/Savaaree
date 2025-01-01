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


const updateLocation = asyncHandler(async (req, res) => {
       const {lat,long}   = req.body();
       try {
        if (!lat || !long) {
            throw new ApiError(400, "Latitude and Longitude are required.");
        }

        //find driver current segment based on lat long
        //check cuurent segemt and and segment the sotore in dp 
        // if diffrent segment then uodate the user location
        // else update the location lat , long 
        
        const segment = getSegment(lat,long,7);
        const driver = req.user;

        // if(driver.location.segment===segment){
            
        // }
        // else{
            
        // }

        User.findOneAndUpdate({_id:driver._id},{
            $set:{
                "location.segment":segment,
                "location.lat":lat,
                "location.long":long
            }
         })
        
         return res.status(200).json(
            new ApiResponse(
                200,
                "Location Successfully Updated"
            )
        );

        
       } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message || "Failed to fetch route data.", [], error.stack);
       }
})

export {
    updateLocation
}