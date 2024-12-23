import React, { useState, useEffect, useRef } from 'react';
import styles from "../style";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import toast  from "react-hot-toast";


import {jwtDecode} from "jwt-decode";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { useNavigate } from 'react-router-dom';

import { useDispatch ,useSelector} from 'react-redux';
import { add_User_Profile } from '../redux/slice/userSlice';

//api
import { user_Login_Api ,user_SignUp_Api} from "../api/savaree_api/user_api.js";



function Login() {
  const [loginMethod, setLoginMethod] = useState('email');
  const [inputValue, setInputValue] = useState('');
  const [countyCode, setCountyCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {navigateTo} = useSelector((state) => state.HelperSlice);
  const { email, phoneNo  } = useSelector((state) => state.UserSlice);
  
  
  const [user, setUser] = useState(null);
 
  useEffect(()=>{
         if(navigateTo==null){
          toast.error("1st select user type (rider/driver)")
             navigate("/")
         }
  },[])



  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(  () => {
    if (user) {
        axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then(async(res) => {
          dispatch(add_User_Profile(res.data))
          if(navigateTo=="login"){     
            console.log(email);
             
            const result = await dispatch(user_Login_Api({email:res.data.email}));
              if(result.payload.success){
                  navigate("/rider");
               }
         }
         else{
            navigate("/PhoneNO");
         }
        }
        )
        .catch((err) => console.log(err));
    }
  }, [user]);


  useEffect(() => {
    if (inputValue) {
      if (inputValue.length < 2) {
        setLoginMethod('email');
      } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
        setLoginMethod('email');
      } else if (/^\d+$/.test(inputValue)) {
        setPhoneNumber(inputValue);
        setLoginMethod('phone');
      }
    } else {
      setLoginMethod('email');
    }
  }, [inputValue]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [loginMethod]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handlePhoneNumberChange = (value) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 10) {
      setPhoneNumber(numericValue);
    }
    if (numericValue.length < 2) {
      setInputValue(numericValue);
      setLoginMethod('email');
    }
  };

  const handleContinue = async() => {
    if (loginMethod === 'email') {
      if (inputValue) {
        // alert(`Logging in with email: ${inputValue}`);
        
        dispatch(add_User_Profile({email:inputValue}))
        if(navigateTo=="login"){      
          const result = await dispatch(user_Login_Api({email:inputValue}));
            if(result.payload.success){
                navigate("/rider");
             }
       }
       else{
          navigate("/PhoneNO");
       }
      } else {
        alert('Please enter a valid email');
      }
    } else if (loginMethod === 'phone') {
      if (phoneNumber.length === 10) {
        setInputValue("")
        dispatch(add_User_Profile({phoneNo:countyCode + phoneNumber}))
        if(navigateTo=="login"){      
          const result = await dispatch(user_Login_Api({phoneNo:countyCode + phoneNumber}));
            if(result.payload.success){
                navigate("/rider");
             }
       }
       else{
        const result = await dispatch(user_SignUp_Api({ phoneNo:countyCode + phoneNumber  }));
        if(result.payload.success){
          navigate("/OTPverification");
       }
       }
        // alert(`Logging in with phone number: ${countyCode + phoneNumber}`);
      } else {
        alert('Please enter a valid 10-digit phone number');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pb-[200px] p-5">
      <div className="bg-discount-gradient flex flex-col space-y-3 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <p className="text-lg text-white">Login</p>
        </div>
        <div className="space-y-3">
          {loginMethod === 'email' ? (
            <input
              type="text"
              placeholder="Enter email or Phone No"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              ref={inputRef}
              autoFocus
            />
          ) : (
            <div className="flex items-center space-x-4">
              <PhoneInput
                placeholder="Enter phone number"
                value={countyCode}
                onChange={(value) => setCountyCode(value)}
                defaultCountry="IN"
                className="w-[90px] h-12 border p-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                countrySelectProps={{ className: "w-full" }}
                international
                withCountryCallingCode
              />
              <input
                type="text"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                ref={inputRef}
                autoFocus
              />
            </div>
          )}
          <button onClick={handleContinue} className={`${styles.btnCSS} w-full`}>
            Continue
          </button>
        </div>
        <div className="text-white w-full flex flex-row justify-center">or</div>
        <div>
          <button
            onClick={() => login()}
            className={`${styles.btnCSS} w-full flex flex-row justify-center`}
          >
            <img src="assets/google_logo.svg" alt="google" className="w-[30px] h-[25px] pr-1" />
            Continue with Google
          </button>
         

        </div>
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

export default Login;
