

"use client";

import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "@/components/context/wishlistContext";
import toast from "react-hot-toast";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Wishlist() {
  const { wishlistData, getWishlist, loading } =
    useContext(WishlistContext);

  const [removingId, setRemovingId] = useState<string | null>(null);

  const { data: session } = useSession();
  const token = session?.user?.token;

  useEffect(() => {
    if (token) {
      getWishlist();
    }
  }, [token, getWishlist]);

  async function removeWishlistItem(productId: string) {
    if (!token) return;

    setRemovingId(productId);

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token,
        },
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      toast.success("Product removed from wishlist ❤️");
   getWishlist();
      } else {
      toast.error("Failed to remove product ❌");
    }

    setRemovingId(null);
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">My Wishlist ❤️</h1>

      {loading ? (
      
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader className="animate-spin w-10 h-10 text-red-500" />
        </div>
      ) : wishlistData?.data?.length ? (
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistData.data.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow flex flex-col items-center gap-3"
            >
              <Image
                src={item.imageCover}
                alt={item.title }
                width={300}
                height={300}
                className="object-cover rounded-lg"
              />

              <h3 className="font-semibold text-lg text-center">
                {item.title }
              </h3>

              <p className="text-red-500 font-bold">
                {item.price ? `${item.price} EGP` : "No Price"}
              </p>

              <p className="text-sm text-muted-foreground text-center">
                {item.brand?.name } -{" "}
                {item.category?.name }
              </p>

              <button
                onClick={() => removeWishlistItem(item._id)}
                disabled={removingId === item._id}
                className="text-white bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 disabled:opacity-50"
              >
                {removingId === item._id ? "Removing..." : "Remove ❤️"}
              </button>
            </div>
          ))}
        </div>
      ) : (
         <div className="flex min-h-[75vh] items-center justify-center flex-col">
          <h2 className="text-2xl my-4"> Your Wishlist is Empty ❤️</h2>

          <Link href={"/products"}>
            <Button>Add Products to Wishlist</Button>
          </Link>
        </div>
    
      )}
    </div>
  );
}
