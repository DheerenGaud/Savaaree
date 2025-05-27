import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
    {
        ride: {
            type: Schema.Types.ObjectId,
            ref: 'Ride',
            required: true
        },
        reviewer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        reviewee: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export const Review = mongoose.model("Review", reviewSchema);