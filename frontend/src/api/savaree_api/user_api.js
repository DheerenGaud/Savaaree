import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL + "/api/v1/users";

// Redux Thunk for User Sign Up API
export const user_SignUp_Api = createAsyncThunk("user_SignUp_Api", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/signUp`, data);
    return response.data;
  } catch (err) {
    // console.log(err);
    
    const errorMessage = err.response?.data || "An unknown error occurred.";
    // console.error("Error in SignUp API:", err.response?.data); // For debugging
    return rejectWithValue(errorMessage);
  }
});
export const user_OTP_Verification_Api = createAsyncThunk("user_OTP_Verification_Api", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/OTP_verification`, data);

    return response.data;
  } catch (err) {
   
    const errorMessage = err.response?.data || "An unknown error occurred.";
    return rejectWithValue(errorMessage);
  }
});
export const user_Login_Api = createAsyncThunk("user_Login_Api", async (data, { rejectWithValue }) => {

  try {
    const response = await axios.post(`${BACKEND_URL}/login`, data,{withCredentials:true});
    return response.data;
  } catch (err) {
   
    const errorMessage = err.response?.data || "An unknown error occurred.";
    return rejectWithValue(errorMessage);
  }
});
export const user_Logout_Api = createAsyncThunk("user_Logout_Api", async (data, { rejectWithValue }) => {

  try {
    const response = await axios.post(`${BACKEND_URL}/logout`, data,{withCredentials:true});
    return response.data;
  } catch (err) {
   
    const errorMessage = err.response?.data || "An unknown error occurred.";
    return rejectWithValue(errorMessage);
  }
});
export const user_Data_Api = createAsyncThunk("user_Data_Api", async (data, { rejectWithValue }) => {

  try {
    const response = await axios.post(`${BACKEND_URL}/data`,data,{withCredentials:true});
    return response.data;
  } catch (err) {
    const errorMessage = err.response?.data || "An unknown error occurred.";
    return rejectWithValue(errorMessage);
  }
});
