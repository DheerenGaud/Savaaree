import { createSlice } from "@reduxjs/toolkit";
import { get_Driver_For_Route ,get_RouteData_Api} from "../../api/savaree_api/rider_api";
import toast  from "react-hot-toast";

const RideSlice = createSlice ({
    name:"RideSlice",
    initialState:{
       drivers : null,
       freeDrivers : null,

       duration : null,
       distance : null,

       path : null,

       loading:null,
       error:null

    },

    reducers : {

        set_Ui : (state,action)=>{
            state[action.payload.name] = action.payload.value
        },


    }
    ,
    extraReducers: (builder) => {
         builder
              .addCase(get_Driver_For_Route.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log("pending.......");
            })
         builder
              .addCase(get_Driver_For_Route.fulfilled, (state,action) => {
                state.loading = false;
                state.drivers=action.payload.drivers
                state.freeDrivers=action.payload.freeDrivers
                // console.log(action.payload);
                
                toast.success(action.payload.message)
            })
         builder
              .addCase(get_Driver_For_Route.rejected, (state,action) => {
                state.loading = false;
                toast.error(action.payload.message)
                state.error = action.payload.message;
            })
         builder
              .addCase(get_RouteData_Api.fulfilled, (state,action) => {
                 console.log(action.payload.data.routes[0].legs[0]);
                 state.distance = action.payload.data.routes[0].legs[0].readable_distance;
                 state.duration = action.payload.data.routes[0].legs[0].readable_duration;
            })
    }
})

export const {set_Ui} = RideSlice.actions

export default RideSlice.reducer
