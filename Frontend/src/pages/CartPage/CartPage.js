import React, { useMemo } from 'react';
import { CartItem } from '../../components';
import { useCart } from '../../bff/CartContext';

export const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    changeQuantity,
  } = useCart();

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  if (cartItems.length === 0) {
    return <h2 style={{ padding: '2rem' }}>Корзина пуста</h2>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Корзина</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeFromCart}
            onQuantityChange={changeQuantity}
          />
        ))}
      </ul>
      <h3>Общая сумма: {total.toFixed(2)} ₽</h3>
    </div>
  );
};