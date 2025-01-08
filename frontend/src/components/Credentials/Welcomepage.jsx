import React from 'react'





function Welcomepage() {
 


  return (
    <div>
    <div className="md:w-[50%]  mx-1  md:mt-9  md:p-3 md:mx-[335px]">
      <h2 className="text-white text-3xl font-bold md:mt-1 ">Welcome, Mayuri</h2>
      <p className="text-[16px] md:text-start mb-7 mt-4 ">Here's what you need to do to set up your account.</p>
    </div>
  
    <div className="md:w-[50%] md:mx-[335px]   mx-1">
      <div className="p-3 " >
        <div className="flex justify-between items-center cursor-pointer ">
          <div className='md:mx-3 mx-0'   >
            <p className="md:font-medium  md:text-xl  text-[17px] mb-1 font-semibold  text-gray-200">Driving License - Front</p>
            <p className="md:text-sm text-xs  text-blue-700 hover:text-blue-300">Recommended next step</p>
          </div>
          <p className="md:text-2xl font-bold text-gray-300 text-xl hover:text-gray-600">&gt;</p>
        </div>
      </div>
      <div className="border-b-[1px] border-gray-500 md:w-[95%]  mt-1 md:mx-7 w-[90%] mx-5"></div>

      <div className="p-4">
        <div className="flex justify-between items-center cursor-pointer">
          <div className='md:mx-3 mx-0' >
            <p className="md:font-medium  md:text-xl  text-[17px] font-semibold  text-gray-200">Adhar Card</p>
         
          </div>
          <p className="md:text-2xl font-bold text-gray-300 text-xl hover:text-gray-600">&gt;</p>
        </div>
      </div>
      <div className="border-b-[1px] border-gray-500 md:w-[95%]  mt-1 md:mx-7 w-[90%] mx-5"></div>
      <div className="p-4">
        <div className="flex justify-between items-center cursor-pointer">
          <div className='md:mx-3 mx-0' >
            <p className="md:font-medium  md:text-xl  text-[17px] font-semibold text-gray-200">Registration Certificate</p>
          
          </div>
          <p className="md:text-2xl font-bold text-gray-300 text-xl hover:text-gray-600">&gt;</p>
        </div>
      </div>
      <div className="border-b-[1px] border-gray-500 md:w-[95%]  mt-1 md:mx-7 w-[90%] mx-5"></div>
      <div className="p-4">
        <div className="flex justify-between items-center cursor-pointer">
          <div className='md:mx-3 mx-0' >
            <p className="md:font-medium  md:text-xl  text-[17px] font-semibold text-gray-200">Profile Photo</p>
            <p className="md:text-sm text-xs text-gray-300 hover:text-gray-600">In Review</p>
          </div>
          <p className="md:text-2xl font-bold text-gray-300 text-xl hover:text-gray-600">&gt;</p>
        </div>
      </div>
      <div className="border-b-[1px] border-gray-500 md:w-[95%]  mt-1 md:mx-7 w-[90%] mx-5"></div>
      <div className="p-4">
        <div className="flex justify-between items-center cursor-pointer">
          <div className='md:mx-3 mx-0' >
            <p className="md:font-medium  md:text-xl  text-[17px] font-semibold  text-gray-200">Preferred langauge</p>
            <p className="md:text-sm text-xs text-green-500 hover:text-green-300">Completed</p>
          </div>
          
        </div>
      </div>
     
    </div>
  </div>
  
  )
}

export default Welcomepage
