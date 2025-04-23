function FilterCategory({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex-1">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-base"
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
