import React, { useState, useEffect } from "react";
import RideFrom from "../components/RideForm";
import OlaMapsComponent from "../components/OlaMapsComponent";
import styles from "../style";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// API
import {  } from "../api/savaree_api/rider_api";
import {  } from "../util/hleper";


import {} from "../redux/slice/olaMapSlice"
import {set_Alert} from "../redux/slice/userSlice"
import { get_Driver_For_Route } from "../api/savaree_api/rider_api.js";

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
      className={`flex md:flex-row flex-col  py-6 md:h-[600px] `}
    >
      <div className="md:flex   md:justify-between gap-x-10 ">
        <div className=" w-full sm:w-[30%] ">
          <RideFrom />
        </div>
        <div className="rounded-xl h-[420px] w-full md:h-full md:w-[1000px]">
          {/* <img src="/assets/bg.png" className="object-fill h-full rounded-xl" alt="" /> */}
          <OlaMapsComponent />
        </div>
        <div
          className="absolute w-[30%] h-[35%] top-0 pink__gradient"
          style={{ pointerEvents: "none" }}
        />
        <div
          className="absolute w-[65%] h-[65%] rounded-full white__gradient bottom-40"
          style={{ pointerEvents: "none" }}
        />
        <div className={`mt-5 md:hidden ${styles.flexCenter} `}>
          <button className={`w-full ${styles.btnCSS}`} onClick={handaleClick} >
          Search
          </button>
        </div>

      </div>
    </section>
  );
}

export default Ride;
