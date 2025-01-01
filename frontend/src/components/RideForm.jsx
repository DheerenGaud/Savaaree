import React, { useState } from 'react';
import styles from "../style";


import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


// API
import { get_RouteData_Api } from "../api/savaree_api/rider_api";
import { decodePolyline } from "../util/hleper";

import {add_Polyline_To_Map} from "../redux/slice/olaMapSlice"
import {set_Selected_Locations,show_Ride_Path} from "../redux/slice/userSlice"

const RideForm = () => {
  const [pickupQuery, setPickupQuery] = useState('');
  const [dropoffQuery, setDropoffQuery] = useState('');
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({
    pickup: null,
    dropoff: null
  });
  const dispatch = useDispatch();



   const handaleClick = async () => {
 
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

  // Function to fetch suggestions from backend
  const fetchSuggestions = async (query, type) => {
    try {
      const response = await fetch(`https://api.olamaps.io/places/v1/autocomplete?input=${query}&api_key=${process.env.REACT_APP_OLA_API_KEY}`);
      const data = await response.json();
      
      if (data.predictions) {
        setSuggestions(data.predictions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  // Debounce function to limit API calls
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Debounced version of fetchSuggestions
  const debouncedFetch = React.useCallback(
    debounce((query, type) => fetchSuggestions(query, type), 300),
    []
  );

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === 'pickup') {
      setPickupQuery(value);
    } else {
      setDropoffQuery(value);
    }

    if (value.length > 2) {
      debouncedFetch(value, type);
      if (type === 'pickup') {
        setShowPickupSuggestions(true);
      } else {
        setShowDropoffSuggestions(true);
      }
    } else {
      setSuggestions([]);
      if (type === 'pickup') {
        setShowPickupSuggestions(false);
      } else {
        setShowDropoffSuggestions(false);
      }
    }
  };

  const handleLocationSelect = (location, type) => {
    const locationData = {
      name: location.structured_formatting.main_text,
      address: location.structured_formatting.secondary_text,
      coordinates: location.geometry.location,
      placeId: location.place_id
    };
    dispatch(set_Selected_Locations({type,locationData}))


    setSelectedLocations(prev => ({
      ...prev,
      [type]: locationData
    }));

    if (type === 'pickup') {
      setPickupQuery(location.structured_formatting.main_text);
      setShowPickupSuggestions(false);
    } else {
      setDropoffQuery(location.structured_formatting.main_text);
      setShowDropoffSuggestions(false);
    }
  };

  const renderSuggestions = (type) => {
    return (
      <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200 max-h-[450px] md:max-h-[300px] overflow-y-auto">
        {suggestions.map((location, index) => (
          <div
            key={location.place_id}
            className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
            onClick={() => handleLocationSelect(location, type)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 w-[45px] h-[45px] rounded-full bg-dimBlue flex items-center justify-center">
                <img 
                  src="/assets/location.png" 
                  alt="loc"  
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="ml-3 flex-grow min-w-0">
                <div className="font-medium truncate">
                  {location.structured_formatting.main_text}
                </div>
                <div 
  className="text-sm text-gray-500 break-words autoSearch"

>
  {location.structured_formatting.secondary_text}
</div>

              </div>
            </div>
          </div>
        ))}
        <div className="p-3 hover:bg-gray-100 cursor-pointer border-t">
          <div className="flex items-center">
            <div className="w-[45px] h-[45px] rounded-full bg-dimBlue flex items-center justify-center">
              <img 
                src="/assets/location.png" 
                alt="loc"  
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="ml-3 text-blue-600">Set location on map</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-3 relative">
      <div className="flex flex-col space-y-3">
        {/* Pickup Input */}
        <div className="relative">
          <div className='flex items-center bg-white rounded-md w-full p-2'>
          <img src="/assets/start.png" className='h-[35px]' alt="" />
          <input
            type="text"
            value={pickupQuery}
            onChange={(e) => handleInputChange(e, 'pickup')}
            placeholder="Pickup location"
            className=" placeholder-gray-600 rounded-r-md w-full focusNone  "
          />
            {
showPickupSuggestions&&(
  <img
    src="/assets/close.png"
    className="w-[30px] h-[30px] cursor-pointer"
    alt="close"
    onClick={()=>{
      setPickupQuery("")
      dispatch(set_Selected_Locations("pickup",null))
      setShowPickupSuggestions(false);
    }}
  />
)
  }
          </div>
          {showPickupSuggestions && pickupQuery && suggestions.length > 0 && renderSuggestions('pickup')}
        </div>

        {/* Dropoff Input */}
        <div className="relative">
        <div className="flex items-center bg-white rounded-md w-full p-2">
  <img src="/assets/end.png" className="h-[35px]" alt="" />
  <input
    type="text"
    value={dropoffQuery}
    onChange={(e) => handleInputChange(e, 'dropoff')}
    placeholder="Dropoff location"
    className="placeholder-gray-600 rounded-r-md w-full focus:outline-none"
  />
  {
showDropoffSuggestions&&(
  <img
    src="/assets/close.png"
    className="w-[30px] h-[30px] cursor-pointer"
    alt="close"
    onClick={()=>{
      setDropoffQuery("")
      dispatch(set_Selected_Locations("dropoff",null))
      setShowDropoffSuggestions(false);
    }}
  />
)
  }
</div>

          {showDropoffSuggestions && dropoffQuery && suggestions.length > 0 && renderSuggestions('dropoff')}
        </div>
      </div>

      <div className="flex flex-row space-x-2">
        <input
          type="date"
          className="p-3 rounded-md w-full border border-gray-300"
        />
        <input
          type="time"
          className="p-3 rounded-md w-full border border-gray-300"
        />
      </div>

      <div>
        <button className={`${styles.btnCSS} hidden md:block` } onClick={handaleClick}>Submit</button>
      </div>
    </div>
  );
};

export default RideForm;