// src/components/Layout.jsx
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
      <div className="flex-1 flex flex-col ml-64"> {/* ml-64 để tránh che Sidebar */}
        {/* Header cố định */}
        <div className="fixed top-0 left-64 right-0 z-10 bg-white">
          <Header />
        </div>

        {/* Khu vực render các trang con */}
        <main className="flex-1 p-6 mt-16"> {/* mt-16 để tránh bị che bởi Header */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;