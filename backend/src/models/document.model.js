import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema(
  {
    licenceNo: {
      type: Number,
      unique: true, 
    },
    dob: {
      type: String, 
    },
    adharcardNo: {
      type: Number,
      unique: true, // Ensures unique values for Aadhaar numbers
    },
    photo: {
      type: String, // Path or URL to the photo
    },
    rcNo: {
      type: Number,
    },
    rcCertificate: {
      type: String, // Path or URL to the RC certificate
    },
  },
  {
    timestamps: true,
  }
);

export const Document = mongoose.model("Document", documentSchema);
