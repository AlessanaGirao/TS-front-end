import React, { createContext, useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'cart';

const getStoredCart = () => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getStoredCart());

  useEffect(() => {
    const storedCart = getStoredCart();
    setCartItems(storedCart);
  }, []);

  const saveToLocalStorage = (cart) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  };

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];
      const existingCartItemIndex = updatedCartItems.findIndex(item => item.id === product.id);

      if (existingCartItemIndex !== -1) {
        updatedCartItems[existingCartItemIndex].quantity += 1;
      } else {
        updatedCartItems.push({ ...product, quantity: 1 });
      }

      saveToLocalStorage(updatedCartItems);
      return updatedCartItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(item => item.id !== productId);
      saveToLocalStorage(updatedCartItems);
      return updatedCartItems;
    });
  };

  useEffect(() => {
    saveToLocalStorage(cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };