import React, { useState, useRef, useEffect } from "react";

function Profile({setPage}) {
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
          
            
            <div className="md:h-[400px] h-[350px]">
                <div className="flex gap-4 ml-2 mb-4 mt-2">
               <div>
                watch
               </div>
               <div className="text-[16px] text-gray-400 font-semibold">
                Profile Photo
               </div>

                </div>
            <p className="ml-2 md:text-[24px]  text-[20px] font-medium mb-5">
            We're reviewing your document
              </p>
              <p className="md:text-[18px] text-[16px] m-2  mb-3">
              It usually takes less than a day for us to complete the process.
              </p>
            
              
            
            </div>
       
        </div>

    
       
      </div>
    </div>
  );
}

export default Profile;
