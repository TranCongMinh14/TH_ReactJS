function ProductItem({ product, onDelete }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price.toLocaleString()} VND</td>
      <td>{product.category}</td>
      <td>{product.stock}</td>
      <td>
        <button className="delete-btn" onClick={() => onDelete(product.id)}>
          Xoá
        </button>
      </td>
    </tr>
  );
}

export default ProductItem;
