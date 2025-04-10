import React from "react";
import Overview from "../components/Overview";
import ReportTable from "../components/ReportTable";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";

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