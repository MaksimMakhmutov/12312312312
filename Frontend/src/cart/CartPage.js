import { useCart } from './CartContext';
import Pagination from '../components/Pagination';
import { useState } from 'react';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, getTotal } =
    useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCartItems = cart.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {currentCartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} ×
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  style={{ width: '50px', marginLeft: '5px' }}
                />
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${getTotal()}</p>
          <button onClick={clearCart}>Clear Cart</button>

          <Pagination
            currentPage={currentPage}
            totalItems={cart.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Cart;
