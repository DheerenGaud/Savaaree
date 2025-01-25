import React, { useState } from 'react';

const ChooseRides = () => {
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
        <div className="text-white bg-discount-gradient  h-[650px] md:h-[100%] md:overflow-auto p-5 overflow-auto ">
            <div className='flex items-center justify-center mb-3 md:hidden '>
                <div className='h-1 bg-slate-400 rounded-lg w-16  '></div>
                
            </div>
            <h1 className="md:text-4xl text-sm flex items-center justify-center md:items-start md:flex  md:justify-start font-bold mb-3">Choose a ride</h1>
            <h3 className="md:text-xl  font-semibold mb-3 hidden md:block">Recommended</h3>

            {rides.map((ride, index) => (
                <div
                    key={index}
                    className={`flex items-center justify-between gap-3 mb-5 cursor-pointer md:pr-6 pr-3 ${selectedRide === index ? 'border-2 rounded-2xl border-gray-500' : ''}`}
                    onClick={() => handleRideClick(index)}
                >
                    <img src={ride.image} alt={ride.name} className="w-[30%]" />
                    <div className="flex-1">
                        <h2 className="md:text-2xl  text-[17px] font-bold">{ride.name}</h2>
                        <p className="md:text-[16px]  text-xs">{ride.time}</p>
                        <p className="md:text-[16px] text-xs text-gray-500">{ride.description}</p>
                    </div>
                    <div className="md:text-2xl text-sm font-bold text-right">{ride.price}</div>
                </div>
            ))}

            <div className="sticky items-center  justify-evenly bottom-0 left-0 w-full bg-gray-900 md:flex text-white p-5 bg-discount-gradient shadow-[0_-4px_4px_rgba(0,0,0,0.9)]">
                <div className='flex gap-2 cursor-pointer md:items-center md:justify-center'>
                <img src="/assets/payment.png" className='md:w-[16px] md:h-[16px] w-[13px] h-[13px]  md:mt-0 mt-1 ' alt="" />
                <button className="md:text-[14px] text-[15px] font-semibold" onClick={handlePaymentButtonClick}>
                    Add Payment Method 
                </button>
                <img src="/assets/whitedown.png" className='md:w-[16px] md:h-[16px] w-[13px] h-[13px] md:ml-0 md:mt-0  ml-20 mt-1 ' alt="" />
                </div>
                <button
                    className="py-3 px-4 md:w-[50%] w-full font-poppins mt-4 font-medium md:ml-12  text-primary bg-blue-gradient rounded-[10px] text-[16px] outline-none"
                >
                    {selectedRide !== null ? `Request to ${rides[selectedRide].name}` : 'Select a ride'}
                </button>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white text-black h-[540px] rounded-lg shadow-lg w-[98%] max-w-lg p-6">


                        <div className="flex justify-between  pb-6">
                            <h1 className='text-xl font-bold'>Add Payment Method</h1>
                            <img
                                src='/assets/cancel.png'
                                className="text-gray-500 w-[18px] h-[18px] cursor-pointer"
                                onClick={handleCloseModal}>
                       
                            </img>

                        </div>
                        <div>
                            <div className="flex items-center w-full gap-3 pt-4 border-b border-gray-130 pb-6 cursor-pointer " onClick={handleCashButtonClick}>
                                <img src="/assets/cash.png" alt="" className="w-[25px]" />
                                <p className="text-[18px] font-semibold">Cash</p>
                                <div className="ml-auto text-right mr-2">
                                    <p><img src="/assets/arrowleft.png" alt=""  className='w-[12px]'/></p>
                                </div>
                            </div>
                            <div className="flex items-center w-full gap-3 pt-4 cursor-pointer " onClick={handleGiftButtonClick}>
                                <img src="/assets/giftcard.png" alt="" className="w-[25px]" />
                                <p className="text-[18px] font-semibold">Gift Card</p>
                                <div className="ml-auto text-right mr-2">
                                <p><img src="/assets/arrowleft.png" alt=""  className='w-[12px]'/></p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            )}
             {/* cash Modal */}
             {ShowCashModal && (
                <div className="fixed top-0 left-0 w-full h-full  flex items-center justify-center z-50 ">
                    <div className="bg-white text-black h-[540px] rounded-lg shadow-lg w-[98%] max-w-lg">


                        <div className="relative ">
                           <img src="/assets/cashimg.svg" alt="" className=' w-full max-w-2xl rounded-t-lg' />
                           <img
                                src='/assets/cancel.png'
                                className="text-black-500 absolute w-[18px] top-4 right-4 cursor-pointer"
                                onClick={handleCashCloseModal}>
                            </img>
                        </div> 
                        <div className='p-4 mb-32'>
                            <h1 className='text-2xl mb-6 font-bold'>Cash Payment Selected</h1>
                            <p className='text-[18px]'>Change may not be available, so pay with the exact cash amount if you can.</p>
                        </div>
                        <div className=' left-0 w-full p-4 '>
                            <button  className="py-3 px-4  font-poppins w-full  font-medium  text-primary bg-blue-gradient rounded-[10px] text-[16px] outline-none" >
                                Confirm
                            </button>
                        </div>

                    </div>
                </div>
            )}
             {/* cash Modal */}
             {ShowGiftModal && (
                <div className="fixed top-0 left-0 w-full h-full  flex items-center justify-center z-50 ">
                    <div className="bg-white text-black h-[540px] rounded-lg shadow-lg w-[98%] max-w-lg">


                        <div className="relative ">
                           <img src="/assets/cashimg.svg" alt="" className=' w-full max-w-2xl rounded-t-lg bg-slate-500 grayscale' style={{ filter: "grayscale(100%)" }} />
                            <img
                                src='/assets/cancel.png'
                                className="text-black-500 absolute w-[18px] top-4 right-4 cursor-pointer"
                                onClick={handleGiftCloseModal}>
                            </img>

                        </div> 
                        <div className='p-4  mb-36'>
                            <h1 className='text-2xl mb-6 font-bold'>Add Gift Card</h1>
                            <input type="text"  placeholder='Enter Your Code' className='w-[95%] text-[17px] ml-2 text-gray-800 bg-slate-200 p-2'/>
                        </div>
                        <div className=' w-full p-4 '>
                            <button  className="py-3 px-4  font-poppins w-full  font-medium  text-white  bg-gray-gradient rounded-[10px] text-[16px] outline-none" >
                                Apply
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ChooseRides;
