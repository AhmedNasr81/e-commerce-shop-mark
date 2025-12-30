
"use client";

import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import {  Loader, ShoppingCartIcon } from "lucide-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../context/cartContext";
import { addToCartAction } from "@/app/(pages)/products/_action/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddToWishlist from "../AddToWishlist/AddToWishlist";

export default function AddToCart({ productId }: { productId: string }) {
  const {  setCartData } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  async function addProductToCart() {
    if (session.status === "authenticated") {
      setIsLoading(true);

      const data = await addToCartAction(productId);

      data.status === "success" && toast.success("product added");

      setCartData(data);

      setIsLoading(false);
    } else {
      router.push("/login");
    }
  }

  return (
    <CardFooter className="gap-2">
      <Button
        onClick={addProductToCart}
        className="grow cursor-pointer flex items-center gap-2"
      >
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <ShoppingCartIcon />
        )}
        Add To Cart
      </Button>
     <AddToWishlist productId={productId}  />
    </CardFooter>
  );
}
