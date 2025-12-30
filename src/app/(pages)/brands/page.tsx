// نفترض إن Interface موجودة في: src/interfaces/brand.ts
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrandI } from '@/interfaces';

export default async function Brands() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
  const { data: brands }: { data:BrandI[] } = await response.json();

  return (
    <>
    <h1 className='text-4xl mt-5 pt-24'> BRANDSS</h1>
   
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 ">
      {brands.map((brand) => (
        <Link key={brand._id} href={'/brands/' + brand._id}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <Image
                src={brand.image}
                alt={brand.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-md"
              />
              <CardTitle className="mt-2">{brand.name}</CardTitle>
              <CardDescription>Brand</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Created at: {brand.createdAt.split("T")[0]}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </> );
}
