import React, { useState, useRef, useEffect } from "react";
import styles from '../../style';

function Adhar({setPage}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showUploadContent, setShowUploadContent] = useState(false); // State to toggle content
  const dropdownRef = useRef(null);
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dropdown visibility when clicking Help v
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Toggle content in the scrollable div
  const toggleUploadContent = () => {
    setShowUploadContent((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center">
      {/* Main Container */}
      <div className="relative w-[600px] shadow-lg bg-discount-gradient">
        {/* Header Section (Sticky at the top) */}
        <div className="flex items-center justify-between h-[70px] bg-discount-gradient sticky top-0 z-10">
          {/* Left content */}
          <div className="flex gap-3 items-center p-3">
            <button className="text-[30px] font-extrabold text-white cursor-pointer" onClick={()=>setPage("welcome")}>&larr;</button>
            <img
              src="/assets/SAVAAREE_LOGO.png"
              alt="SAVAAREE Logo"
              className="h-[27px] w-[130px]"
            />
          </div>
          {/* Right content with dropdown toggle */}
          <div
            className="flex gap-3 text-right mx-5 text-[16px] cursor-pointer items-center justify-center hover:bg-slate-400 bg-slate-100 rounded-3xl font-medium p-3 text-black"
            onClick={toggleDropdown}
          >
            <p>Help</p>
            <img src="/assets/down arrow.png" alt="dropdown" className="w-[19px] h-[19px] "   />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-16 right-3 mt-2 w-[250px] bg-white font-semibold rounded-md text-black"
          >
            <ul>
              <li className="cursor-pointer hover:bg-gray-200 p-3 rounded-t-md">Languages</li>
              <li className="cursor-pointer hover:bg-gray-200 p-3">Chat with support</li>
              <li className="cursor-pointer hover:bg-gray-200 p-3">Get help with your account</li>
              <li className="cursor-pointer hover:bg-gray-200 p-3 rounded-b-md">Sign Out</li>
            </ul>
          </div>
        )}

        {/* Scrollable Content Section */}
        <div
          className="p-3 bg-discount-gradient overflow-y-scroll max-h-[570px]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar (non-Webkit browsers)
        >
          {/* Content toggling */}
          {!showUploadContent ? (
            <>
             <div className="">
             <p className="ml-2 text-[24px] font-medium mb-4">
              Let's find your Aadhaar card
              </p>
              <p className="md:text-[18px] text-[16px] m-2 ">
              Enter your Aadhaar and we'll get your information from UIDAI. By sharing your Aadhar details,
               you hereby confirm that you have shared such details voluntarily.
              </p>
              <div className="flex justify-center">
                <img
                  src="/assets/adhar card.png"
                  alt="License"
                  className="h-[160px] w-[290px] mt-4 mb-4 object-cover"
                />
              </div>
              <div className="flex flex-col space-y-4 mt-5 mb-3">
                <div className="flex flex-col">
                  <label htmlFor="licenseNumber" className="text-[16px] font-medium ml-2 mb-2">
                    Adhar Number
                  </label>
                  <input
                    type="text"
                    id="licenseNumber"
                    placeholder="0000 0000 0000 0000"
                    className="md:p-3 p-2  w-[98%] ml-2  border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-slate-800"
                  />
                </div>
               
              </div>
              <div className="flex items-center justify-center">
                <p
                  className="font-medium md:text-[19px] text-[16px] underline  mt-2 mb-2 cursor-pointer"
                  onClick={toggleUploadContent}
                >
                  Upload document instead
                </p>
              </div>
             </div>
            </>
          ) : (
            <>
              <p className="ml-2 md:text-[29px] font-medium mb-4 text-[20px]">
              Take a photo of your Aadhaar Card
              </p>
              <div className="flex justify-center">
                <img src="/assets/adhar.jpg" alt="License" className="h-[190px] w-[290px] mt-6 mb-6 object-cover"  />
              </div>
              <div className="mt-5 flex ">
                <p className="md:text-[18px] text-[16px] m-2 ml-2 ">
                By sharing your Aadhar details, you hereby confirm that you have shared such detail voluntarily.
                 You further confirm and consent that your Aadhar details may be shared by Uber with relevant 
                 Government authorities for the purposes provided herein.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Submit Button Section (Sticky at the bottom) */}
        <div className="sticky bottom-0 bg-discount-gradient shadow-[0_-4px_4px_rgba(0,0,0,0.2)]">
          {showUploadContent ? (
            <div className="flex-col justify-between space-y-3  px-3 py-2">
              <div>
              <button className= {`${styles.btnCSS} w-full`}>
                Upload Photo
              </button>
              </div>
              <div>
              <button className="text-white  w-full font-poppins font-medium text-[18px] bg-gray-700 rounded-xl p-5 hover:bg-slate-600">
                Use My Phone
              </button>
              </div>
            </div>
          ) : (
           <div className="p-4">
             <button className={`${styles.btnCSS} w-full`}>
              Submit
            </button>
           </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Adhar;
