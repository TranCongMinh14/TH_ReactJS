// src/components/DataTable.jsx
import React, { useEffect, useState, useMemo, memo } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Modal from "react-modal";

// Bind modal to app element for accessibility
Modal.setAppElement("#root");

// Use React.memo to prevent unnecessary re-renders
const DataTable = memo(() => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Replace editUser with modalIsOpen
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    customerName: "",
    company: "",
    orderValue: "",
    orderDate: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const rowsPerPage = 6;

  console.log("Rendering DataTable");

  // Fetch customer list
  useEffect(() => {
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

  // Open edit modal with server check
  const openEditModal = async (customer) => {
    try {
      const response = await axios.get(`http://localhost:3001/customers/${customer.id}`);
      if (response.data) {
        setFormData({
          id: customer.id,
          customerName: customer.customerName,
          company: customer.company,
          orderValue: customer.orderValue.replace("$", ""),
          orderDate: formatDateToInput(customer.orderDate),
          status: customer.status,
        });
        setModalIsOpen(true); // Open modal
        setErrors({});
      }
    } catch (error) {
      if (error.response?.status === 404) {
        alert("Customer not found on the server. Refreshing list...");
        const refreshedResponse = await axios.get("http://localhost:3001/customers");
        setCustomers(refreshedResponse.data);
      } else {
        alert("Error checking customer existence.");
      }
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  // Validate individual fields
  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "customerName":
        if (!value.trim()) newErrors.customerName = "Customer name is required";
        else delete newErrors.customerName;
        break;
      case "company":
        if (!value.trim()) newErrors.company = "Company name is required";
        else delete newErrors.company;
        break;
      case "orderValue":
        if (!value || Number(value) <= 0)
          newErrors.orderValue = "Order value must be greater than 0";
        else delete newErrors.orderValue;
        break;
      case "orderDate":
        if (!value) newErrors.orderDate = "Order date is required";
        else delete newErrors.orderDate;
        break;
      case "status":
        if (!value) newErrors.status = "Status is required";
        else delete newErrors.status;
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.customerName.trim() &&
      formData.company.trim() &&
      formData.orderValue &&
      Number(formData.orderValue) > 0 &&
      formData.orderDate &&
      formData.status &&
      Object.keys(errors).length === 0
    );
  };

  // Handle save action
  const handleSave = async () => {
    if (!isFormValid()) {
      validateField("customerName", formData.customerName);
      validateField("company", formData.company);
      validateField("orderValue", formData.orderValue);
      validateField("orderDate", formData.orderDate);
      validateField("status", formData.status);
      return;
    }

    setIsSaving(true);
    const updatedCustomer = {
      ...formData,
      orderValue: `$${formData.orderValue}`,
      orderDate: formatDateToDisplay(formData.orderDate),
    };

    try {
      await axios.put(`http://localhost:3001/customers/${formData.id}`, updatedCustomer);
      setCustomers((prev) =>
        prev.map((cus) => (cus.id === formData.id ? updatedCustomer : cus))
      );
      alert("Customer updated successfully!");
      closeModal();
    } catch (error) {
      let errorMessage = "Failed to update customer.";
      if (error.response?.status === 404) {
        errorMessage = "Customer not found on the server.";
        const response = await axios.get("http://localhost:3001/customers");
        setCustomers(response.data);
      } else {
        errorMessage = error.response?.data.message || error.message;
      }
      console.error("Update failed:", errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false); // Close modal
    setFormData({
      id: "",
      customerName: "",
      company: "",
      orderValue: "",
      orderDate: "",
      status: "",
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
          <img src="src/assets/img/ReportIcon.png" alt="icon" className="w-5 h-5" />
          Detailed report
        </h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-pink-500 text-pink-500 px-4 py-1.5 rounded-lg text-sm hover:bg-pink-50">
            <img src="src/assets/img/Import.png" alt="icon" className="w-4 h-4" />
            Import
          </button>
          <button className="flex items-center gap-2 border border-pink-500 text-pink-500 px-4 py-1.5 rounded-lg text-sm hover:bg-pink-50">
            <img src="src/assets/img/Export.png" alt="icon" className="w-4 h-4" />
            Export
          </button>
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
              <tr key={customer.id} className="border-t hover:bg-gray-50">
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
                  <img
                    src="src/assets/img/Edit.png"
                    alt="Edit"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => openEditModal(customer)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={customers.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-8 rounded-xl shadow-2xl max-w-lg mx-auto mt-24 border border-gray-200"
        overlayClassName="fixed inset-0 bg-black/60 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">📝</span> Edit Order
        </h2>
        <form>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Customer Name */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                  errors.customerName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter customer name"
              />
              {errors.customerName && (
                <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                  errors.company ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter company name"
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company}</p>
              )}
            </div>

            {/* Order Value */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Order Value
              </label>
              <input
                type="number"
                name="orderValue"
                value={formData.orderValue}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                  errors.orderValue ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter order value"
              />
              {errors.orderValue && (
                <p className="text-red-500 text-xs mt-1">{errors.orderValue}</p>
              )}
            </div>

            {/* Order Date */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Order Date
              </label>
              <input
                type="date"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                  errors.orderDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.orderDate && (
                <p className="text-red-500 text-xs mt-1">{errors.orderDate}</p>
              )}
            </div>

            {/* Status */}
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select status</option>
                <option value="New">New</option>
                <option value="In-progress">In-progress</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">{errors.status}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isFormValid() || isSaving}
              className={`px-5 py-2 rounded-lg transition-all duration-200 font-medium ${
                isFormValid() && !isSaving
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-pink-300 text-gray-200 cursor-not-allowed"
              }`}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
});

export default DataTable;