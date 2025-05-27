import mongoose, { Schema } from "mongoose";

const vehicleSchema = new Schema(
    {   type:{
           String
        },
        make: {
            type: String,
            // required: true
        },
        model: {
            type: String,
            // required: true
        },
        year: {
            type: Number,
        },
        carImages:[{
            type:String
        }],
        color: {
            type: String,
            // required: true
        },
        licensePlate: {
            type: String,
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }, 
        maxCap:{
            type:Number
        }
    },
    {
        timestamps: true
    }
);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);