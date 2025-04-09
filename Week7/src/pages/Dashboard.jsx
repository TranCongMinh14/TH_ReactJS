import React from "react";
import Header from "../components/Header";
import Overview from "../components/Overview";
import ReportTable from "../components/ReportTable";

function Dashboard() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="p-6 flex-1">
        <div className="mb-6">
          <Overview />
        </div>
        <div>
          <ReportTable />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;