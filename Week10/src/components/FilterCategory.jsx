function FilterCategory({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="filter-container">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="filter-select"
      >
        <option value="Tất cả">Tất cả danh mục</option>
        <option value="Thời trang">Thời trang</option>
        <option value="Công nghệ">Công nghệ</option>
        <option value="Gia dụng">Gia dụng</option>
      </select>
    </div>
  );
}

export default FilterCategory;
