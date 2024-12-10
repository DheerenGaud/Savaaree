import {configureStore} from "@reduxjs/toolkit"
import olaMapSlice from "./slice/olaMapSlice"

export default configureStore({
    reducer:{
      olaMapSlice
    }
  })