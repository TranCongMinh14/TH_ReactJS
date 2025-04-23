import { useState, useEffect } from "react";
import ProductItem from "./components/ProductItem";
import AddProductForm from "./components/AddProductForm";
import SearchProduct from "./components/SearchProduct";
import FilterCategory from "./components/FilterCategory";
import "./App.css";

function App() {
  // Khởi tạo state từ localStorage (nếu có)
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts
      ? JSON.parse(savedProducts)
      : [
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
          {
            id: 3,
            name: "Máy giặt",
            price: 7000000,
            category: "Gia dụng",
            stock: 5,
          },
        ];
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Thời trang",
    stock: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // Lưu danh sách sản phẩm vào localStorage mỗi khi products thay đổi
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

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
      setNewProduct({ name: "", price: "", category: "Thời trang", stock: "" });
    } else {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Lọc sản phẩm theo tên và danh mục
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || product.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  // Tính tổng số sản phẩm và tổng tồn kho
  const totalProducts = filteredProducts.length;
  const totalStock = filteredProducts.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  return (
    <div className="container">
      <h1 className="title">Quản lý sản phẩm</h1>

      {/* Sử dụng SearchProduct và FilterCategory components */}
      <div className="filter-search-container">
        <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

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
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={deleteProduct}
            />
          ))}
        </tbody>
      </table>

      {/* Hiển thị tổng số sản phẩm và tổng tồn kho */}
      <div className="summary">
        Tổng sản phẩm: {totalProducts} | Tổng tồn kho: {totalStock}
      </div>
    </div>
  );
}

export default App;
