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
import { Document } from "../models/document.model.js";


import { uploadPhotoToS3 } from "../services/aws.js";
import { Vehicle } from "../models/verical.model.js";


const updateLocation = asyncHandler(async (req, res) => {
    const { lat, long } = req.body;

    try {
        if (!lat || !long) {
            throw new ApiError(400, "Latitude and Longitude are required.");
        }

        const segment = getSegment(lat, long, 7);
        const driver = req.user;
        const oldSegment = driver?.location?.segment;

        if (oldSegment !== segment) {
            
            if (oldSegment) {
                // Remove the driver from the old segment
                await Segment.findOneAndUpdate(
                    { segment: oldSegment },
                    { $pull: { drivers: driver._id } }
                );

                // Check if the old segment is now empty
                const updatedOldSegment = await Segment.findOne({ segment: oldSegment });
                if (updatedOldSegment && updatedOldSegment.drivers.length === 0) {
                    await Segment.findOneAndDelete({ segment: oldSegment });
                }
            }

            // Add the driver to the new segment, creating it if necessary
            await Segment.findOneAndUpdate(
                { segment },
                { $push: { drivers: driver._id } },
                { upsert: true }
            );
        }

        // Update the user's location
        await User.findOneAndUpdate(
            { _id: driver._id },
            {
                $set: {
                    "location.segment": segment,
                    "location.lat": lat,
                    "location.long": long,
                },
            },
            { new: true }
        );

        return res.status(200).json(
            new ApiResponse(200, "Location Successfully Updated")
        );
    } catch (error) {
        throw new ApiError(
            error.statusCode || 500,
            error.message || "Failed to update location.",
            [],
            error.stack
        );
    }
});


const updateDocument = asyncHandler(async (req, res) => {
    try {
        // Validate file existence
        if (!req.file) {
            throw new ApiError(400, "Driver photo is required");
        }

        // Upload photo to S3
        const photoUrl = await uploadPhotoToS3('savaaree', req.file.path);
        if (!photoUrl) {
            throw new ApiError(400, "Error while uploading photo");
        }

        // Create document with photo URL
        const document = await Document.create({
            ...req.body,
            photo: photoUrl
        });
        
        
        // Update user's documents
        await User.findByIdAndUpdate(
            req.user._id,
            { documents: document._id },
            { new: true }
        );

        return res.status(200).json(
            new ApiResponse(200, "Document Successfully Updated")
        );
    } catch (error) {
        console.error("Error in updateDocument:", error);
        throw new ApiError(
            error.statusCode || 500,
            error.message || "Error while updating document"
        );
    }
});


const addVehicle = asyncHandler(async (req, res) => {
    try {
      const { vehicleData } = req.body;
       // Validate file existence
       if (!req.files) {
        throw new ApiError(400, "Vehicle photo not guiven");
    }
    //  console.log(vehicleData);
     
      // Handle multiple files
      const photoUrls = [];
      for (let file of req.files) {
        const photoUrl = await uploadPhotoToS3('savaaree', file.path);
        photoUrls.push(photoUrl);
      }
  
      const vehicle = new Vehicle({ ...vehicleData, driver: req.user._id, carImages: photoUrls }); 
      await vehicle.save();

      await User.findByIdAndUpdate(
        req.user._id,
        { vehicle: vehicle._id },
        { new: true }
    );
  
      return res.status(200).json(
        new ApiResponse(200, vehicle, "Vehicle created successfully.")
      );
    } catch (error) {
      throw new ApiError(
        error.statusCode || 500,
        error.message || "Failed to update location.",
        [],
        error.stack
      );
    }
  });
  
const updateVehicleInfo = asyncHandler(async (req, res) => {
    try {
      const {vehicleId,updatedData} = req.body
      const vehicle = await Vehicle.findById(vehicleId);
  
      if (!vehicle) {
        throw new Error("Vehicle not found.");
      }
  
      // Update only the provided fields
      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] !== undefined) {
          vehicle[key] = updatedData[key];
        }
      });
  
      await vehicle.save();
      return {
        success: true,
        message: "Vehicle updated successfully.",
        data: vehicle,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to update vehicle.",
        error,
      };
    }
  });
  

export {
    updateLocation,
    updateDocument,
    addVehicle,
    updateVehicleInfo
}