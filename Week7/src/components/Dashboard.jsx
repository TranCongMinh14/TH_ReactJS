// Dashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Overview from './Overview';
import ReportTable from './ReportTable';

function Dashboard() {
  return (
    <div className="container flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main */}
        <main className="main p-6 flex-1">
          <div className="overview mb-6">
            <Overview />
          </div>
          <div className="report">
            <ReportTable />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;