import React, { useState, useEffect } from "react";
import RideFrom from "../components/RideForm";
import OlaMapsComponent from "../components/OlaMapsComponent";
import styles from "../style";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// API
import { get_RouteData_Api } from "../api/savaree_api/rider_api";
import { decodePolyline } from "../util/hleper";

import {add_Polyline_To_Map} from "../redux/slice/olaMapSlice"

function Ride() {
  const dispatch = useDispatch();
  const { selectedLocations } = useSelector((state) => state.UserSlice);

const handaleClick = async () => {
  // console.log("selectedLocations");
  // console.log(selectedLocations);
  
      if(selectedLocations&&selectedLocations.pickup&&selectedLocations.dropoff){
        const result = await dispatch(
          get_RouteData_Api({
            source_lat: selectedLocations.pickup.coordinates.lat,
            source_long: selectedLocations.pickup.coordinates.lng,
            destination_lat: selectedLocations.dropoff.coordinates.lat,
            destination_long: selectedLocations.dropoff.coordinates.lng,
          })
        );
        const coordinates = decodePolyline(result.payload.data.routes[0].overview_polyline);
        console.log(coordinates[0]);
        dispatch(add_Polyline_To_Map({coordinates,color:"#00040f",width:5}));
      }
      else{
        alert("complete the form")
      }

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
            Submit
          </button>
        </div>

      </div>
    </section>
  );
}

export default Ride;
