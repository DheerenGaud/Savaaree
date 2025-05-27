import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// utilsasyncHandler
import { generateAccessAndRefereshTokens } from "../utils/user.js";
import { sendOtp, verifyOtp } from "../utils/otp.js";

// Model
import { User } from "../models/user.model.js";




const signUp = asyncHandler(async (req, res) => {
  const { id, phoneNo, email  ,role} = req.body;

  try {
     if ((!id || !email) && !phoneNo) {
      throw new ApiError(400, "Either email or phone number is required.");
    }
    
    
    // Check if a user with the same email or phone number already exists
    const existingUser = await User.findOne({
      $or: [{ phoneNo }, { email }],
      $and:[
        {role:role}
     ]
    });
    
    if (existingUser) {
      throw new ApiError(
        409,
        "User with the provided email or phone number already exists."
      );
    }

    // Send OTP if phone number is provided
    if (phoneNo) {
      await sendOtp(phoneNo, 360, "register");
      return res
        .status(201)
        .json(
          new ApiResponse(200, null, "OTP sent successfully.")
        );
    }

    // Handle the case where neither phoneNo nor other valid data exists
    throw new ApiError(400, "Phone number is required for registration.");
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to send OTP.",
      [],
      error.stack
    );
  }
});


const OTP_verification = asyncHandler(async (req, res) => {
  const { otp, phoneNo, OTPtype } = req.body;

  try {
    console.log(req.body);
    await verifyOtp(phoneNo, otp, OTPtype);

    const newUser = await User(req.body);
    if (newUser) {
      await newUser.save(req.body);
      const { accessToken, refreshToken } =
        await generateAccessAndRefereshTokens(newUser._id);

      const loggedInUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
      );

      const options = {
        httpOnly: true,
        secure: true,
      };

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              user: loggedInUser,
              accessToken,
              refreshToken,
            },
            "User logged In Successfully"
          )
        );
    } else {
      throw new ApiError(500, "Failed to Create user", []);
    }
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to send OTP.",
      [],
      error.stack
    );
  }
});

const login = asyncHandler(async (req, res) => {
  const { phoneNo,email,id ,role} = req.body;
  
  try {
    if(!role){
      console.log(role); 
      throw new ApiError(400, "role is not selected");
    }
    
    const queryConditions = [];
    if (email) queryConditions.push({ email: email.trim() });
    if (phoneNo) queryConditions.push({ phoneNo: phoneNo.trim() });
    if (id) queryConditions.push({ id: id.trim() });
    
    if (queryConditions.length === 0) {
      throw new ApiError(400, "Either email, phone number, or id is required.");
    }
    
    const user = await User.findOne({
      $or: queryConditions,
      role: role
    });

    
    if (!user) {
      throw new ApiError(404, "User does not exist...");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select("-refreshToken");

    // Define secure cookie options
    const cookieOptions = {
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    // Set cookies and respond with user data
    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .cookie("authenticated",true)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged in successfully."
        )
      );
  } catch (error) {
        // console.error("Login error:", error);
        throw new ApiError(error.statusCode || 500, error.message || "Login failed.", [],error.stack )
  }
});

const logout = asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(
      req.user._id,
      {
          $unset: {
              refreshToken: 1 // this removes the field from document
          }
      },
      {
          new: true
      }
  )

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .clearCookie("authenticated")
  .json(new ApiResponse(200, {}, "User logged Out"))
})

const userData = asyncHandler(async(req, res) => {
  
  try {
      const user = req.user;
      if(user){
        return res
        .status(201)
        .json(
          new ApiResponse(200, user)
        );
      }
  } catch (error) {
    throw new ApiError(error.statusCode || 500, error.message || "Login failed.", [],error.stack )
  }
})

export { login, signUp, OTP_verification,logout ,userData};
