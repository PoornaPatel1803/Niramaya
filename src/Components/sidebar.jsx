import React from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { FaHome, FaUserEdit, FaBug, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import darklogo from "../assets/darklogo.svg";

const Sidebar = ({ userType, isOpen, setIsOpen }) => {
  // Dynamic dashboard link
  const dashboardLink =
    userType === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";

  return (
    <div
      className={`fixed top-0 left-0 ${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 h-screen p-4 transition-all duration-300 flex flex-col`}
    >
      {/* Logo - Only Visible When Expanded */}
      {isOpen && (
        <div className="flex items-center justify-center">
          <img src={darklogo} alt="Logo" className="w-28 h-28 transition-all" />
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex flex-col items-center w-full gap-4 flex-grow mt-6">
        <SidebarItem to="/" icon={<FaHome />} label="Home" isOpen={isOpen} />
        <SidebarItem
          to={dashboardLink}
          icon={<FaClipboardList />}
          label="Dashboard"
          isOpen={isOpen}
        />

        {userType === "doctor" && (
          <SidebarItem
            to="/logs"
            icon={<FaClipboardList />}
            label="Check Logs"
            isOpen={isOpen}
          />
        )}

        <SidebarItem
          to="/edit-profile"
          icon={<FaUserEdit />}
          label="Edit Profile"
          isOpen={isOpen}
        />

        <SidebarItem
          to="/report-problem"
          icon={<FaBug />}
          label="Report a Problem"
          isOpen={isOpen}
        />
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-auto mb-4 mx-auto text-white text-2xl bg-gray-700 p-2 rounded-lg"
      >
        {isOpen ? <GoSidebarCollapse /> : <GoSidebarExpand />}
      </button>
    </div>
  );
};

const SidebarItem = ({ to, icon, label, isOpen }) => {
  return (
    <Link
      to={to}
      className={`flex items-center w-full py-3 px-4 rounded-lg text-white transition-all duration-300 ${
        isOpen ? "justify-start" : "justify-center"
      } hover:bg-gray-700`}
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <span className="whitespace-nowrap ml-3">{label}</span>}
    </Link>
  );
};

export default Sidebar;
