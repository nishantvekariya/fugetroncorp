import React from "react";

import { routes } from "../../utils/routes";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="w-screen flex flex-row items-center p-1 justify-between border-b-2 border-gray-500 shadow-xs">
      <div className="ml-8 text-lg text-white hidden md:flex">
        <button className="inline-flex items-center px-3 py-2 text-3xl font-black rounded px-4 py-2 leading-6 text-primary-100 text-gray-500">
          Task
        </button>
      </div>

      <div className="flex flex-row-reverse mr-8 hidden md:flex">
        <a
          href={routes.list}
          className="inline-flex items-center px-3 py-2 text-2xl semibold rounded px-4 py-2 leading-6 text-primary-100 text-gray-500"
        >
          Home
        </a>
      </div>
      <div className="flex flex-row-reverse mr-4 ml-4 md:hidden ">
        <i className="fas fa-bars"></i>
      </div>
    </div>
  );
};

export default Navbar;
