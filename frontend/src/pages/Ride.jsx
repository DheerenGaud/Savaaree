import React, { useState, useEffect } from "react";
import RideFrom from "../components/RideFrom";
import OlaMapsComponent from "../components/OlaMapsComponent";
import styles from "../style";

function Ride() {

  
  return (


    <section id="rider" className={`flex md:flex-row flex-col  py-6 md:h-[600px] ` }>
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
    
    <button className={`w-full ${styles.btnCSS}`}>Submit</button>
  
  </div>
      </div>
      </section>
  );
}

export default Ride;
