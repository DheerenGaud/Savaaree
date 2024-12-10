import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../constants/index";
function Navbar() {
  const navigate = useNavigate();

  const MoveToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <div className="flex space-x-8">
        <img
          src="/assets/SAVAAREE_LOGO.png"
          onClick={MoveToHome}
          alt="Savaaree Logo"
          className="w-[124px] h-[32px]"
        />

        <ul className=" list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav, id) => (
            <li
              key={id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                id === navLinks.length - 1 ? "mr-0" : "mr-10"
              } text-white`}
            >
              <NavLink
                to={nav.path}
                activeClassName="active"
                exact
                className="font-medium hover:text-blue-300"
              >
                {nav.element}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <ul className="list-none flex justify-end items-center flex-1">
        <li className=" font-poppins font-normal cursor-pointer text-[16px]  text-white">
          <NavLink
            to="/login"
            activeClassName="active"
            className="text-white font-medium ml-5 mr-4 hover:text-blue-300"
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            activeClassName="active"
            className="bg-white text-black font-medium rounded-full px-3 py-2 ml-2 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            Signup
          </NavLink>
        </li>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? "/assets/close.svg" : "/assets/menu.svg"}
          alt="o/c"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => {
            setToggle((prev) => !prev);
          }}
        />
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[120px] rounded-xl sidebar`}
        >
          <ul className=" list-none flex flex-col  justify-end items-center flex-1">
            {navLinks.map((nav, id) => (
              <li
                key={id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${
                  id === navLinks.length - 1 ? "mr-0" : "mb-4"
                } text-white`}
              >
                <NavLink
                  to={nav.path}
                  activeClassName="active"
                  exact
                  // className="text-white font-bold hover:text-blue-300"
                >
                  {nav.element}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
