

"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { WishlistResponse } from "@/interfaces/wishlist";

type WishlistContextType = {
  wishlistData: WishlistResponse | null;
  setWishlistData: (value: WishlistResponse | null) => void;
  loading: boolean;
  getWishlist: () => void;
};

export const WishlistContext = createContext<WishlistContextType>({
  wishlistData: null,
  setWishlistData: () => {},
  loading: false,
  getWishlist: () => {},
});

export default function WishlistContextProvider({children,}: {children: ReactNode;}) {
  const [wishlistData, setWishlistData] =useState<WishlistResponse | null>(null);
  const [loading, setLoading] = useState(false);
   

async function getWishlist() {
  setLoading(true);

// const response=await fetch("http://localhost:3000/api/get_wishList")
const response = await fetch("/api/get_wishList")

  const data: WishlistResponse = await response.json();
  setWishlistData(data); // ✅ زي setCartData القديم
  console.log(data);      // ✅ console.log زي القديم

  setLoading(false);
}
useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{wishlistData,setWishlistData,loading,getWishlist,}}
    >
      {children}
    </WishlistContext.Provider>
  );
}
