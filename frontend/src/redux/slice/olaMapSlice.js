import { createSlice } from "@reduxjs/toolkit";

const OlaMapSlice = createSlice ({
    name:"OlaMapSlice",
    initialState:{
        zoom :25,
        olaMaps:null,
        geolocate :null,
        myMap:null,
    },
    reducers:{
        init_Ola_Map:(state,action)=>{
              state.olaMaps = new window.OlaMapsSDK.OlaMaps({
                apiKey: process.env.REACT_APP_OLA_API_KEY, // Your API key
              });
        },
        init_My_Map:(state,action)=>{
             const {zoom,center} = action.payload;
             state.myMap = state.olaMaps.init({
                style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                container: "map", // ID of the map container
                center: center, // Initial coordinates
                zoom:zoom, // Initial zoom level
              });
             state.zoom = zoom; 
        }
        ,
        add_Geo_Location:(state,action)=>{
             const geolocate = state.olaMaps.addGeolocateControls({
                positionOptions: {
                  enableHighAccuracy: true, // Enable high-accuracy location
                },
                trackUserLocation: true, // Enable tracking of the user's location
              });
        
              // Add the geolocate control to the map
              state.geolocate = geolocate
              state.myMap.addControl(geolocate);
        }
        ,
        add_Polyline_To_Map:(state,action)=>{
            const {coordinates,color,width} =  action.payload
            state.myMap.addSource("route", {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: coordinates,
                  },
                },
              });
          
              state.myMap.addLayer({
                id: "route",
                type: "line",
                source: "route",
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-color": color,
                  "line-width": width,
                },
              });
        }
    }
})


export const {init_Ola_Map,init_My_Map,add_Polyline_To_Map,add_Geo_Location} = OlaMapSlice.actions

export default OlaMapSlice.reducer