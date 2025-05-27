import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import styles from "../style";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { add_User_Profile } from '../redux/slice/userSlice';
// API
import { user_SignUp_Api } from "../api/savaree_api/user_api";

function PhoneNO() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, phoneNo, id, role } = useSelector((state) => state.UserSlice);

  // Handle phone number input change

  // useEffect(() => {
  //   const handleSignUp = async () => {
  //     if (phoneNo) {
  //       const result = await dispatch(user_SignUp_Api({ email, phoneNo , id }));
  //       if (result.payload.success) {
  //         navigate("/OTPverification");
  //       }
  //       else{
  //         dispatch(add_User_Profile({phoneNo:null}))
  //         navigate("/login");
  //       }
  //     }
  //   };
  
  //   handleSignUp();
  // }, []);
  
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleSendOtp = async () => {
    const fullPhoneNumber = countryCode + phoneNumber;
    if (phoneNumber.length === 10) {

        // Update user profile with phone number
          dispatch(add_User_Profile({ phoneNo: fullPhoneNumber }));
          
          const result = await dispatch(user_SignUp_Api({ email, phoneNo: fullPhoneNumber, id ,role}));
          if(result.payload.success){
             navigate("/OTPverification");
          }

    } else {
      alert('Please enter a valid 10-digit phone number');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pb-[200px] p-5">
      <div className="bg-discount-gradient flex flex-col space-y-3 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <p className="text-lg text-white">Enter Your Phone Number</p>
        </div>
        <div className="space-y-5">
          <div className="flex w-full items-center space-x-4">
            {/* Country Flag and Code Selector */}
            <div className="flex-shrink-0">
              <PhoneInput
                placeholder="Enter phone number"
                value={countryCode}
                onChange={setCountryCode}
                defaultCountry="IN" // Default country code (e.g., India)
                className="w-[90px] h-12 border p-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                countrySelectProps={{ className: "w-full" }}
                international
                withCountryCallingCode
              />
            </div>
            {/* Phone Number Input Field */}
            <input
              type="text"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* Send OTP Button */}
          <button
            onClick={handleSendOtp}
            className={`${styles.btnCSS} w-full`}
          >
            Send OTP
          </button>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>
            By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means,
            from Uber and its affiliates to the number provided.
          </p>
        </div>
      </div>
      {/* reCAPTCHA Container */}
    </div>
  );
}

export default PhoneNO;
