import { useCart } from '../contexts/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();
  
  return (
    <div className="flex items-center border-b py-4">
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-20 h-20 object-cover mr-4"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-600">Tác giả: {item.author}</p>
        <p className="text-blue-600">{item.price.toLocaleString('vi-VN')} VNĐ x {item.quantity}</p>
      </div>
      <div>
        <p className="font-bold text-lg mb-2">
          {(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ
        </p>
        <button 
          onClick={() => removeFromCart(item.id)} 
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartItem;