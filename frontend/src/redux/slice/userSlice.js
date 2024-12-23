import { createSlice } from "@reduxjs/toolkit";
import { user_SignUp_Api ,user_OTP_Verification_Api ,user_Login_Api , user_Logout_Api} from "../../api/savaree_api/user_api.js";
import toast  from "react-hot-toast";


const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    // map
    lat: null,
    long: null,
    
    
    // profile
    role: "rider",
    email: null,
    phoneNo :null,
    id: null,
    name: null,
    picture: null,

    // loading and error states
    loading: false,
    error: null,

  },
  reducers: {
    add_User_Type: (state, action) => {
      state.role = action.payload;
    },
    
    add_User_Profile: (state, action) => {
        Object.assign(state, action.payload);
      },
  },

  extraReducers: (builder) => {
    builder

      // user Sign up 
      .addCase(user_SignUp_Api.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("pending.......");
        // toast.loading("loading...")
      })
      .addCase(user_SignUp_Api.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message)
        // Object.assign(state, action.payload); // Assuming API returns user profile data
      })
      .addCase(user_SignUp_Api.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message)
        state.error = action.payload.message; // Assuming the thunk passes the error message via `rejectWithValue`
      })

      // user_OTP_Verification_Api
      .addCase(user_OTP_Verification_Api.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("pending.......");
      })
      .addCase(user_OTP_Verification_Api.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(user_OTP_Verification_Api.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        toast.error(action.payload.message)
        state.error = action.payload.message; // Assuming the thunk passes the error message via `rejectWithValue`
      })

      // User Loin
      .addCase(user_Login_Api.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(user_Login_Api.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(user_Login_Api.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        toast.error(action.payload.message)
        state.error = action.payload.message; // Assuming the thunk passes the error message via `rejectWithValue`
      })

      // User Logout
      .addCase(user_Logout_Api.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(user_Logout_Api.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(user_Logout_Api.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        toast.error(action.payload.message)
        state.error = action.payload.message; // Assuming the thunk passes the error message via `rejectWithValue`
      })
  },
});

export const { add_User_Type , add_User_Profile } = UserSlice.actions;

export default UserSlice.reducer;