import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        name: {
            type: String,
         
        },
        email: {
            type: String,
           
        },
        phoneNo : {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        picture: {
            type: String, // cloudinary url
            default : "",
        },
        coverImage: {
            type: String, // cloudinary url
        },
        refreshToken: {
            type: String
        },
        role: {
            type: String,
            enum: ['driver', 'rider'],
            required: true
        },
        licenseNumber: {
            type: String,
            required: function() { return this.role === 'driver'; }
        },
        vehicleDetails: {
            type: Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: function() { return this.role === 'driver'; }
        },
        location: {
            type: locationSchema,
            required: false, 
        }
    },
    {
        timestamps: true
    }
);

const locationSchema = new Schema({
    segment: {
        type: String,
        required: true, // This can be optional based on your use case
        trim: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    }
});


// userSchema.methods.isPasswordCorrect = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            phoneNo: this.phoneNo,
        
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model("User", userSchema);