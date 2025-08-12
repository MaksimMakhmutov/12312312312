import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import {
  getCartByUserId,
  updateCart,
  clearCart as clearCartApi,
} from '../api/cartApi';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      loadCart(user.id);
    } else {
      setCart([]);
    }
  }, [user]);

  const loadCart = async (userId) => {
    const data = await getCartByUserId(userId);
    setCart(data.items || []);
  };

  const addToCart = async (product) => {
    if (!user) return;
    const existingItem = cart.find((item) => item.id === product.id);
    let updated;

    if (existingItem) {
      updated = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updated = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updated);
    await updateCart(user.id, updated);
  };

  const removeFromCart = async (id) => {
    if (!user) return;
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    await updateCart(user.id, updated);
  };

  const clearCart = async () => {
    if (!user) return;
    setCart([]);
    await clearCartApi(user.id);
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;
    if (quantity < 1) return;

    const updated = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );

    setCart(updated);
    await updateCart(user.id, updated);
  };

  const getTotal = () => {
    return cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
