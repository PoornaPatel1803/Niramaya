import React from 'react';
import logo from "../assets/NiramayaLogo.svg";

const Footer = () => {
  return (
    <footer className="dark:bg-gradient-to-r from-blue-700 to-blue-900 ">
      <div className="w-full max-w-screen-xl mx-auto  md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-100 sm:mb-0 dark:text-gray-100">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-100 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-100">
          © 2025 <span className="hover:underline">Helios Solutions™</span>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
