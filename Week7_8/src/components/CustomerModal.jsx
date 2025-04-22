import React from "react";

// Danh sách ảnh mẫu từ assets (giả lập)
const availableAvatars = [
  { name: "Avatar 1", path: "src/assets/img/avatar1.png" },
  { name: "Avatar 2", path: "src/assets/img/avatar2.png" },
  { name: "Avatar 3", path: "src/assets/img/avatar3.png" },
  { name: "Avatar 4", path: "src/assets/img/avatar4.png" },
  { name: "Avatar 5", path: "src/assets/img/avatar5.png" },
  { name: "Avatar 6", path: "src/assets/img/avatar6.png" },
  { name: "Custom", path: "" }, // Lựa chọn để nhập thủ công
];

const CustomerModal = ({
  editUser,
  onSave,
  onClose,
  initialData,
  errors,
  setErrors,
}) => {
  const [formData, setFormData] = React.useState({
    ...initialData,
    avatar: initialData.avatar || "", // Thêm avatar vào formData
  });

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
      case "avatar":
        if (!value.trim()) newErrors.avatar = "Avatar is required";
        else delete newErrors.avatar;
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
      formData.avatar.trim() && // Thêm kiểm tra avatar
      Object.keys(errors).length === 0
    );
  };

  // Handle save
  const handleSave = () => {
    if (!isFormValid()) {
      validateField("customerName", formData.customerName);
      validateField("company", formData.company);
      validateField("orderValue", formData.orderValue);
      validateField("orderDate", formData.orderDate);
      validateField("status", formData.status);
      validateField("avatar", formData.avatar);
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 transition-all">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg mx-auto mt-24 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">📝</span>{" "}
          {editUser === "new" ? "Add New Customer" : "Edit Customer"}
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.customerName}
                </p>
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

            {/* Avatar */}
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Avatar
              </label>
              {editUser === "new" ? (
                <>
                  <select
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all mb-2 ${
                      errors.avatar ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select an avatar</option>
                    {availableAvatars.map((avatar) => (
                      <option key={avatar.path} value={avatar.path}>
                        {avatar.name}
                      </option>
                    ))}
                  </select>
                  {formData.avatar === "" && (
                    <input
                      type="text"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                        errors.avatar ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Or enter custom avatar URL"
                    />
                  )}
                </>
              ) : (
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                    errors.avatar ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter avatar URL"
                  disabled // Không cho sửa avatar khi edit
                />
              )}
              {errors.avatar && (
                <p className="text-red-500 text-xs mt-1">{errors.avatar}</p>
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
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isFormValid()}
              className={`px-5 py-2 rounded-lg transition-all duration-200 font-medium ${
                isFormValid()
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-pink-300 text-gray-200 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
