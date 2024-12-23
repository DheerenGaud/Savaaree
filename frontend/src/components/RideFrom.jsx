import React from 'react';
import styles from "../style";

function RideForm() {
  return (
    <div className='flex  flex-col sm:w-[400px] space-y-3 ss:w-[300px] md:py-5'>
      <div className='flex  flex-col space-y-3'>
        <input
          type="text"
          placeholder='Pickup location'
          className='p-3 placeholder-gray-600 rounded-md pl-5'
        />
        <input
          type="text"
          placeholder="Dropoff location "
          className='p-3 placeholder-gray-600 rounded-md  pl-5'
        />
      </div>
      <div className='flex flex-row space-x-2 '>
        <input
          type="date"
          className='p-3 rounded-md sm:w-[250px] ss:w-[50px]  hidden md:block'
        />
        <input
          type="time"
          className='p-3 rounded-md sm:w-[250px] ss:w-[50px] hidden md:block '
        />
      </div>
      <div >
        <button className={`${styles.btnCSS} hidden md:block`}>Submit</button>
      </div>
    </div>
  );
}

export default RideForm;