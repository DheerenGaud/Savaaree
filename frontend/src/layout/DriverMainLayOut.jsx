import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from "../style";
 import {riderNavLinks,riderProfileLinks} from "../constants/index"

 import { useSelector } from 'react-redux';
 import Loading from '../components/Loading'; // Assuming you have a Loading component
import Alert from '../components/Alert';

 
 function RiderMainLayout() {
  const { loading } = useSelector((state) => state.UserSlice);

  return (
    <div className="bg-primary w-full overflow-hidden">
          <Alert/>
      <div  className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
         <Navbar  navLinks={null} riderNavLinks={riderNavLinks} riderProfileLinks={riderProfileLinks}/>
        </div>
        </div>

              {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading /> {/* Loading spinner component */}
        </div>
      ) : (
        // If not loading, show the Outlet (child components)
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Outlet />
          </div>
        </div>
      )}
<div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
<div className={`${styles.boxWidth}`}>

         <Footer/>
  </div>
  </div>

    </div>
  )
}

export default RiderMainLayout
