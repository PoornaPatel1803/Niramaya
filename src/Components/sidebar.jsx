import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTachometerAlt,
  FaUserEdit,
  FaBug,
  FaChevronLeft,
  FaChevronRight,
  FaFileMedicalAlt,
} from "react-icons/fa";
import NiramayaLogo from "../assets/darkLogo.svg"

const Sidebar = ({ userType = "patient", isOpen = true, setIsOpen }) => {
  const collapsed = !isOpen;
  const location = useLocation();

  const commonItems = [
    { label: "Home", icon: <FaHome />, path: "/" },
    { label: "Edit Profile", icon: <FaUserEdit />, path: "/edit-profile" },
    { label: "Report a Problem", icon: <FaBug />, path: "/report-problem" },
  ];

  const doctorItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/doctor-dashboard" },
  ];

  const patientItems = [
    { label: "My Records", icon: <FaFileMedicalAlt />, path: "/patient-dashboard" },
  ];

  const menuItems =
    userType === "doctor"
      ? [...commonItems.slice(0, 1), ...doctorItems, ...commonItems.slice(1)]
      : [...commonItems.slice(0, 1), ...patientItems, ...commonItems.slice(1)];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#1f2937] text-white z-50 flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center py-6 text-teal-400 text-xl font-bold">
          {!collapsed && (
            <>
              <img src={NiramayaLogo} alt="" className="p-11"/> 
            </>
          )}
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-4 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-4 p-2 rounded-md hover:bg-teal-600 transition ${
                location.pathname === item.path ? "bg-teal-700" : ""
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Collapse Button */}
      <div className="flex justify-center p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
