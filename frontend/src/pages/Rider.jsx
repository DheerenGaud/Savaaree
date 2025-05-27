import React, { useState, useEffect } from "react";
import RideFrom from "../components/RideForm";
import OlaMapsComponent from "../components/OlaMapsComponent";
import styles from "../style";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// API
import { get_Driver_For_Route } from "../api/savaree_api/rider_api.js";


import {set_Alert} from "../redux/slice/userSlice"
import { set_Ui ,push_In_BackStack} from "../redux/slice/helperSlice.js";

import ChooseRides from "../components/ChooseRides.jsx";

function Ride() {
  const { path } = useSelector((state) => state.OlaMapSlice);
  const { locations } = useSelector((state) => state.UserSlice);
  const {showRideForm,showChooseRides} = useSelector((state) => state.HelperSlice);
  
  // const [showChooseRides,setShowChooseRides] = useState(false);
  const dispatch = useDispatch();
  
const handaleClick = async (isShow) => {
    // console.log({path,selectedLocations});
    if(locations.pickup&&locations.dropoff){
      const result = await dispatch(get_Driver_For_Route({path,locations}))
       console.log(result.payload);
       if(result.payload.success&&result.payload.drivers.length>0||result.payload.freeDrivers.length>0){
         dispatch(set_Ui({ name: 'showChooseRides', value: true }));
         dispatch(set_Ui({ name: 'showBack', value: true }));
         dispatch(set_Ui({ name: 'showRideForm', value: false }));
         dispatch(push_In_BackStack('showRideForm'));
         dispatch(push_In_BackStack('showChooseRides'));
       }
       else{
        dispatch(set_Ui({ name: 'showChooseRides', value: false }));
      }
    }
    else{
      dispatch(set_Ui({ name: 'showChooseRides', value: false }));
    }
    // dispatch(get_Driver_For_Route({path,selectedLocations}))
};



  return (
<section id="rider" className=" flex flex-col h-screen">
  <div className="md:flex md:justify-between gap-x-6 flex-1">
    {/* Ride Form */}
    <div className="w-full md:block sm:w-[30%]">
      <RideFrom showDriver={handaleClick} />
    </div>

    {/* Main Content - Map and Choose Ride */}
    <div className="flex flex-col md:flex-row gap-x-6 flex-1">
      {/* Map - Takes full height initially */}
      <div className="rounded-xl h-[60vh] md:h-[100%] w-full md:w-[100%] md:order-2">
        <OlaMapsComponent />
      </div>

      {/* Choose Ride */}
      <div className="order-2 md:order-1 md:h-[100%]  ">
        {showChooseRides && <ChooseRides />}
      </div>
    </div>
  </div>

  {/* Gradient Overlays */}
  <div
    className="absolute w-[30%] h-[35%] top-0 pink__gradient"
    style={{ pointerEvents: "none" }}
  />
  <div
    className="absolute w-[65%] h-[65%] rounded-full white__gradient bottom-40"
    style={{ pointerEvents: "none" }}
  />

  {/* Fixed Button at the Bottom */}
  {showRideForm && (
    <div className=" bottom-0 w-full md:hidden ">
      <button className={`w-full ${styles.btnCSS}`} onClick={handaleClick}>
        See Prices
      </button>
    </div>
  )}
</section>

  );
}

export default Ride;
