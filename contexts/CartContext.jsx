import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Create context
const CartContext = createContext();

// Context provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from storage on init
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await getStoredCart();
        if (storedCart) {
          setCart(storedCart);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };

    loadCart();
  }, []);

  // Update totals when cart changes
  useEffect(() => {
    const items = cart.reduce((sum, item) => sum + item.quantity, 0);
    const price = cart.reduce((sum, item) => {
      const discountedPrice = item.product.discount > 0 
        ? item.product.price * (1 - item.product.discount / 100) 
        : item.product.price;
      return sum + (discountedPrice * item.quantity);
    }, 0);
    
    setTotalItems(items);
    setTotalPrice(price);
    
    // Save cart to storage
    storeCart(cart);
  }, [cart]);

  // Storage helpers
  const storeCart = async (cartData) => {
    try {
      const cartString = JSON.stringify(cartData);
      if (Platform.OS === 'web') {
        localStorage.setItem('cart', cartString);
      } else {
        await SecureStore.setItemAsync('cart', cartString);
      }
    } catch (error) {
      console.error('Error storing cart:', error);
    }
  };

  const getStoredCart = async () => {
    try {
      if (Platform.OS === 'web') {
        const cartString = localStorage.getItem('cart');
        return cartString ? JSON.parse(cartString) : [];
      } else {
        const cartString = await SecureStore.getItemAsync('cart');
        return cartString ? JSON.parse(cartString) : [];
      }
    } catch (error) {
      console.error('Error getting stored cart:', error);
      return [];
    }
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex > -1) {
        // Update quantity if product already in cart
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new product to cart
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const increaseQuantity = (productId) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decreaseQuantity = (productId) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};