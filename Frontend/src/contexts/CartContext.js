import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import {
  getCart,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
  clearCartApi,
} from '../api/cartApi';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  // загрузка корзины пользователя
  useEffect(() => {
    const load = async () => {
      if (!user) {
        setItems([]);
        return;
      }
      const cart = await getCart();
      setItems(cart.items || []);
    };
    load();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) throw new Error('Login required');
    const cart = await addToCartApi(productId, quantity);
    setItems(cart.items);
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) throw new Error('Login required');
    const cart = await updateCartItemApi(productId, quantity);
    setItems(cart.items);
  };

  const removeFromCart = async (productId) => {
    if (!user) throw new Error('Login required');
    const cart = await removeCartItemApi(productId);
    setItems(cart.items);
  };

  const clearCart = async () => {
    if (!user) throw new Error('Login required');
    const cart = await clearCartApi();
    setItems(cart.items);
  };

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
