import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ChooseRides = () => {
    const {drivers,freeDrivers,duration,distance} = useSelector((state) => state.RideSlice);
    
    const [selectedRide, setSelectedRide] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [ShowCashModal, setShowCashModal] = useState(false);
    const [ShowGiftModal, setShowGiftModal] = useState(false);

    const handleRideClick = (index) => {
        setSelectedRide(index === selectedRide ? null : index);
    };

    const handlePaymentButtonClick = () => {
        setShowPaymentModal(true);
    };

    const handleCashButtonClick = () => {
        setShowCashModal(true);
    };
    const handleGiftButtonClick = () => {
        setShowGiftModal(true);
    };

    const handleCloseModal = () => {
        setShowPaymentModal(false);
    };
    const handleCashCloseModal = () => {
        setShowCashModal(false);
    };
    const handleGiftCloseModal = () => {
        setShowGiftModal(false);
    };

    const rides = [
        { name: 'Uber Go', time: '1 Min away · 9:37 PM', price: '₹299.90', description: 'Affordable compact rides', image: '/assets/ubergo.png' },
        { name: 'My Auto', time: '66 Min away · 9:37 PM', price: '₹200', description: 'No Bargaining , Doorstep Pick-up', image: '/assets/uberauto.png' },
        { name: 'Uber Go', time: '1 Min away · 9:37 PM', price: '₹299.90', description: 'Affordable compact rides', image: '/assets/ubergo.png' },
        { name: 'My Auto', time: '66 Min away · 9:37 PM', price: '₹200', description: 'No Bargaining , Doorstep Pick-up', image: '/assets/uberauto.png' },
        { name: 'Uber Auto', time: '4 Min away · 9:37 PM', price: '₹300.90', description: 'No Bargaining , Doorstep Pick-up', image: '/assets/uberauto.png' },
        { name: 'Uber Go', time: '1 Min away · 9:37 PM', price: '₹299.90', description: 'Affordable compact rides', image: '/assets/ubergo.png' },
    ];

    return (
      
      ( 
<div className="text-white bg-discount-gradient w-full md:w-[500px] max-h-screen overflow-y-auto p-5">
<div className="flex items-center justify-center mb-3 md:hidden">
          <div className="h-1 bg-slate-400 rounded-lg w-16"></div>
        </div>
        <h1 className="md:text-4xl text-sm flex items-center justify-center md:items-start md:flex md:justify-start font-bold mb-3">
          Choose a ride 
        </h1>
        <h3 className='font-bold  hidden md:block'>
         Distance : {distance} km | Duration : {duration}
        </h3>
        <div className='flex flex-col items-center mt-5'>
        {drivers.length>0&&<h3 className="md:text-xl  font-semibold  hidden md:block ">Shearing</h3>}
     
        {drivers.map((ride, index) => (
          <div
            key={index}
            className={`flex items-center justify-between gap-3 mb-3 cursor-pointer md:pr-6 pr-3 ${
              selectedRide === index ? "border-2 rounded-2xl border-gray-500" : ""
            }`}
            onClick={() => handleRideClick(index)}
          >
            <img src={`/assets/${ride.vehicle.type}.png`} alt={ride.vehicle.type} className="w-[25%]" />
            <div className="flex-1">
              <h2 className="md:text-2xl text-[17px] font-bold">{ride.vehicle.make} {ride.vehicle.model}</h2>
              <p className="md:text-[16px] text-xs">{ride.duration} away </p>
              <p className="md:text-[16px] pt-1 text-xs text-gray-500"> Capacity : {ride.vehicle.maxCap} | Current : 0</p>
            </div>
            <div className="md:text-2xl text-sm font-bold text-right">₹299.90</div>
          </div>
        ))}
        </div>
        <div className='flex flex-col items-center mt-5'>
        {freeDrivers.length>0&&  <h3 className="md:text-xl  font-semibold  hidden md:block  ">New Ride</h3>}
     
        {freeDrivers.map((ride, index) => (
          <div
          key={index}
          className={`flex items-center justify-between gap-3 mb-3 cursor-pointer md:pr-6 pr-3 ${
            selectedRide === index ? "border-2 rounded-2xl border-gray-500" : ""
          }`}
          onClick={() => handleRideClick(index)}
        >
          <img src={`/assets/${ride.vehicle.type}.png`} alt={ride.vehicle.type} className="w-[25%]" />
          <div className="flex-1">
            <h2 className="md:text-2xl text-[17px] font-bold">{ride.vehicle.make} {ride.vehicle.model}</h2>
            <p className="md:text-[16px] text-xs">{ride.duration} away </p>
            <p className="md:text-[16px] pt-1 text-xs text-gray-500"> Capacity : {ride.vehicle.maxCap} | Current : 0</p>
          </div>
          <div className="md:text-2xl text-sm font-bold text-right">₹299.90</div>
        </div>
        ))}
        </div>


  
        {/* Sticky Footer */}
        <div className="sticky bottom-0 left-0 w-full bg-gray-900 md:flex text-white p-5 bg-discount-gradient shadow-[0_-4px_4px_rgba(0,0,0,0.9)]">
          <div className="flex gap-2 cursor-pointer md:items-center md:justify-center">
            <img src="/assets/payment.png" className="md:w-[16px] md:h-[16px] w-[13px] h-[13px] md:mt-0 mt-1" alt="" />
            <button className="md:text-[14px] text-[15px] font-semibold" onClick={handlePaymentButtonClick}>
              Add Payment Method
            </button>
            <img src="/assets/whitedown.png" className="md:w-[16px] md:h-[16px] w-[13px] h-[13px] md:ml-0 md:mt-0 ml-20 mt-1" alt="" />
          </div>
          <button className="py-3 px-4 md:w-[50%] w-full font-poppins mt-4 font-medium md:ml-12 text-primary bg-blue-gradient rounded-[10px] text-[16px] outline-none">
            {selectedRide !== null ? `Request to ${rides[selectedRide].name}` : "Select a ride"}
          </button>
        </div>
  
        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white text-black h-[540px] rounded-lg shadow-lg w-[98%] max-w-lg p-6">
              <div className="flex justify-between pb-6">
                <h1 className="text-xl font-bold">Add Payment Method</h1>
                <img src="/assets/cancel.png" className="w-[18px] cursor-pointer" onClick={handleCloseModal} alt="Close" />
              </div>
              <div>
                <div className="flex items-center w-full gap-3 pt-4 border-b border-gray-130 pb-6 cursor-pointer" onClick={handleCashButtonClick}>
                  <img src="/assets/cash.png" alt="" className="w-[25px]" />
                  <p className="text-[18px] font-semibold">Cash</p>
                  <div className="ml-auto text-right mr-2">
                    <img src="/assets/arrowleft.png" alt="" className="w-[12px]" />
                  </div>
                </div>
                <div className="flex items-center w-full gap-3 pt-4 cursor-pointer" onClick={handleGiftButtonClick}>
                  <img src="/assets/giftcard.png" alt="" className="w-[25px]" />
                  <p className="text-[18px] font-semibold">Gift Card</p>
                  <div className="ml-auto text-right mr-2">
                    <img src="/assets/arrowleft.png" alt="" className="w-[12px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
  
        {/* Cash Modal */}
        {ShowCashModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="bg-white text-black h-[540px] rounded-lg shadow-lg w-[98%] max-w-lg">
              <div className="relative">
                <img src="/assets/cashimg.svg" alt="" className="w-full max-w-2xl rounded-t-lg" />
                <img src="/assets/cancel.png" className="absolute w-[18px] top-4 right-4 cursor-pointer" onClick={handleCashCloseModal} alt="Close" />
              </div>
              <div className="p-4 mb-32">
                <h1 className="text-2xl mb-6 font-bold">Cash Payment Selected</h1>
                <p className="text-[18px]">Change may not be available, so pay with the exact cash amount if you can.</p>
              </div>
              <div className="p-4">
                <button className="py-3 px-4 w-full font-medium text-primary bg-blue-gradient rounded-[10px] text-[16px] outline-none">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
        )
    );
};

export default ChooseRides;
