import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import Menu from './pages/Menu';

function App() {
  return (
    <Router>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </Router>
  );
}

export default App;