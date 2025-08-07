import { useCart } from './CartContext';
import CartItem from './CartItem';

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <p>Total: ${total}</p>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};
export default CartPage;