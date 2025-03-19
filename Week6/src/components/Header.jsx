import { Link } from "react-router-dom";
import "../components/Header.css";
const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav-links">
          <Link to="/" className="nav-item">
            Trang chủ
          </Link>
          <Link to="/menu" className="nav-item">
            Thực đơn
          </Link>
          <Link to="/contact" className="nav-item">
            Liên hệ
          </Link>
        </nav>
        <button className="book-table-btn">Book Table</button>
      </div>
    </header>
  );
};

export default Header;
