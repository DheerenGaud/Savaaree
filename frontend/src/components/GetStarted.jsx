import styles from "../style";
import React, { useState } from 'react';
import Modal from "./ModalUserSelection";
import { useDispatch, useSelector } from "react-redux";
import {add_User_Type} from "../redux/slice/userSlice"

const GetStarted = () => {
  const  dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNextStep = (userType) => {
    console.log(userType);
    dispatch(add_User_Type(userType))
    setIsModalOpen(false);
  };
  const [toggle, setToggle] = useState(false);

  return ( 
    < >
   
  <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`} onClick={toggleModal}>
    <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}>
      <div className={`${styles.flexStart} flex-row`} >
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-gradient">Get</span>
        </p>
        <img src="/assets/arrow-up.svg" alt="arrow-up" className="w-[23px] h-[23px] object-contain" />
      </div>
      
      <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
        <span className="text-gradient">Started</span>
      </p>
    </div>
  </div>
 <Modal 
  isOpen={isModalOpen}
  onClose={toggleModal}
  onNextStep={handleNextStep}
  />
 </>
  );
}

export default GetStarted;