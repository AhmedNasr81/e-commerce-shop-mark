
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'

import Link from 'next/link'
import MyStar from '@/components/myStarIcon'
import { productsI } from '@/interfaces'

import AddToCart from '@/components/AddToCart/AddToCart'
export default async function Products() {
  const response= await fetch('https://ecommerce.routemisr.com/api/v1/products')
  const {data:products}:{data:productsI[]}= await response.json()
  console.log(products)
  return (
    <>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-5'>
 {products.map((product)=> <div key={product.id}>
<Card>
  <Link href={'/products/'+product.id}>
  <CardHeader>
    <Image src={product.imageCover} className='w-full' height={300} width={300} alt=''/>
    <CardDescription>{product.brand.name}</CardDescription>
    <CardTitle >{product.title.split(' ',2).join(' ')}</CardTitle>
    <CardDescription>{product.category.name}</CardDescription>
    
  </CardHeader>
  <CardContent>
    <div className='flex items-center gap-2'>
    <MyStar/>
    <MyStar/>
    <MyStar/>
    <MyStar/>
    <MyStar/>

<p >{product.ratingsAverage}</p>

    
    <p>Price:<span className='font-bold'>{product.price}</span>EGP</p>
    </div>
  </CardContent >
</Link>


         <div >
          <AddToCart productId={product._id}/>
         </div>

</Card>
    </div>)}
    
  </div>
    </>
  )
}


