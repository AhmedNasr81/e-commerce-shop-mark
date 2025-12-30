import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CategoryI } from '@/interfaces';

export default async function Categories() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
  const { data: categories }: {data:CategoryI[] } = await response.json();

  return (
    <>
      <h1 className='text-4xl mt-5 pt-24'> Categories</h1>

   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 ">
  {categories.map((category) => (
    <Link key={category._id} href={'/categories/'+category._id}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <Image
            src={category.image}
            alt={category.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-md"
          />
          <CardTitle className="mt-2">{category.name}</CardTitle>
          <CardDescription>Category</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Created at: {category.createdAt.split(".", 1).join().replace("T", " ")}
          </p>
        </CardContent>
      </Card>
    </Link>
  ))}
</div>

   </> );
}
