function AddProductForm({ newProduct, handleInputChange, addProduct }) {
  return (
    <div className="mb-5 p-3.5 border border-gray-300 rounded bg-gray-100">
      <h2 className="text-xl mb-2.5">
        Thêm sản phẩm mới
      </h2>
      <div className="flex flex-wrap gap-2.5">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Tên sản phẩm"
          className="p-2 border border-gray-300 rounded flex-1 min-w-[150px]"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Giá (VND)"
          className="p-2 border border-gray-300 rounded flex-1 min-w-[150px]"
        />
        <select
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded flex-1 min-w-[150px]"
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
          className="p-2 border border-gray-300 rounded flex-1 min-w-[150px]"
        />
        <button
          onClick={addProduct}
          className="bg-green-500 text-white px-3.5 py-2 rounded hover:bg-green-600"
        >
          Thêm sản phẩm
        </button>
      </div>
    </div>
  );
}

export default AddProductForm;