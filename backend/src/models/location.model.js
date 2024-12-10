import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema(
    {
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }
);

locationSchema.index({ location: '2dsphere' });

export const Location = mongoose.model("Location", locationSchema);