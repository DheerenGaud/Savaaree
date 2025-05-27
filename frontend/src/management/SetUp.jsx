import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { set_Ui } from '../redux/slice/helperSlice';
import { user_Data_Api } from '../api/savaree_api/user_api';
import styles from '../style';

const SetUp = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = document.cookie.includes('authenticated'); 

  useEffect(() => {
    if (location.pathname.startsWith('/rider')) {
      dispatch(set_Ui({ name: 'showFooter', value: false }));
      // dispatch(set_Ui({ name: 'showNavBar', value: false }));
      document.body.classList.add('remove-padding-mobile'); 
    } else {
      dispatch(set_Ui({ name: 'showFooter', value: true }));
      dispatch(set_Ui({ name: 'showNavBar', value: true }));
      document.body.classList.remove('remove-padding-mobile'); // Remove class for other routes
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(user_Data_Api());
    }
  }, [isAuthenticated, dispatch]);

  return <>{children}</>;
};

export default SetUp;
