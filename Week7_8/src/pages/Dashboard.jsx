import React from "react";
import Overview from "../components/Overview";
import DataTable from "../components/DataTable";


const Dashboard = () => {
  return (
    <div>
      {/* Overview Section */}
      <div className="mb-6">
        <Overview />
      </div>

      {/* ReportTable Section */}
      <div>
        <DataTable></DataTable>
      
      </div>
    </div>
  );
};

export default Dashboard;   