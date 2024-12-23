import { createSlice } from "@reduxjs/toolkit";

const HelperSlice = createSlice ({
    name:"HelperSlice",
    initialState:{
        navigateTo : null
    },

    reducers : {
        set_NavigateTo : (state,action)=>{
            state.navigateTo = action.payload
        }
    }
})

export const {set_NavigateTo} = HelperSlice.actions

export default HelperSlice.reducer
