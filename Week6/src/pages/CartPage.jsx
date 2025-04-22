import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import CartItem from "../components/CartItem";

const CartPage = () => {
  const { cartItems, getCartTotal, getCartCount, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const handleCheckout = () => {
    setShowForm(true); // Hiển thị modal khi nhấn "Thanh toán"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lưu thông tin vào localStorage
    const orderInfo = {
      ...formData,
      cartItems,
      total: getCartTotal(),
      date: new Date().toISOString(),
    };
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, orderInfo]));
    
    // Xóa giỏ hàng, đóng modal, và hiển thị thông báo
    clearCart();
    setShowForm(false);
    setOrderPlaced(true);
  };

  const closeModal = () => {
    setShowForm(false);
  };

  if (orderPlaced) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Cảm ơn bạn đã mua hàng!
        </h1>
        <p className="text-xl mb-6">Đơn hàng của bạn đã được xác nhận.</p>
        <button
          onClick={() => setOrderPlaced(false)}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
        <p className="text-xl text-gray-600">Giỏ hàng của bạn đang trống.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-8 border-t pt-4">
          <div className="flex justify-between text-lg mb-2">
            <span>Tổng số lượng:</span>
            <span>{getCartCount()}</span>
          </div>
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Tổng cộng:</span>
            <span>{getCartTotal().toLocaleString("vi-VN")} VNĐ</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-bold text-lg"
          >
            Thanh toán
          </button>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Thông tin thanh toán</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Đóng modal"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-lg font-medium mb-1">
                  Họ tên
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-lg font-medium mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-lg font-medium mb-1">
                  Địa chỉ
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;