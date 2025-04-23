import { useState, useEffect } from 'react';
import ProductItem from './components/ProductItem';
import AddProductForm from './components/AddProductForm';
import SearchProduct from './components/SearchProduct';
import FilterCategory from './components/FilterCategory';

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [
      { id: 1, name: 'Áo thun', price: 150000, category: 'Thời trang', stock: 50 },
      { id: 2, name: 'Laptop', price: 15000000, category: 'Công nghệ', stock: 10 },
      { id: 3, name: 'Máy giặt', price: 7000000, category: 'Gia dụng', stock: 5 },
    ];
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Thời trang',
    stock: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
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
      setNewProduct({ name: '', price: '', category: 'Thời trang', stock: '' });
    } else {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const editProduct = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
    deleteProduct(product.id);
  };

  const filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Tất cả' || product.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  const totalProducts = filteredProducts.length;
  const totalStock = filteredProducts.reduce((sum, product) => sum + product.stock, 0);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-center text-2xl mb-5">
        Quản lý sản phẩm
      </h1>

      <div className="flex gap-2.5 mb-5">
        <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <AddProductForm
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        addProduct={addProduct}
      />

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left bg-gray-200">Tên sản phẩm</th>
            <th className="border border-gray-300 p-2 text-left bg-gray-200">Giá</th>
            <th className="border border-gray-300 p-2 text-left bg-gray-200">Danh mục</th>
            <th className="border border-gray-300 p-2 text-left bg-gray-200">Tồn kho</th>
            <th className="border border-gray-300 p-2 text-left bg-gray-200">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={deleteProduct}
              onEdit={editProduct}
            />
          ))}
        </tbody>
      </table>

      <div className="mt-2.5 text-right text-base font-bold">
        Tổng sản phẩm: {totalProducts} | Tổng tồn kho: {totalStock}
      </div>
    </div>
  );
}

export default App;