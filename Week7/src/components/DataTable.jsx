// src/components/DataTable.jsx
import React, { useEffect, useState, useMemo, memo } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import CustomerModal from "./CustomerModal";

// Use React.memo to prevent unnecessary re-renders
const DataTable = memo(() => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null); // null: không có modal, object: edit, "new": add new
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    company: "",
    orderValue: "",
    orderDate: "",
    status: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});
  const rowsPerPage = 6;

  console.log("Rendering DataTable");

  // Fetch customer list
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to fetch customers:", error.message);
      alert("Failed to load customers. Please check the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Date format conversion
  const formatDateToInput = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  const formatDateToDisplay = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Open edit modal
  const openEditModal = (customer) => {
    setFormData({
      id: customer.id,
      customerName: customer.customerName,
      company: customer.company,
      orderValue: customer.orderValue.replace("$", ""),
      orderDate: formatDateToInput(customer.orderDate),
      status: customer.status,
      avatar: customer.avatar, // Bao gồm avatar khi edit
    });
    setEditUser(customer);
    setErrors({});
  };

  // Open add new user modal
  const openAddNewModal = () => {
    setFormData({
      customerName: "",
      company: "",
      orderValue: "",
      orderDate: "",
      status: "",
      avatar: "", // Khởi tạo avatar rỗng
    });
    setEditUser("new");
    setErrors({});
  };

  // Handle save action
  const handleSave = async (data) => {
    const updatedCustomer = {
      ...data,
      orderValue: `$${data.orderValue}`,
      orderDate: formatDateToDisplay(data.orderDate),
      avatar: data.avatar || "src/assets/img/avatar313.png", // Giá trị mặc định nếu không có avatar
    };

    try {
      if (editUser === "new") {
        // Add new customer
        const response = await axios.post(
          "http://localhost:3001/customers",
          updatedCustomer
        );
        setCustomers((prev) => [...prev, response.data]); // Thêm customer mới vào danh sách
        alert("Customer added successfully!");
      } else {
        // Edit existing customer
        await axios.put(
          `http://localhost:3001/customers/${editUser.id}`,
          updatedCustomer
        );
        setCustomers((prev) =>
          prev.map((cus) => (cus.id === editUser.id ? updatedCustomer : cus))
        );
        alert("Customer updated successfully!");
      }
      closeModal();
    } catch (error) {
      let errorMessage = "Failed to save customer.";
      if (error.response?.status === 404) {
        errorMessage = "Customer not found on the server.";
        await fetchCustomers(); // Reload dữ liệu nếu không tìm thấy
      } else {
        errorMessage = error.response?.data.message || error.message;
      }
      console.error("Save failed:", errorMessage);
      alert(`Error: ${errorMessage}`);
    }
  };

  // Close modal
  const closeModal = () => {
    setEditUser(null);
    setFormData({
      customerName: "",
      company: "",
      orderValue: "",
      orderDate: "",
      status: "",
      avatar: "",
    });
    setErrors({});
  };

  // Handle customer selection
  const handleSelectCustomer = (id) => {
    setSelectedCustomers((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    setSelectedCustomers(
      selectedCustomers.length === currentData.length
        ? []
        : currentData.map((customer) => customer.id)
    );
  };

  // Optimize displayed data
  const currentData = useMemo(
    () =>
      customers.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      ),
    [customers, currentPage]
  );

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 mt-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <img
            src="src/assets/img/ReportIcon.png"
            alt="icon"
            className="w-5 h-5"
          />
          Detailed report
        </h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={openAddNewModal}
            className="flex items-center gap-2 border border-pink-500 text-pink-500 px-4 py-1.5 rounded-lg text-sm hover:bg-pink-400 hover:text-white cursor-pointer"
          >
            <img
              src="src/assets/img/ReportIcon.png"
              alt="icon"
              className="w-4 h-4"
            />
            Add new user
          </button>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-pink-500 text-pink-500 px-4 py-1.5 rounded-lg text-sm hover:bg-pink-50">
              <img
                src="src/assets/img/Import.png"
                alt="icon"
                className="w-4 h-4"
              />
              Import
            </button>
            <button className="flex items-center gap-2 border border-pink-500 text-pink-500 px-4 py-1.5 rounded-lg text-sm hover:bg-pink-50">
              <img
                src="src/assets/img/Export.png"
                alt="icon"
                className="w-4 h-4"
              />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedCustomers.length === currentData.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Order Value</th>
              <th className="p-3 text-left">Order Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((customer) => (
              <tr
                key={customer.id}
                className={`border-t transition-all duration-200 ${
                  selectedCustomers.includes(customer.id)
                    ? "bg-gray-200 hover:bg-gray-300"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleSelectCustomer(customer.id)}
                  />
                </td>
                <td className="p-3 flex items-center gap-2 font-medium text-gray-800">
                  <img
                    src={customer.avatar}
                    alt={customer.customerName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {customer.customerName}
                </td>
                <td className="p-3">{customer.company}</td>
                <td className="p-3">{customer.orderValue}</td>
                <td className="p-3">{customer.orderDate}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      {
                        New: "bg-blue-100 text-blue-500",
                        "In-progress": "bg-yellow-100 text-yellow-600",
                        Completed: "bg-green-100 text-green-500",
                      }[customer.status]
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => openEditModal(customer)}
                    className="p-2 bg-gray-200 text-white rounded-lg border-gray-800 hover:bg-pink-400 transition-all"
                  >
                    <img
                      src="src/assets/img/Edit.png"
                      alt="Edit"
                      className="w-4 h-4"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span className="text-sm text-gray-600 mt-4">
        Selected: {selectedCustomers.length}
      </span>
      <Pagination
        totalItems={customers.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
      />

      {editUser && (
        <CustomerModal
          editUser={editUser}
          onSave={handleSave}
          onClose={closeModal}
          initialData={formData}
          errors={errors}
          setErrors={setErrors}
        />
      )}
    </div>
  );
});

export default DataTable;
