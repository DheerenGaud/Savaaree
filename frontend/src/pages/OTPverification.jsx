import React, { useState } from 'react';
import styles from "../style";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


//api
import { user_OTP_Verification_Api } from "../api/savaree_api/user_api";

function OTPverification() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {phoneNo,role,email,id,name,picture} = useSelector((state) => state.UserSlice);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numeric input
    if (isNaN(value)) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleContinue = async() => {
    const otpValue = otp.join('');
    if (otpValue.length === 4) {
        const result = await dispatch(user_OTP_Verification_Api({otp:otpValue,phoneNo,OTPtype:"register",role,email,id,name,picture}));
        if(result.payload.success){
          alert(`OTP Verified: ${result.payload.data}`);
              navigate(`/${role}`);
        }
    } else {
      alert('Please enter a valid 4-digit OTP');
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '']);
    document.getElementById('otp-input-0').focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center pb-[200px] p-5">
      <div className="bg-discount-gradient flex flex-col space-y-3 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <p className="text-lg text-white">OTP Verification</p>
        </div>
        <div className="space-y-5">
          <div className="flex w-full flex-row space-x-4 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                maxLength={1}
                className="w-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-center"
              />
            ))}
          </div>
          <button
            onClick={handleContinue}
            className={`${styles.btnCSS} w-full`}
          >
            Continue
          </button>
        </div>
        <button
          onClick={handleResend}
          className={`${styles.btnCSS}`}
        >
          Resend
        </button>
        <div className="text-center text-gray-500 text-sm">
          <p>
            By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means,
            from Uber and its affiliates to the number provided.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OTPverification;