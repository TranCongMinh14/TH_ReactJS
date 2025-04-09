import React from 'react';
import Overview from './Overview';
import ReportTable from './ReportTable';
import './Dashboard.css';
import imgQuestion from '../assets/img/Question 1.png';
import imgAvt from '../assets/img/Avatar.png';

function Dashboard() {
  return (
    <div className="container flex min-h-screen">
      {/* Sidebar */}
      <aside className="sidebar w-64 bg-white shadow-md">
        <h2 className="p-4 text-2xl font-bold text-gray-800">Logo</h2>
        <ul className="mt-4">
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Dashboard</li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Projects</li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Teams</li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Analytics</li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Messages</li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Integrations</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="header p-4 bg-white shadow-sm flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <input
              className="search_bar px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              type="search"
              name="search"
              id="search"
              placeholder="Search..."
            />
            <span>
              <img src={imgQuestion} alt="question" className="w-8 h-8" />
            </span>
            <span>
              <img src={imgAvt} alt="avt" className="w-8 h-8" />
            </span>
          </div>
        </header>

        {/* Main */}
        <main className="main p-6 flex-1">
          <div className="overview mb-6">
            <Overview />
          </div>
          <div className="report">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Detailed Report</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-lg text-gray-600">Import</button>
                <button className="px-3 py-1 bg-pink-500 text-white rounded-lg">Export</button>
              </div>
            </div>
            <ReportTable />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;