// MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { navLinks } from '../constants/index';
import styles from '../style';



import Loading from '../components/Loading'; // Assuming you have a Loading component
import { useSelector } from 'react-redux';
import Alert from '../components/Alert';
import Stats from "../components/LandingPage/Stats";
import Business from "../components/LandingPage/Business";
import Billing from "../components/LandingPage/Billing";
import CardDeal from "../components/LandingPage/CardDeal";
import Testimonials from '../components/LandingPage/Testimonials';
import CTA from '../components/LandingPage/CTA';

function MainLayout() {
  // Get the loading state from Redux
  const { loading } = useSelector((state) => state.UserSlice);

  return (
    <div className="bg-primary w-full overflow-hidden">
      {/* Navbar */}
       
        <Alert />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar navLinks={navLinks} riderNavLinks={null} riderProfileLinks={null} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading /> 
        </div>
      ) : (
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`} >
            <Outlet />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats/>
        <Business/>
        <Billing/>
        <CardDeal/>
        <Testimonials/>
        <CTA/>
        <Footer />
      </div>
      </div>
    </div>
  );
}

export default MainLayout;
