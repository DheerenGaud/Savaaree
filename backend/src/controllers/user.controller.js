import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessAndRefereshTokens } from "../utils/user.js";
import { sendOtp, verifyOtp } from "../utils/otp.js";





const signUp = asyncHandler(async (req, res) => {
  const { id, phoneNo, email } = req.body;
  
  if ((!id || !email) && !phoneNo) {
    throw new ApiError(400, "Both email and phone number are required.");
  }
  const existingUser = await User.findOne({
    $or: [{ phoneNo }, { email }],
  });
  if (existingUser) {
    throw new ApiError(
      409,
      "User with the provided email or phone number already exists."
    );
  }
  if (phoneNo) {
    try {
      await sendOtp(phoneNo, 360, "register");
      return res
        .status(201)
        .json(new ApiResponse(200, null, "OTP sent successfully."));
    } catch (error) {
      throw new ApiError(
        error.statusCode || 500,
        error.message || "Failed to send OTP.",
        [],
        error.stack
      );
    }
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
  const { phoneNo,email,id } = req.body;
  
  try {
    if (!email && !phoneNo) {
      throw new ApiError(400, "Either email or phone number is required.");
    }
    const user = await User.findOne({
      $or: [
        { email: email },
        { phoneNo: phoneNo },
        { id: id }
      ],
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
  .json(new ApiResponse(200, {}, "User logged Out"))
})

export { login, signUp, OTP_verification,logout };
