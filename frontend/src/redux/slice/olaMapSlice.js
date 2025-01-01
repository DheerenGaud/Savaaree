import { createSlice } from "@reduxjs/toolkit";
import { get_RouteData_Api } from "../../api/savaree_api/rider_api";
import {decodePolyline} from "../../util/hleper"


import toast  from "react-hot-toast";

const OlaMapSlice = createSlice ({
    name:"OlaMapSlice",
    initialState:{
        zoom :10,
        olaMaps:null,
        geolocate :null,
        myMap:null,
    },
    reducers:{
        init_Ola_Map:(state,action)=>{
          console.log("init_Ola_Map");
          
              state.olaMaps = new window.OlaMapsSDK.OlaMaps({
                apiKey: process.env.REACT_APP_OLA_API_KEY, 
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
             state.geolocate=null;
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
          console.log( state.myMap);
          if (state.myMap.getLayer('route')) {
            state.myMap.removeLayer('route');
        }
        if (state.myMap.getSource('route')) {
            state.myMap.removeSource('route');
        }
    
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
              var customMarker_Start = document.createElement('div')
              customMarker_Start.classList.add('customMarkerClass_Start')

              var customMarker_End = document.createElement('div')
              customMarker_End.classList.add('customMarkerClass_End')
    
              state.olaMaps
                 .addMarker({element: customMarker_Start, offset: [0, -10], anchor: 'bottom' })
                 .setLngLat(coordinates[0])
                 .addTo(state.myMap)

              state.olaMaps
                 .addMarker({element: customMarker_End, offset: [0, -10], anchor: 'bottom' })
                 .setLngLat(coordinates[coordinates.length - 1])
                 .addTo(state.myMap)

              if (coordinates && coordinates.length > 0) {
                state.myMap.setCenter(coordinates[0]);
                state.myMap.setZoom(12); // You can adjust this zoom level as needed
            }
             


        }
    },
    extraReducers: (builder) => {
      builder
      .addCase(get_RouteData_Api.pending, (state) => {
        // state.loading = true;
        state.error = null;
        console.log("pending.......");
        // toast.loading("loading...")
      })
      .addCase(get_RouteData_Api.fulfilled, (state, action) => {
        // state.loading = false;
        console.log(action.payload.data);
        toast.success(action.payload.message)
      })
      .addCase(get_RouteData_Api.rejected, (state, action) => {
        // state.loading = false;
        toast.error(action.payload.message)
        state.error = action.payload.message; // Assuming the thunk passes the error message via `rejectWithValue`
      })
    }
})


export const {init_Ola_Map,init_My_Map,add_Polyline_To_Map,add_Geo_Location} = OlaMapSlice.actions

export default OlaMapSlice.reducer