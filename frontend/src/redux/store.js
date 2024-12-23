import {configureStore} from "@reduxjs/toolkit"
import OlaMapSlice from "./slice/olaMapSlice"
import UserSlice from "./slice/userSlice"
import HelperSlice from "./slice/helperSlice"

export default configureStore({
    reducer:{
      OlaMapSlice,
      UserSlice,
      HelperSlice
    }
  })