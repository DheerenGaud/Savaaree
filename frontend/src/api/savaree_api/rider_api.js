import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL + "/api/v1/rider";

export const get_RouteData_Api = createAsyncThunk("get_RouteData_Api", async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/RouteData`, data,{withCredentials:true});
  
      return response.data;
    } catch (err) {     
      const errorMessage = err.response?.data || "An unknown error occurred.";
      return rejectWithValue(errorMessage);
    }
  });


export const get_Driver_For_Route = createAsyncThunk("get_Driver_For_Route", async (data, { rejectWithValue }) => {
  
    try {
      const response = await axios.post(`${BACKEND_URL}/getDriversForRoute`, data,{withCredentials:true});
      
      return response.data;
    } catch (err) {     
      const errorMessage = err.response?.data || "An unknown error occurred.";
      return rejectWithValue(errorMessage);
    }
  });


  
