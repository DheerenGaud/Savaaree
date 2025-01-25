import mongoose, { Schema } from "mongoose";

const socketSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        socketId: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

export const Socket = mongoose.model("Socket", socketSchema);