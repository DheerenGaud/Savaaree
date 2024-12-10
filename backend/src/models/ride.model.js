import mongoose, { Schema } from "mongoose";

const rideSchema = new Schema(
    {
        passenger: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        pickupLocation: {
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
        dropoffLocation: {
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
        status: {
            type: String,
            enum: ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'],
            default: 'requested'
        },
        fare: {
            type: Number
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
);

rideSchema.index({ pickupLocation: '2dsphere' });
rideSchema.index({ dropoffLocation: '2dsphere' });

export const Ride = mongoose.model("Ride", rideSchema);