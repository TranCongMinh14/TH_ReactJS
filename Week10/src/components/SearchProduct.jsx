function SearchProduct({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-5">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm kiếm sản phẩm theo tên..."
        className="w-full p-2 border border-gray-300 rounded text-base"
      />
    </div>
  );
}

export default SearchProduct;
