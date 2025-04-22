// src/components/ImportButton.jsx
import React from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const ImportButton = ({ onImportSuccess }) => {
  // Handle import from CSV or Excel
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "csv") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const lines = text.split("\n").filter((line) => line.trim() !== "");
        const importedCustomers = lines.slice(1).map((line) => {
          const [id, customerName, company, orderValue, orderDate, status, avatar] = line.split(",");
          return {
            id: id ? parseInt(id) : null,
            customerName: customerName || "",
            company: company || "",
            orderValue: orderValue || "$0",
            orderDate: orderDate || "",
            status: status || "",
            avatar: avatar || "src/assets/img/avatar313.png",
          };
        });
        await processImportedCustomers(importedCustomers);
      };
      reader.readAsText(file);
    } else if (fileExtension === "xlsx" || fileExtension === "xls") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const importedCustomers = jsonData.map((row) => ({
          id: row.id ? parseInt(row.id) : null,
          customerName: row.customerName || "",
          company: row.company || "",
          orderValue: row.orderValue || "$0",
          orderDate: row.orderDate || "",
          status: row.status || "",
          avatar: row.avatar || "src/assets/img/avatar313.png",
        }));
        await processImportedCustomers(importedCustomers);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a valid CSV or Excel file (.csv, .xlsx, .xls).");
    }
    event.target.value = null; // Reset input file
  };

  // Process imported customers
  const processImportedCustomers = async (importedCustomers) => {
    try {
      const updatedCustomers = await Promise.all(
        importedCustomers.map(async (customer) => {
          if (customer.id) {
            const response = await axios.put(
              `http://localhost:3001/customers/${customer.id}`,
              customer
            );
            return response.data;
          } else {
            const response = await axios.post("http://localhost:3001/customers", customer);
            return response.data;
          }
        })
      );
      onImportSuccess(updatedCustomers); // Gọi callback để cập nhật danh sách
      alert("Customers imported successfully!");
    } catch (error) {
      console.error("Import failed:", error.message);
      alert(`Error: ${error.response?.data.message || error.message}`);
    }
  };

  return (
    <label className="flex items-center gap-2 border border-pink-500 text-pink-500 px-4 py-1.5 rounded-lg text-sm hover:bg-pink-50 cursor-pointer">
      <img src="src/assets/img/Import.png" alt="icon" className="w-4 h-4" />
      Import
      <input
        type="file"
        accept=".csv, .xlsx, .xls"
        onChange={handleImport}
        className="hidden"
      />
    </label>
  );
};

export default ImportButton;