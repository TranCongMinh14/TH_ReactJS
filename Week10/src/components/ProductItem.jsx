function ProductItem({ product }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price.toLocaleString()} VND</td>
      <td>{product.category}</td>
      <td>{product.stock}</td>
      <td>
        <button className="delete-btn">Xoá</button>
      </td>
    </tr>
  );
}

export default ProductItem;
