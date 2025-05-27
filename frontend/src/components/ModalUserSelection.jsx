import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../style';

function Modal({ isOpen, onClose, onNextStep }) {
  const [user , setUser]  =  useState('null')
  if (!isOpen) return null;
  return (
    <div
    id="select-modal"
    tabIndex="-1"
    aria-hidden="true"
    className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black  bg-opacity-60"
  >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow bg-discount-gradient">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-discount-gradient">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              User Type Selection
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <ul className="space-y-4 mb-4">
              <li>
                <input
                  type="radio"
                  id="job-1"
                  name="job"
                  value="job-1"
                  className="hidden peer"
                  onClick={()=>{
                    setUser("rider")
                  }}
                  required
                />
                <label
                  htmlFor="job-1"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-800 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                       Rider
                    </div>
                    <div className="w-full text-gray-500 dark:text-gray-400">
                      Create a rider account
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="job-2"
                  name="job"
                  value="job-2"
                  className="hidden peer"
                  onClick={()=>{
                    setUser("driver")
                  }}
                />
                <label
                  htmlFor="job-2"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-800 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                    Driver
                    </div>
                    <div className="w-full text-gray-500 dark:text-gray-400">
                    Sign up to drive & deliver
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
           
            </ul>
            <button
              className={`${styles.btnCSS} w-full`}
              onClick={()=>{onNextStep(user)}}
            >
              Next step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
};


export default Modal;