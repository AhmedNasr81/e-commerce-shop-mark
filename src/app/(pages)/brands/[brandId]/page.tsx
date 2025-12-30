

import React from 'react'
 import { Params } from 'next/dist/server/request/params';
import { BrandI, productsI } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import AddToCart from '@/components/AddToCart/AddToCart';
import MyStar from '@/components/myStarIcon';
export default async function BrandDetails({ params }: { params: Params }) {
 const { brandId } = await params; // ✅ نفس أسلوبك
  console.log('brand ID:', brandId);
const brandResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
 
  const { data: brand }: { data: BrandI } = await brandResponse.json();
  console.log('brand data:', brand);
   const Response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
    const { data: products }: { data: productsI[] } = await Response.json();
    console.log(products);
     if (!brandResponse.ok) 
    return <p>brand not found</p>;
  return (
<>
<div className='text-4xl mt-5 pt-24'>
      
  <h1>{brand.name}</h1>
  </div>

  
 
    <div className="mt-24 px-4 ">
      <Card className="max-w-md mx-auto mb-10">
        <CardHeader>
          <Image
            src={brand.image}
            alt={brand.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded"
          />
          <CardTitle>{brand.name}</CardTitle>
          <CardDescription>brand</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm">
            Created at: {brand.createdAt.split(".", 1).join().replace("T", " ")}
          </p>
        </CardContent>
      </Card>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product._id}>
              <Link href={`/products/${product._id}`}>
                <CardHeader>
                  <Image
                    src={product.imageCover}
                    width={300}
                    height={300}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <MyStar />
                    <MyStar />
                    <MyStar />
                    <MyStar />
                    <MyStar />
                    <p>{product.ratingsAverage}</p>
                  </div>
                  <p className="mt-2 font-bold">Price: {product.price} EGP</p>
                </CardContent>
              </Link>
              <AddToCart productId={product._id} />
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No products in this category.</p>
      )}
    </div>
  </> );


}