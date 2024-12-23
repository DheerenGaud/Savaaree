import mongoose  from "mongoose";

const otpSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // TTL index based on this field
  },
});


export const OtpModel = mongoose.model("Otp", otpSchema);