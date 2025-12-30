import { productsI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MyStar from "@/components/myStarIcon";
import ProductSlider from "@/components/productSlider/productSlider";

import AddToCart from "@/components/AddToCart/AddToCart";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;

  console.log(productId);

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId,
   
  );

  const { data: product }: { data: productsI} = await response.json();

  console.log(product);

  return (
    <>
      <Card className="grid md:grid-cols-2 items-center w-3/4 mx-auto p-4 mt-4 pt-24 ">

        <div className="flex justify-center">
          <div className="p-3">
            <ProductSlider images={product.images} altContent={product.title} />
          </div>
        </div>

        <div>
          <CardHeader>
            <CardDescription>{product.brand.name}</CardDescription>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <CardDescription className="capitalize">
              {product.category.name}
            </CardDescription>

            <div className="flex gap-1 items-center mt-2">
              <MyStar />
              <MyStar />
              <MyStar />
              <MyStar />
              <p>({product.ratingsQuantity})</p>
            </div>

            <div className="mt-3 flex justify-between">
              <p className="font-bold">{product.price} EGP</p>
              <p className="font-bold">Quantity: {product.quantity}</p>
            </div>
          </CardContent>

        
          <AddToCart  productId={product._id}/>
        </div>

      </Card>
    </>
  );
}
