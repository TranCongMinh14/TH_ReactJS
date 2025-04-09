import React from "react";
import Overview from "../components/Overview";
import ReportTable from "../components/ReportTable";

const Dashboard = () => {
  return (
    <div>
      {/* Overview Section */}
      <div className="mb-6">
        <Overview />
      </div>

      {/* ReportTable Section */}
      <div>
        <ReportTable />
      </div>
    </div>
  );
};

export default Dashboard;   