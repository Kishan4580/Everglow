import { createContext, useState, useEffect } from "react";
import { CartContext } from "./components/cart";


export function CartProvider({ children }) {
  // 🧠 LocalStorage se load karo
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? new Map(JSON.parse(saved)) : new Map();
  });

  // 🛠️ CRUD
  // ✅ The code is mostly correct but has a few issues:
// 1. Using == instead of === for equality comparison
// 2. Promise return statement is unreachable after the first return
// 3. Missing proper error handling in Promise

const updateCart = (productId, quantity) => {
    if (quantity === 0) {
      setCart(prev => {
        const newCart = new Map(prev);
        newCart.delete(productId);
        return newCart;
      });
      return new Promise((resolve) => {
        setTimeout(() => resolve("Done"), 2000)
      });
    }
    setCart(prev => {
      const newCart = new Map(prev);
      const oldQty = newCart.get(productId) || 0; 
      newCart.set(productId, oldQty + quantity);
      return newCart;
    });
    return new Promise((resolve) => {
      setTimeout(() => resolve("Done"), 2000)
    });
}

  // 💾 Har update par localStorage me save karo
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(Array.from(cart.entries())));
  }, [cart]);

  return (
    <CartContext value={{ cart, updateCart }}>
      {children}
    </CartContext>
  );
}
