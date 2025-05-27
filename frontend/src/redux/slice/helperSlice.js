import { createSlice } from "@reduxjs/toolkit";

const HelperSlice = createSlice ({
    name:"HelperSlice",
    initialState:{
        navigateTo : null,
        showFooter : true,
        showNavBar : true,
        
        showRideForm : true,
        showChooseRides:false,

        showBack : false,

        backStack : [],
    },

    reducers : {
        set_NavigateTo : (state,action)=>{
            state.navigateTo = action.payload
        },
        set_Ui : (state,action)=>{
            state[action.payload.name] = action.payload.value
        },
        push_In_BackStack : (state,action)=>{
            state.backStack.push(action.payload);
        },
        pop_From_BackStack : (state,action)=>{
            let x = state.backStack.pop()
            state[x] =  !state[x]
            if(state.backStack.length===0){
                state.showBack=false;
                state.showRideForm = true;
            }
        },


    }
})

export const {set_NavigateTo,set_Ui,push_In_BackStack,pop_From_BackStack} = HelperSlice.actions

export default HelperSlice.reducer
