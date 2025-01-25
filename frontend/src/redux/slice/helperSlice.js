import { createSlice } from "@reduxjs/toolkit";

const HelperSlice = createSlice ({
    name:"HelperSlice",
    initialState:{
        navigateTo : null,
        showFooter : true,
        showNavBar : true
    },

    reducers : {
        set_NavigateTo : (state,action)=>{
            state.navigateTo = action.payload
        },
        set_Ui : (state,action)=>{
            state[action.payload.name] = action.payload.value
        }
    }
})

export const {set_NavigateTo,set_Ui} = HelperSlice.actions

export default HelperSlice.reducer
