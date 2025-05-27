import React from 'react';

function Welcomepage({ setPage }) {
  return (
    <div className='flex justify-center items-center '>
      <div className='relative w-[600px] shadow-lg bg-discount-gradient '>

      <div className="w-full  p-4 ">
        <h2 className="text-white text-3xl font-bold md:mt-1">Welcome, Mayuri</h2>
        <p className="text-[16px] md:text-start  mt-2">
          Here's what you need to do to set up your account.
        </p>
      </div>

      <div className="w-full p-4 ">
        {/* Driving License */}
        <div className="p-3">
          <div className="flex justify-between items-center cursor-pointer">
            <div className="mx-1">
              <p className="md:font-medium md:text-xl text-[17px] mb-1 font-semibold text-gray-200">
                Driving License - Front
              </p>
              <p className="md:text-sm text-xs text-blue-700 hover:text-blue-300">Recommended next step</p>
            </div>
            <button
              className="md:text-3xl font-bold text-gray-500 text-xl hover:text-white"
              onClick={() => setPage('License')}
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="border-b-[1px] border-gray-500 md:w-[95%] mt-1  w-[90%] mx-5"></div>

        {/* Adhar Card */}
        <div className="p-4">
          <div className="flex justify-between items-center cursor-pointer">
            <div className="mx-1">
              <p className="md:font-medium md:text-xl text-[17px] font-semibold text-gray-200">Adhar Card</p>
            </div>
            <button
              className="md:text-3xl font-bold text-gray-500 text-xl hover:text-white"
              onClick={() => setPage('Adhar')}
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="border-b-[1px] border-gray-500 md:w-[95%] mt-1  w-[90%] mx-5"></div>

        {/* Registration Certificate */}
        <div className="p-4">
          <div className="flex justify-between items-center cursor-pointer">
            <div className="mx-1">
              <p className="md:font-medium md:text-xl text-[17px] font-semibold text-gray-200">
                Registration Certificate
              </p>
            </div>
            <button
              className="md:text-3xl font-bold text-gray-500 text-xl hover:text-white"
              onClick={() => setPage('RC')}
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="border-b-[1px] border-gray-500 md:w-[95%] mt-1  w-[90%] mx-5"></div>

        {/* Profile Photo */}
        <div className="p-4">
          <div className="flex justify-between items-center cursor-pointer">
            <div className="mx-1">
              <p className="md:font-medium md:text-xl text-[17px] font-semibold text-gray-200">Profile Photo</p>
              <p className="md:text-sm text-xs text-gray-300 hover:text-gray-600">In Review</p>
            </div>
            <button
              className="md:text-3xl font-bold text-gray-500 text-xl hover:text-white"
              onClick={() => setPage('Profile')}
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="border-b-[1px] border-gray-500 md:w-[95%] mt-1 w-[90%] mx-5"></div>

        {/* Preferred Language */}
        <div className="p-4">
          <div className="flex justify-between items-center cursor-pointer">
            <div className="mx-1">
              <p className="md:font-medium md:text-xl text-[17px] font-semibold text-gray-200">Preferred Language</p>
              <p className="md:text-sm text-xs text-green-500 hover:text-green-300">Completed</p>
            </div>
            <button
              className="md:text-3xl font-bold text-gray-500 text-xl hover:text-white"
              onClick={() => setPage('Language')}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Welcomepage;
