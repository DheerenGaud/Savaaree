
import { Vonage } from '@vonage/server-sdk';
import { ApiError } from "../utils/ApiError.js";
import {OtpModel} from "../models/otp.model.js"



const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();


const sendOtp = async (phoneNumber, expiryTimeInSeconds = 300, type) => {
  try {
    const existingOtp = await OtpModel.findOne({ phoneNumber, type });
    if (existingOtp && new Date() < existingOtp.expireAt) {
        throw new ApiError(400, "The OTP is not expired yet. Please wait before requesting a new OTP.");`` 
    }

    if (existingOtp) {
      await OtpModel.deleteOne({ _id: existingOtp._id });
    }

    // Generate a new OTP and save it in the database
    const otp = generateOtp();
    const expireAt = new Date(Date.now() + expiryTimeInSeconds * 1000);
    const otpDocument = new OtpModel({
      phoneNumber,
      otp,
      expireAt,
      type,
    });
    await otpDocument.save();

    // Send OTP via Vonage SMS
    const text = `Your OTP is ${otp}. It will expire in ${expiryTimeInSeconds / 60} minutes.`;
    console.log(`Sending OTP to ${phoneNumber}: ${text}`);
    console.log("SMS sent successfully:");
    // await vonage.sms
    //   .send({ to: phoneNumber, from: process.env.BRAND_NAME, text })
    //   .then((response) => {
    //     console.log("SMS sent successfully:", response);
    //   })
    //   .catch((error) => {
    //     console.error("Error sending SMS:", error.message);
    //     throw new ApiError(500, "Failed to send OTP SMS.");
    //   });
  } catch (error) {

    throw new ApiError(error.statusCode || 500, error.message || "Failed to send OTP.");
  }
};



const verifyOtp = async (phoneNumber,userOtp,type) => {
  console.log(phoneNumber,userOtp,type);
  
  try {
    const otpDocument = await OtpModel.findOne({ phoneNumber,otp:userOtp,type });

    if (!otpDocument) {
      throw new ApiError(400, "Invalid OTP");
    }

    const currentTime = new Date();
    if (otpDocument.expireAt < currentTime) {
      await OtpModel.deleteOne({ _id: otpDocument._id }); // Clean up expired OTP
      throw new ApiError(400, "OTP expired");
    }

    // OTP is valid
    await OtpModel.deleteOne({ _id: otpDocument._id }); // Delete the OTP after successful verification
    // return { success: true, message: 'OTP verified successfully' };

  } catch (error) {
    throw new ApiError(error.statusCode || 500, error.message || "Failed to verifi OTP.");

  }
};

export {
  sendOtp,
  verifyOtp
}