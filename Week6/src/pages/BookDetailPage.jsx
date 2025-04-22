import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import books from '../data/books';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const book = books.find(book => book.id === parseInt(id));

  if (!book) {
    navigate('/not-found');
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <img 
          src={book.image} 
          alt={book.title} 
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-2/3">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <p className="text-xl text-gray-600 mb-4">Tác giả: {book.author}</p>
        <p className="text-2xl text-blue-600 font-bold mb-6">{book.price.toLocaleString('vi-VN')} VNĐ</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Mô tả:</h2>
          <p className="text-gray-700">{book.description}</p>
        </div>
        <button 
          onClick={() => addToCart(book)} 
          className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 text-lg"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default BookDetailPage;