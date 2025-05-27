import React, { useEffect } from "react";
import {fetchRouteData} from "../api/ola_api/routing.js"
import {decodePolyline} from "../util/hleper.js"
import {init_Ola_Map,init_My_Map,add_Geo_Location} from "../redux/slice/olaMapSlice.js"
import {useDispatch,useSelector} from "react-redux"

const OlaMapsGeolocation = ({height,width}) => {
  const dispatch = useDispatch();
  const data = useSelector((state)=>state.olaMapSlice);
  useEffect( async() => {
    // Ensure the OlaMaps SDK is loaded
    if (window.OlaMapsSDK) {
      console.log(process.env.REACT_APP_OLA_API_KEY);
      console.log(process.env.REACT_APP_OLA_API_KEY);
      console.log(process.env.REACT_APP_OLA_API_KEY);
      console.log(width);
      
      await dispatch(init_Ola_Map())
      await dispatch(init_My_Map({zoom:25,center:[77.61648476788898, 12.931423492103944]}))
      console.log(myMap);
      const {myMap,geolocate} = data;
      // const olaMaps = new window.OlaMapsSDK.OlaMaps({
      //   apiKey: process.env.REACT_APP_OLA_API_KEY, // Your API key
      // });

      // Initialize the map
      // const myMap = olaMaps.init({
      //   style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      //   container: "map", // ID of the map container
      //   center: [77.61648476788898, 12.931423492103944], // Initial coordinates
      //   zoom: 25, // Initial zoom level
      // });
      

      // dispatch(add_Geo_Location())

      // Add Geolocation Controls
      // const geolocate = olaMaps.addGeolocateControls({
      //   positionOptions: {
      //     enableHighAccuracy: true, // Enable high-accuracy location
      //   },
      //   trackUserLocation: true, // Enable tracking of the user's location
      // });
      // // Add the geolocate control to the map
      // myMap.addControl(geolocate);
      // Programmatically request and move the map to the user's location when the map loads


      myMap.on("load", () => {

        geolocate.trigger();
        // Fetch the route data from the API
        // fetchRouteData(18.76029027465273,73.3814242364375,18.73354223011708,73.44587966939002).then((routeData) => {
        //   console.log(routeData);
          
        //   // Decode the polyline to get the coordinates
        //   const coordinates = decodePolyline(routeData.routes[0].overview_polyline);
        //   console.log(coordinates);
          
        //   // Add the polyline to the map
        //   addPolylineToMap(myMap, coordinates);
        // });
      });

      // Event listeners for geolocation events
      // geolocate.on("geolocate", (event) => {
      //   console.log("A geolocate event has occurred:", event.coords);
      // });

      // geolocate.on("error", () => {
      //   console.error("An error occurred while retrieving the user's location.");
      // });

      // geolocate.on("trackuserlocationstart", () => {
      //   console.log("User location tracking has started.");
      // });

      // geolocate.on("trackuserlocationend", () => {
      //   console.log("User location tracking has ended.");
      // });

      // geolocate.on("userlocationfocus", () => {
      //   console.log("User location is focused on the map.");
      // });

      // geolocate.on("userlocationlostfocus", () => {
      //   console.log("User location has lost focus on the map.");
      // });

      // geolocate.on("outofmaxbounds", () => {
      //   console.warn("User location is out of the maximum bounds.");
      // });
    }
  }, []); // Run once

  // const fetchRouteData = async () => {
  //   const response = await fetch(
  //     `https://api.olamaps.io/routing/v1/directions?origin=18.76029027465273,73.3814242364375&destination=18.73354223011708,73.44587966939002&api_key=${process.env.REACT_APP_OLA_API_KEY}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "X-Request-Id": "XXX",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   return data;
  // };

  // const decodePolyline = (encoded) => {
  //   const poly = [];
  //   let index = 0,
  //     len = encoded.length;
  //   let lat = 0,
  //     lng = 0;

  //   while (index < len) {
  //     let b,
  //       shift = 0,
  //       result = 0;
  //     do {
  //       b = encoded.charAt(index++).charCodeAt(0) - 63;
  //       result |= (b & 0x1f) << shift;
  //       shift += 5;
  //     } while (b >= 0x20);
  //     let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
  //     lat += dlat;

  //     shift = 0;
  //     result = 0;
  //     do {
  //       b = encoded.charAt(index++).charCodeAt(0) - 63;
  //       result |= (b & 0x1f) << shift;
  //       shift += 5;
  //     } while (b >= 0x20);
  //     let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
  //     lng += dlng;

  //     poly.push([lng * 1e-5, lat * 1e-5]);
  //   }

  //   return poly;
  // };

  // const addPolylineToMap = (map, coordinates) => {
  //   map.addSource("route", {
  //     type: "geojson",
  //     data: {
  //       type: "Feature",
  //       properties: {},
  //       geometry: {
  //         type: "LineString",
  //         coordinates: coordinates,
  //       },
  //     },
  //   });

  //   map.addLayer({
  //     id: "route",
  //     type: "line",
  //     source: "route",
  //     layout: {
  //       "line-join": "round",
  //       "line-cap": "round",
  //     },
  //     paint: {
  //       "line-color": "#f00",
  //       "line-width": 4,
  //     },
  //   });
  // };

  return (
    <div>
      <div id="map" style={{height:height,width:width}} className={`rounded-lg `} ></div>
    </div>
  );
};

export default OlaMapsGeolocation;