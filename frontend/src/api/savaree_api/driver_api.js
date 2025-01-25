import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL + "/api/v1/driver";


export const update_Location_Api = createAsyncThunk("update_Location_Api", async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/updateLocation`, data,{withCredentials:true});
  
      return response.data;
    } catch (err) {     
      const errorMessage = err.response?.data || "An unknown error occurred.";
      return rejectWithValue(errorMessage);
    }
  });