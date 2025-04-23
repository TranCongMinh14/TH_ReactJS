import { useState } from "react";
import ProductItem from "./components/ProductItem";
import "./App.css";

function App() {
  const [products] = useState([
    {
      id: 1,
      name: "Áo thun",
      price: 150000,
      category: "Thời trang",
      stock: 50,
    },
    {
      id: 2,
      name: "Laptop",
      price: 15000000,
      category: "Công nghệ",
      stock: 10,
    },
    { id: 3, name: "Máy giặt", price: 7000000, category: "Gia dụng", stock: 5 },
  ]);

  return (
    <div className="container">
      <h1 className="title">Quản lý sản phẩm</h1>
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
            <ProductItem key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
