import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
    {
        ride: {
            type: Schema.Types.ObjectId,
            ref: 'Ride',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ['credit_card', 'debit_card', 'cash'],
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
);

export const Payment = mongoose.model("Payment", paymentSchema);