import React from "react";
import { createContext, useState, useEffect } from "react";
// import axios from "axios";

export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cartNavRefresh, setCartNavRefresh] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.Carts
      ? JSON.parse(localStorage.getItem("Carts"))
      : [];
    if (storedItems) {
      const totalQuantity = storedItems.reduce(
        (acc, product) => acc + product.quantity,
        0
      );

      setCartNavRefresh(totalQuantity);
    }
  }, []);

  return (
    <>
      <CartContext.Provider
        value={{
          cartNavRefresh,
          setCartNavRefresh,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};
export default CartProvider;
