// src/components/ExportButton.jsx
import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExportButton = ({ customers }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle export to CSV or Excel
  const handleExport = (format) => {
    if (format === "csv") {
      const headers = ["id,customerName,company,orderValue,orderDate,status,avatar"];
      const rows = customers.map((customer) =>
        `${customer.id},${customer.customerName},${customer.company},${customer.orderValue},${customer.orderDate},${customer.status},${customer.avatar}`
      );
      const csvContent = [...headers, ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "customers_export.csv";
      link.click();
      URL.revokeObjectURL(link.href);
    } else if (format === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(customers);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
      XLSX.writeFile(workbook, "customers_export.xlsx");
    }
    setIsDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 border border-pink-500 text-pink-500 px-4 py-1.5 rounded-lg text-sm hover:bg-pink-50 cursor-pointer"
      >
        <img src="src/assets/img/Export.png" alt="icon" className="w-4 h-4" />
        Export
      </button>
      {isDropdownOpen && (
        <div className="absolute bg-white border border-gray-200 shadow-lg rounded-lg mt-1 right-0 z-10">
          <button
            onClick={() => handleExport("csv")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Export as CSV
          </button>
          <button
            onClick={() => handleExport("excel")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Export as Excel
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;