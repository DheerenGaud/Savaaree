import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL + "/api/v1/rider";

export const get_RouteData_Api = createAsyncThunk("get_RouteData_Api", async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/RouteData`, data,{withCredentials:true});
      console.log("SignUp API Response:", response);
  
      return response.data;
    } catch (err) {
      // console.log(err);
      
      const errorMessage = err.response?.data || "An unknown error occurred.";
      // console.error("Error in SignUp API:", err.response?.data); // For debugging
      return rejectWithValue(errorMessage);
    }
  });