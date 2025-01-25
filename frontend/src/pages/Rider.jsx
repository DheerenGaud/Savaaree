import React, { useState, useEffect } from "react";
import RideFrom from "../components/RideForm";
import OlaMapsComponent from "../components/OlaMapsComponent";
import styles from "../style";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// API
import { get_Driver_For_Route } from "../api/savaree_api/rider_api.js";


import {set_Alert} from "../redux/slice/userSlice"
import { set_Ui } from "../redux/slice/helperSlice.js";

import ChooseRides from "../components/ChooseRides.jsx";

function Ride() {
  const { path } = useSelector((state) => state.OlaMapSlice);
  const { selectedLocations } = useSelector((state) => state.UserSlice);
  const dispatch = useDispatch();
  
const handaleClick = async () => {
    console.log({path,selectedLocations});
    dispatch(get_Driver_For_Route({path,selectedLocations}))

};



  return (
    <section
      id="rider"
      className={`flex md:flex-row flex-col  py-6 h-screen`}
    >
      <div className="md:flex   md:justify-between gap-x-6 ">
        <div className=" w-full hidden md:block sm:w-[30%] ">
          <RideFrom />
        </div>
        <div className="flex flex-col md:flex-row gap-x-6">
          {/* Image comes first on mobile and second on desktop */}
          <div className="h-[280px] md:h-full    md:w-[650px] order-1 md:order-2">
            {/* <img
              src="/assets/mappp.jpg"
              className="object-fill h-full w-[500px]"
              alt="Map"
            /> */}
            <OlaMapsComponent /> 
          </div>

          {/* ChooseRide comes second on mobile and first on desktop */}
          <div className="order-2 md:order-1 w-full  md:h-full ">
            <ChooseRides />
          </div>

        </div>
       
        <div
          className="absolute w-[30%] h-[35%] top-0 pink__gradient"
          style={{ pointerEvents: "none" }}
        />
        <div
          className="absolute w-[65%] h-[65%] rounded-full white__gradient bottom-40"
          style={{ pointerEvents: "none" }}
        />
        {/* <div className={`mt-5 hidden md:block ${styles.flexCenter} `}>
          <button className={`w-full ${styles.btnCSS}`} onClick={handaleClick} >
          Search
          </button>
        </div> */}

      </div>
    </section>
  );
}

export default Ride;
