import mongoose, { Schema } from "mongoose";

const segmentSchema = new Schema(
    {
        segment: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        drivers: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true
    }
);

export const Segment = mongoose.model("Segment", segmentSchema);