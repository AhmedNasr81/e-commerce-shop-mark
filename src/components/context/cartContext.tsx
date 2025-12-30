
"use client";
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  getCart: () => void;
}>({
  cartData: null,
  setCartData: () => {},
  loading: false,
  setLoading: () => {},
  getCart: () => {},
});

export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function getCart() {
    setLoading(true);
   const response=await fetch("http://localhost:3000/api/get_cart")
   const data: CartResponse = await response.json();

    setCartData(data);
    console.log(data);

    setLoading(false);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartData, setCartData, loading, setLoading, getCart }}>
      {children}
    </CartContext.Provider>
  );
}
