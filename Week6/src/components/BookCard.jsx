import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow hover:scale-105">
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-48 object-contain rounded-md mb-4 "
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-2">Tác giả: {book.author}</p>
        <p className="text-blue-600 font-bold mb-4">{book.price.toLocaleString('vi-VN')} VNĐ</p>
        <div className="flex justify-between">
          <Link 
            to={`/book/${book.id}`} 
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Xem chi tiết
          </Link>
          <button 
            onClick={() => addToCart(book)} 
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;