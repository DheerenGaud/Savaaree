import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from "../style";

function MainLayout() {
  return (
    <div className="bg-primary w-full overflow-hidden">
        <div  className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
         <Navbar/>
        </div>
        </div>
        <div className={` bg-primary ${styles.flexStart}`}>
           <div className={`${styles.boxWidth}`}>
              <Outlet/>
           </div>
      </div>

         <Footer/>
    </div>
  )
}

export default MainLayout
