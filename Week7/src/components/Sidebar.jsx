import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/img/Logo.png";
// Import các icon dưới dạng tài nguyên tĩnh
import DashboardIcon from "../assets/img/SquaresFour1.png";
import ProjectsIcon from "../assets/img/Folder.png";
import TeamsIcon from "../assets/img/Groups.png";
import AnalyticsIcon from "../assets/img/PieChart.png";
import MessagesIcon from "../assets/img/Chat.png";
import IntegrationsIcon from "../assets/img/Code.png";
import Banner from "../assets/img/Banner.png";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
      {/* Logo và Menu */}
      <div>
        <h2 className="p-4 text-xl font-bold text-gray-800 flex items-center">
          <span className="mr-2 text-2xl">
            <img src={Logo} alt="logo" className="w-full h-full" />
          </span>
        </h2>
        <ul className="mt-4">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 bg-pink-100 text-pink-500 flex items-center"
                  : "px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              }
            >
              <img src={DashboardIcon} alt="Dashboard Icon" className="w-5 h-5 mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 bg-pink-100 text-pink-500 flex items-center"
                  : "px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              }
            >
              <img src={ProjectsIcon} alt="Projects Icon" className="w-5 h-5 mr-2" />
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 bg-pink-100 text-pink-500 flex items-center"
                  : "px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              }
            >
              <img src={TeamsIcon} alt="Teams Icon" className="w-5 h-5 mr-2" />
              Teams
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 bg-pink-100 text-pink-500 flex items-center"
                  : "px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              }
            >
              <img src={AnalyticsIcon} alt="Analytics Icon" className="w-5 h-5 mr-2" />
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/messages"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 bg-pink-100 text-pink-500 flex items-center"
                  : "px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              }
            >
              <img src={MessagesIcon} alt="Messages Icon" className="w-5 h-5 mr-2" />
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/integrations"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 bg-pink-100 text-pink-500 flex items-center"
                  : "px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              }
            >
              <img src={IntegrationsIcon} alt="Integrations Icon" className="w-5 h-5 mr-2" />
              Integrations
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Quảng cáo V2.0 */}
      <div className="p-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <img
            src={Banner}
            alt="V2.0 illustration"
            className="w-full h-full object-cover mb-2"
          />
          <p className="text-sm font-semibold text-gray-800">V2.0 is available</p>
          <button className="mt-2 px-4 py-1 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
            Try now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;