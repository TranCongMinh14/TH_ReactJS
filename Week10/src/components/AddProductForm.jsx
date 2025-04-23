function AddProductForm({ newProduct, handleInputChange, addProduct }) {
    return (
      <div className="add-product-form">
        <h2 className="form-title">Thêm sản phẩm mới</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Tên sản phẩm"
            className="input-field"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Giá (VND)"
            className="input-field"
          />
          <select
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="Thời trang">Thời trang</option>
            <option value="Công nghệ">Công nghệ</option>
            <option value="Gia dụng">Gia dụng</option>
          </select>
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Tồn kho"
            className="input-field"
          />
          <button onClick={addProduct} className="add-btn">
            Thêm sản phẩm
          </button>
        </div>
      </div>
    );
  }
  
  export default AddProductForm;