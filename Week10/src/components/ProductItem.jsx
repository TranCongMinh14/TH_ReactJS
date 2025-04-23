function ProductItem({ product, onDelete, onEdit }) {
  return (
    <tr className="border-b">
      <td className="border border-gray-300 p-2">{product.name}</td>
      <td className="border border-gray-300 p-2">
        {product.price.toLocaleString()} VND
      </td>
      <td className="border border-gray-300 p-2">{product.category}</td>
      <td className="border border-gray-300 p-2">{product.stock}</td>
      <td className="border border-gray-300 p-2">
        <button
          className="bg-red-500 text-white px-2.5 py-1 rounded hover:bg-red-600"
          onClick={() => onDelete(product.id)}
        >
          Xoá
        </button>
      </td>
    </tr>
  );
}

export default ProductItem;
