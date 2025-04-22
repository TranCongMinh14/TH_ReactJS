import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const { getCartCount } = useCart();
  
  return (
    <header className="bg-gray-800 text-white p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">BookStore</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Trang chủ</Link></li>
            <li><Link to="/menu" className="hover:text-blue-200">Menu</Link></li>
            <li>
              <Link to="/cart" className="hover:text-blue-200 flex items-center">
                Giỏ hàng 
                <span className="ml-1 bg-yellow-500 text-blue-900 rounded-full px-2 py-1 text-xs font-bold">
                  {getCartCount()}
                </span>
              </Link>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;