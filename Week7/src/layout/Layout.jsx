import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar cố định */}
      <Sidebar />

      {/* Nội dung chính */}
      <div className="flex-1 flex flex-col">
        {/* Header cố định */}
        <Header />

        {/* Khu vực render các trang con */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;