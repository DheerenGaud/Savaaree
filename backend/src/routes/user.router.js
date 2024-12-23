import { Router } from "express";
import { signUp, OTP_verification ,login ,logout } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// router.route("/register").post(
//     upload.fields([
//         {
//             name: "avatar",
//             maxCount: 1
//         }, 
//         {
//             name: "coverImage",
//             maxCount: 1
//         }
//     ]),
//     registerUser
//     )

router.route("/signUp").post(signUp)
router.route("/OTP_verification").post(OTP_verification)
router.route("/login").post(login)
router.route("/logout").post(verifyJWT,logout)

export default router