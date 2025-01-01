import React, { useState } from "react";
import styles from "../style";
import GetStarted from "../components/GetStarted";
import OlaMapsComponent from "../components/OlaMapsComponent";
import RideFrom from "../components/RideForm";
import Modal from "../components/ModalUserSelection";


import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// API
import { get_RouteData_Api } from "../api/savaree_api/rider_api";
import { decodePolyline } from "../util/hleper";

import {add_Polyline_To_Map} from "../redux/slice/olaMapSlice"

function Home() {

  const dispatch = useDispatch();
  const { selectedLocations } = useSelector((state) => state.UserSlice);

const handaleClick = async () => {
  console.log("selectedLocations");
  console.log(selectedLocations);
  
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
    <>
  
    <section id="home" className={`flex md:flex-row flex-col sm:py-5 py-6`}>
      <div className="md:flex  md:space-x-12 ">
        <div
          className={`flex-1 flex justify-center  flex-col`}
        >
          <div className="flex flex-row  items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2 sm:w-[400px]">
            <img
              src="/assets/Discount.svg"
              alt="discount"
              className="w-[32px] h-[32px]"
            />
            <p className={`${styles.paragraph} ml-2`}>
              <span className="text-white">20%</span> Discount For{" "}
              <span className="text-white">1 Month</span> Account
            </p>
          </div>

          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[48px] text-white ss:leading-[90.8px] leading-[65px]">
              Go anywhere
              <br />
              with
              <span className="text-gradient"> Savaaree</span>
            </h1>
            {/* <div className=" ss:flex hiddenmd:mr-1 mr-0">
        <GetStarted />
      </div> */}
          </div>

          <div className=" w-full sm:w-full ">
            <RideFrom />
          </div>
        </div>


        <div className="rounded-xl h-[420px] w-full md:h-full md:w-[800px]">
               { <img src="/assets/bg.png" className="object-fill h-full rounded-xl" alt="" />}
               {/* <OlaMapsComponent />  */}
        </div>

      </div>

         <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" style={{ pointerEvents: "none" }}  />
         <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40"  style={{ pointerEvents: "none" }}/>
 
      <div className={`mt-5 md:hidden ${styles.flexCenter} `}>
    
        <button className={`w-full ${styles.btnCSS}`} onClick={handaleClick}>Submit</button>
      
      </div>
    </section>
  
    </>
  );
}

export default Home;
