
import React from 'react';
import { Params } from 'next/dist/server/request/params';
import Image from 'next/image';
import Link from 'next/link';
import {CategoryI, productsI } from '@/interfaces';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import AddToCart from '@/components/AddToCart/AddToCart';
import MyStar from '@/components/myStarIcon';

export default async function CategoryDetails({ params }: { params: Params }) {
  const { categoryId } = await params; // ✅ نفس أسلوبك
  console.log('Category ID:', categoryId);

  const categoryResponse = await fetch("https://ecommerce.routemisr.com/api/v1/categories/"+categoryId);

  const { data: category }: { data: CategoryI } = await categoryResponse.json();
  console.log('Category data:', category);
  if (!categoryResponse.ok) 
    return <p>Category not found</p>;


  const Response = await fetch("https://ecommerce.routemisr.com/api/v1/products?category="+categoryId);

  const { data: products }: { data: productsI[] } = await Response.json();

  return (<>
  <div className='text-4xl mt-5 pt-24'>
      
  <h1>{category.name}</h1>
  </div>

  
 
    <div className="mt-24 px-4 ">
      <Card className="max-w-md mx-auto mb-10">
        <CardHeader>
          <Image
            src={category.image}
            alt={category.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded"
          />
          <CardTitle>{category.name}</CardTitle>
          <CardDescription>Category</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm">
            Created at: {category.createdAt.split(".", 1).join().replace("T", " ")}
          </p>
        </CardContent>
      </Card>

      { products.length > 0 ? (
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
