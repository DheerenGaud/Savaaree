import React from 'react';
import styles from "../style";

function RideForm() {
  return (
    <div className='flex justify-between flex-col sm:w-[500px] space-y-3 ss:w-[300px] py-5'>
      <div className='flex flex-1 flex-col space-y-3'>
        <input
          type="text"
          placeholder='Pickup location'
          className='p-3 placeholder-gray-600 rounded-md h-full pl-5'
        />
        <input
          type="text"
          placeholder="Dropoff location "
          className='p-3 placeholder-gray-600 rounded-md h-full pl-5'
        />
      </div>
      <div className='flex flex-row space-x-2'>
        <input
          type="date"
          className='p-3 rounded-md sm:w-[250px] ss:w-[150px] h-full pl-5'
        />
        <input
          type="time"
          className='p-3 rounded-md sm:w-[250px] ss:w-[150px] h-full pl-5'
        />
      </div>
      <div>
        <button className={`${styles.btnCSS}`}>Submit</button>
      </div>
    </div>
  );
}

export default RideForm;