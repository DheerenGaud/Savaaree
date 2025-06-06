import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./ModalUserSelection.jsx";
import { useDispatch, useSelector } from "react-redux";
import { add_User_Type } from "../redux/slice/userSlice";
import { set_NavigateTo ,pop_From_BackStack } from "../redux/slice/helperSlice.js";
import { user_Logout_Api } from "../api/savaree_api/user_api.js";

function Navbar({ navLinks, riderNavLinks, riderProfileLinks }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const timeoutRef = useRef(null);
  const [toggle, setToggle] = useState(false);

  const {showNavBar,showBack} = useSelector((state) => state.HelperSlice);

  const MoveToHome = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    const result = await dispatch(user_Logout_Api());
    if (result.payload.success) {
      navigate("/");
    }
  };

  const handleBack = () => {
    dispatch(pop_From_BackStack())
    dispatch(pop_From_BackStack())

  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLoginOrSignup = (action) => {
    toggleModal();
    dispatch(set_NavigateTo(action));
  };

  const handleNextStep = (userType) => {
    dispatch(add_User_Type(userType));
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleProfileHover = (open) => {
    if (open) {
      clearTimeout(timeoutRef.current);
      setIsProfileMenuOpen(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsProfileMenuOpen(false);
      }, 500);
    }
  };

  return (
    showNavBar&& <nav className="w-full flex py-2 justify-between items-center navbar ">
      <div className="flex space-x-5 justify-between items-center">

       {showBack&&<img
          src="/assets/back.png"
          alt="Savaaree Logo"
          className="w-[28px] h-[25px] cursor-pointer mx-2"
          onClick={handleBack}
        />}
        
        <img
          src="/assets/SAVAAREE_LOGO.png"
          onClick={MoveToHome}
          alt="Savaaree Logo"
          className="w-[124px] h-[32px] cursor-pointer"
        />

        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks &&
            navLinks.map((nav, id) => (
              <li
                key={id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${
                  id === navLinks.length - 1 ? "mr-0" : "mr-10"
                } text-white`}
              >
                <NavLink
                  to={nav.path}
                  className={({ isActive }) =>
                    `font-medium ${isActive ? "text-blue-300" : "hover:text-blue-300"}`
                  }
                >
                  {nav.element}
                </NavLink>
              </li>
            ))}

          {riderNavLinks &&
            riderNavLinks.map((nav, id) => (
              <li
                key={id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${
                  id === riderNavLinks.length - 1 ? "mr-0" : "mr-10"
                } text-white`}
              >
                <NavLink
                  to={nav.path}
                  className={({ isActive }) =>
                    `font-medium ${isActive ? "text-blue-300" : "hover:text-blue-300"}`
                  }
                >
                  {nav.element}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>

      <ul className="list-none flex justify-end items-center">
        {!riderProfileLinks && (
          <>
            <li className="font-poppins font-normal cursor-pointer text-[16px] text-white">
              <button
                onClick={() => {
                  handleLoginOrSignup("login");
                }}
                className="text-white font-medium ml-5 mr-4 hover:text-blue-300"
              >
                Login
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLoginOrSignup("signup");
                }}
                className="bg-white text-black font-medium rounded-full px-3 py-2 ml-2 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Signup
              </button>
            </li>
          </>
        )}

        {riderProfileLinks && (
          <>
            {/* <li>
              <button className="bg-white text-black font-medium rounded-full px-3 py-2 ml-2 hover:bg-gray-100 transition duration-300 ease-in-out">
                Activity
              </button>
            </li> */}
            <li
              className="ml-4 relative"
              onMouseEnter={() => handleProfileHover(true)}
              onMouseLeave={() => handleProfileHover(false)}
            >
              <img
                src="assets/defaul_profile.jpeg"
                alt="profile"
                className="w-[30px] h-[30px] rounded-full cursor-pointer"
              />
              {isProfileMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg z-10"
                  onMouseEnter={() => handleProfileHover(true)}
                  onMouseLeave={() => handleProfileHover(false)}
                >
                  <ul className="text-sm text-gray-500">
                    {riderProfileLinks.map((nav, id) => (
                      <li key={id} className="rounded-lg">
                        {nav.element === "logout" ? (
                          <button
                            onClick={handleLogout}
                            className="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-300"
                          >
                            Logout
                          </button>
                        ) : (
                          <NavLink
                            to={nav.path}
                            className="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-300"
                          >
                            <span className="text-sm font-medium">
                              {nav.element}
                            </span>
                          </NavLink>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </>
        )}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? "/assets/close.svg" : "/assets/menu.svg"}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => {
            setToggle((prev) => !prev);
          }}
        />
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[120px] rounded-xl sidebar z-10`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks &&
              navLinks.map((nav, id) => (
                <li
                  key={id}
                  className={`font-poppins font-normal cursor-pointer text-[16px] ${
                    id === navLinks.length - 1 ? "mr-0" : "mb-4"
                  } text-white`}
                >
                  <NavLink
                    to={nav.path}
                    className={({ isActive }) =>
                      `font-bold ${isActive ? "text-blue-300" : "hover:text-blue-300"}`
                    }
                  >
                    {nav.element}
                  </NavLink>
                </li>
              ))}

            {riderNavLinks &&
              riderNavLinks.map((nav, id) => (
                <li
                  key={id}
                  className={`font-poppins font-normal cursor-pointer text-[16px] ${
                    id === riderNavLinks.length - 1 ? "mr-0" : "mb-4"
                  } text-white`}
                >
                  <NavLink
                    to={nav.path}
                    className={({ isActive }) =>
                      `font-bold ${isActive ? "text-blue-300" : "hover:text-blue-300"}`
                    }
                  >
                    {nav.element}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onNextStep={handleNextStep}
      />
    </nav>
  );
}

export default Navbar;
