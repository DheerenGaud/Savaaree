import React, { useState } from "react";
import styles from '../style';
import GetStarted from "../components/GetStarted"
import OlaMapsComponent from "../components/OlaMapsComponent"
import RideFrom from "../components/RideFrom"
import Modal from "../components/ModalUserSelection";
function Home() {



  return (

    <section id="home" className={`flex md:flex-row flex-col sm:py-5 py-6`}>
  <div className={`flex-1 flex justify-center  flex-col xl:px-0 sm:px-16 px-6`}>
    <div className="flex flex-row  items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2 sm:w-[400px]">
      <img src='/assets/Discount.svg' alt="discount"  className="w-[32px] h-[32px]" />
      <p className={`${styles.paragraph} ml-2`}>
        <span className="text-white">20%</span> Discount For{" "}
        <span className="text-white">1 Month</span> Account
      </p>
    </div>

    <div className='flex flex-row justify-between items-center w-full'>
      <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[48px] text-white ss:leading-[90.8px] leading-[65px]'>
        Go anywhere
        <br />
        with
        <span className="text-gradient"> Savaaree</span>
      </h1>
      <div className=" ss:flex hiddenmd:mr-1 mr-0">
        <GetStarted />
      </div>
    </div>

    <div>
      <RideFrom />
    </div>
  </div>

  <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
    <div className='w-[100%] h-[100%] relative z-[5]'>
      {/* <OlaMapsComponent height={550} width={650} /> */}
    </div>
  </div>

  {/* Decorative gradients with pointer-events: none */}
  <div className="absolute w-[30%] h-[35%] top-0 pink__gradient" style={{ pointerEvents: "none" }} />
  <div className="absolute w-[65%] h-[65%] rounded-full white__gradient bottom-40" style={{ pointerEvents: "none" }} />

  <div className={`ss:hidden ${styles.flexCenter}`}>
    <GetStarted />
  </div>
</section>
  );
}

export default Home;