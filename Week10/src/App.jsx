import { useState } from 'react';
import ProductItem from './components/ProductItem';
import AddProductForm from './components/AddProductForm';
import './App.css';

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Áo thun', price: 150000, category: 'Thời trang', stock: 50 },
    { id: 2, name: 'Laptop', price: 15000000, category: 'Công nghệ', stock: 10 },
    { id: 3, name: 'Máy giặt', price: 7000000, category: 'Gia dụng', stock: 5 },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Thời trang',
    stock: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      const product = {
        id: products.length + 1,
        name: newProduct.name,
        price: parseInt(newProduct.price),
        category: newProduct.category,
        stock: parseInt(newProduct.stock),
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', price: '', category: 'Thời trang', stock: '' });
    } else {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">Quản lý sản phẩm</h1>

      {/* Sử dụng AddProductForm component */}
      <AddProductForm
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        addProduct={addProduct}
      />

      {/* Danh sách sản phẩm */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Tồn kho</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={deleteProduct}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;