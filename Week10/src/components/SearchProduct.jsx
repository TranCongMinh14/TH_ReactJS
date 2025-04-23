function SearchProduct({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm kiếm sản phẩm theo tên..."
        className="search-input"
      />
    </div>
  );
}

export default SearchProduct;
