import React, { useState, useRef } from 'react';
import styles from "../style";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// API
import { get_RouteData_Api } from "../api/savaree_api/rider_api";
import { decodePolyline } from "../util/hleper";

import { add_Polyline_To_Map, set_Locations_On_MAP } from "../redux/slice/olaMapSlice";
import { set_Selected_Locations, set_Alert } from "../redux/slice/userSlice";

const RideForm = () => {
  const [pickupQuery, setPickupQuery] = useState('');
  const [dropoffQuery, setDropoffQuery] = useState('');
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  const selectedLocations = useRef({ pickup: null, dropoff: null }); // Use useRef for locations
  
  const dispatch = useDispatch();
  const isAuthenticated =  document.cookie.includes("authenticated"); 

  const handaleClick = async () => {
  if(isAuthenticated){
       
      }
      else{
          dispatch(set_Alert({type:"error",msg:"user Not authenticated"}))
      }
  };
  

  const FidePath = async () => {
    if (
      selectedLocations.current.pickup &&
      selectedLocations.current.dropoff
    ) {
      
      const result = await dispatch(
        get_RouteData_Api({
          source_lat: selectedLocations.current.pickup.coordinates.lat,
          source_long: selectedLocations.current.pickup.coordinates.lng,
          destination_lat: selectedLocations.current.dropoff.coordinates.lat,
          destination_long: selectedLocations.current.dropoff.coordinates.lng,
        })
      );
      if(result.payload.data){
        const coordinates = decodePolyline(result.payload.data.routes[0].overview_polyline);
        dispatch(add_Polyline_To_Map({ coordinates, color: "#00040f", width: 5 }));
      }
    } 
  };

  const handleLocationSelect = (location, type) => {
    const locationData = {
      name: location.structured_formatting.main_text,
      address: location.structured_formatting.secondary_text,
      coordinates: location.geometry.location,
      placeId: location.place_id,
    };

    // Update useRef directly
    selectedLocations.current[type] = locationData;

    dispatch(set_Selected_Locations({ type, locationData }));
    dispatch(set_Locations_On_MAP({ coordinates: location.geometry.location, type , name :location.structured_formatting.main_text }));
    FidePath()

    if (type === 'pickup') {
      setPickupQuery(location.structured_formatting.main_text);
      setShowPickupSuggestions(false);
    } else {
      setDropoffQuery(location.structured_formatting.main_text);
      setShowDropoffSuggestions(false);
    }

  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${query}&api_key=${process.env.REACT_APP_OLA_API_KEY}`
      );
      const data = await response.json();

      if (data.predictions) {
        setSuggestions(data.predictions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

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

  const debouncedFetch = React.useCallback(
    debounce((query) => fetchSuggestions(query), 300),
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
      debouncedFetch(value);
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

  const renderSuggestions = (type) => (
    <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200 max-h-[450px] md:max-h-[300px] overflow-y-auto">
      {suggestions.map((location) => (
        <div
          key={location.place_id}
          className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
          onClick={() => handleLocationSelect(location, type)}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 w-[45px] h-[45px] rounded-full bg-dimBlue flex items-center justify-center">
              <img src="/assets/location.png" alt="loc" className="w-6 h-6 object-contain" />
            </div>
            <div className="ml-3 flex-grow min-w-0">
              <div className="font-medium truncate">
                {location.structured_formatting.main_text}
              </div>
              <div className="text-sm text-gray-500 break-words autoSearch">
                {location.structured_formatting.secondary_text}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col space-y-3 relative">
      {/* Pickup Input */}
      <div className="relative">
        <div className="flex items-center bg-white rounded-md w-full p-2">
          <img src="/assets/start.png" className="h-[35px]" alt="" />
          <input
            type="text"
            value={pickupQuery}
            onChange={(e) => handleInputChange(e, 'pickup')}
            placeholder="Pickup location"
            className="placeholder-gray-600 rounded-r-md w-full focusNone  "
          />
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
            className="placeholder-gray-600 rounded-r-md w-full focusNone  "
          />
        </div>
        {showDropoffSuggestions && dropoffQuery && suggestions.length > 0 && renderSuggestions('dropoff')}
      </div>
      <div className="flex items-center rounded-md w-full space-x-2">
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
        <button className={`${styles.btnCSS} hidden md:block`} onClick={handaleClick}>
        Search
        </button>
      </div>
    </div>
  );
};

export default RideForm;
