import React, { useState, useRef, useEffect } from "react";
import styles from '../../style';

function RC() {
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
            <p className="text-[30px] font-extrabold text-white cursor-pointer">&larr;</p>
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
            <div className="md:h-[600px]">
            <p className="ml-2 md:text-[24px] text-[20px] font-medium mb-5">
              Let’s find your Registration Certificate (RC)
              </p>
              <p className="md:text-[18px] text-[16px] m-2  mb-3">
              Enter your licence plate number and we'll get the required information from the Vahan and Sarathi portal of
               MoRTH, or you can upload your Registration Certificate (RC) instead.
              </p>
              {/* <div className="flex justify-center">
                <img
                  src="/assets/adhar card.png"
                  alt="License"
                  className="h-[160px] w-[290px] mt-4 mb-4 object-cover"
                />
              </div> */}
              <div className="flex flex-col space-y-4 mt-9 mb-3">
                <div className="flex flex-col">
                  <label htmlFor="rcNumber" className="text-[16px] font-medium ml-2 mb-2">
                    Vehicle Registration Number
                  </label>
                  <input
                    type="text"
                    id="rcNumber"
                    
                    className="md:p-3 p-2 mt-2 w-[98%] ml-2 mb-4 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-slate-800"
                  />
                </div>
               
              </div>
              <div className="mt-5 flex items-center justify-center">
                <p
                  className="font-medium md:text-[19px] text-[16px] underline mb-7 cursor-pointer"
                  onClick={toggleUploadContent}
                >
                  Upload document instead
                </p>
              </div>
            </div>
            </>
          ) : (
            <>
         <div className="h-[540px]">
         <p className="ml-3 md:text-[29px] font-medium mb-4 text-[20px]">
         Take a photo of your Registration Certificate (RC)
              </p>
              <div className="flex justify-center">
                <img src="/assets/rc.jpg" alt="rc" className="md:h-[230px] md:w-[350px] w-[300px] mt-4 mb-2 object-cover"  />
              </div>
              <div className="mt-5 flex ">
                <p className="md:text-[18px] md:mr-2 m-0 ml-4 md:mb-24 mb-4 text-[16px]">
                If the vehicle owner name on the vehicle documents is different from mine, then I hereby confirm that I have
                 the vehicle owner's consent to drive this vehicle on the Uber Platform. This declaration can be treated as
                  a No-Objection Certificate and releases Uber from any legal obligations and consequences.
                </p>
              </div>
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
              Continue
            </button>
           </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RC;
