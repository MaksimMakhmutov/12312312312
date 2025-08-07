const CartItem = ({ item }) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: '8px', padding: '8px' }}>
      <h4>{item.name}</h4>
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};
export default CartItem;
