import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { init_Ola_Map, init_My_Map, add_Geo_Location } from "../redux/slice/olaMapSlice.js";

const OlaMapsGeolocation = () => {
  const dispatch = useDispatch();
  const { myMap, geolocate } = useSelector((state) => state.OlaMapSlice);
  useEffect(() => {
    console.log("he");
    
    // Ensure the OlaMaps SDK is loaded
    if (window.OlaMapsSDK) {
      // console.log(width);

      if(myMap===null){
        // Initialize Ola Maps
        dispatch(init_Ola_Map());
        // Initialize My Map
        dispatch(init_My_Map({zoom: 5, center: [77.61648476788898, 12.931423492103944]}));
        // adding the My current location
        dispatch(add_Geo_Location());  
      }
      else{
        
        dispatch(init_My_Map({zoom: 5, center: [77.61648476788898, 12.931423492103944]}));
        dispatch(add_Geo_Location());  
      }

    }
  }, [dispatch]); // Run once

  // useEffect(() => {
  //   console.log("Gel location on")
  //   if (myMap && geolocate) {
  //     myMap.on("load", () => {
  //       // geolocate.trigger();
  //     });
  //   }
  // }, [geolocate]);

  return (
  
      <div id="map"  className="h-full object-cover rounded-xl" ></div>
 
  );
};

export default OlaMapsGeolocation;