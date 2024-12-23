import React, { useState, useEffect } from "react";
import RideForm from "../components/RideFrom";
import OlaMapsGeolocation from "../components/OlaMapsComponent";
import styles from "../style";

function Ride() {
  const [mapDimensions, setMapDimensions] = useState({ height: 550, width: 950 });

  useEffect(() => {
    const updateMapDimensions = () => {
      if (window.innerWidth <= 768) {
        setMapDimensions({ height: "550px", width: "380px" });
      } else {
        // Larger screens
        setMapDimensions({ height: "550px", width: "950px" });
      }
    };

    // Initial check
    updateMapDimensions();

    // Add event listener
    window.addEventListener("resize", updateMapDimensions);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateMapDimensions);
  }, []);

  return (
    <div className={`flex ${styles.flexStart} flex-col md:flex-row`}>
      <div className={`${styles.paddingX} w-full`}>
        <h1 className="hidden md:block text-white font-poppins font-semibold text-[28px]">Get a ride</h1>
        <RideForm />
      </div>
      <div className={`flex ${styles.flexCenter} ${styles.paddingX}8-/+7\+87-56+ md:my-0 my-5 relative px-6 md:px-0`}>
        {/* <OlaMapsGeolocation height={mapDimensions.height} width={mapDimensions.width} /> */}
      </div>
      <div className={`${styles.paddingX} md:px-0 w-full`}>
        <button className={`${styles.btnCSS} block md:hidden w-full`}>Submit</button>
      </div>
      <div
        className="absolute w-[30%] h-[35%] top-0 pink__gradient"
        style={{ pointerEvents: "none" }}
      />
      <div
        className="absolute w-[65%] h-[65%] rounded-full white__gradient bottom-40"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}

export default Ride;
