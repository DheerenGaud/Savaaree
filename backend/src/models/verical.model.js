import mongoose, { Schema } from "mongoose";

const vehicleSchema = new Schema(
    {
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
            // required: true
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
            // required: true,
            // unique: true
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }, 
    },
    {
        timestamps: true
    }
);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);