import React, { useState, useRef, useEffect } from "react";
import styles from '../../style';

function License({setPage}) {
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
      <div className="relative w-[600px] shadow-lg bg-slate-700">
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
              <p className="ml-3 text-[24px] font-medium mb-4">
                Enter your license number and date of birth
              </p>
              <div className="flex justify-center">
                <img
                  src="/assets/license.jpg"
                  alt="License"
                  className="h-[230px] w-[350px] object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col space-y-4 mt-5">
                <div className="flex flex-col">
                  <label htmlFor="licenseNumber" className="text-[16px] font-medium">
                    License Number
                  </label>
                  <input
                    type="text"
                    
                    placeholder="DL00000000000"
                    className="md:p-3 p-2 mt-2 w-[98%] ml-2 border border-gray-300 rounded-md  text-black  focus:ring-slate-800"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="dateOfBirth" className="text-[16px] font-medium">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    className="md:p-3 p-2 mt-2 w-[98%] ml-2 border border-gray-300 rounded-md text-black   focus:ring-slate-800"
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-center">
                <p
                  className="font-medium md:text-[19px] text-[16px] underline cursor-pointer"
                  onClick={toggleUploadContent}
                >
                  Upload document instead
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="ml-3 md:text-[29px] font-medium mb-4 text-[20px]">
                Take a photo of your Driving License - Front
              </p>
              <div className="flex justify-center">
                <img src="/assets/license.jpg" alt="License" className="w-[280px] md:w-[340px]" />
              </div>
              <div className="mt-5 flex ">
                <p className="md:text-[18px] text-[16px] m-2">
                1. Upload backside of Driving Licence first if some information is present on backside before
                 the front side upload 2. Make sure that your driver license validates the class of vehicle
                  you are choosing to drive in Uber 3. Make sure License number, Driving License Type, your
                   Address, Father's Name, D.O.B, Expiration Date and Govt logo on the License are clearly
                    visible and the photo is not blurred
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
              <button className="text-white text-[16px] w-full font-poppins font-medium text-[18px] bg-gray-700 rounded-xl p-5 hover:bg-slate-600">
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

export default License;
