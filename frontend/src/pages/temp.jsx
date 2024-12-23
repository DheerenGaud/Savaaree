import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config"; // Ensure this is correctly configured
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const PhoneNo = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize reCAPTCHA verifier
  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible", // or 'normal' if you want to show the reCAPTCHA widget
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignup();
          },
          "expired-callback": () => {
            // Reset reCAPTCHA if expired
            toast.error("reCAPTCHA expired. Please try again.");
          },
        },
        auth
      );
    }
  };

  // Send OTP to the phone number
  const onSignup = () => {
    setLoading(true);
    onCaptchVerify();

    const formattedPhoneNumber = "+" + ph; // Format phone number with country code
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        setLoading(false);
        toast.error("Failed to send OTP. Please try again.");
      });
  };

  // Verify the OTP entered by the user
  const onOTPVerify = () => {
    setLoading(true);
    if (window.confirmationResult) {
      window.confirmationResult
        .confirm(otp)
        .then((res) => {
          console.log("OTP verified successfully:", res);
          setUser(res.user);
          setLoading(false);
          toast.success("Login successful!");
        })
        .catch((err) => {
          console.error("Error verifying OTP:", err);
          setLoading(false);
          toast.error("Invalid OTP. Please try again.");
        });
    } else {
      setLoading(false);
      toast.error("OTP verification failed. Please try again.");
    }
  };

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> CODE A PROGRAM
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PhoneNo;