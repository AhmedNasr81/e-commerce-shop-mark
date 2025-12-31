
'use client'
import Loading from '@/app/loading'
import { CartContext } from '@/components/context/cartContext'
import { Button } from '@/components/ui/button'
import { CartResponse } from '@/interfaces'
import {  Loader, Trash2 } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import CheckOut from '@/components/checkOut/CheckOut'
import { getUserToken } from '@/app/helpers/getUserToken'
import Image from 'next/image'

export default  function Cart() {
  const { cartData, loading, getCart, setCartData } = useContext(CartContext);

  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isClear, setIsClear] = useState<boolean>(false);

  useEffect(() => {
    if (typeof cartData?.data.products[0]?.product == 'string' || cartData == null) {
      getCart()
    }
  }, [])

  async function removeCartItem(productId: string) {
 const token   = await getUserToken()
    setRemovingId(productId);

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        method: "DELETE",
        headers: {
          // ✅ تصحيح التوكن هنا
//  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2M0MzIwMjAzN2YwZDI5MDNkZWU4MSIsIm5hbWUiOiJBaG1lZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY1NTU3MDI1LCJleHAiOjE3NzMzMzMwMjV9.Dunq_qezR19ZBOm8ooOkXGdlJjigHqtWNWrWmi8H6mI"            },
//  token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmE0ZDBmODRkOTUwYzkwMjM3NjM0YyIsIm5hbWUiOiJBaG1lZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0MzgwMTA2LCJleHAiOjE3NzIxNTYxMDZ9.JpFVqNg2TAhTUq5QLozfWTjsXopT0UOsURIMhgO0MeY"        },
//  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2M0MzIwMjAzN2YwZDI5MDNkZWU4MSIsIm5hbWUiOiJBaG1lZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY1NTU3MDI1LCJleHAiOjE3NzMzMzMwMjV9.Dunq_qezR19ZBOm8ooOkXGdlJjigHqtWNWrWmi8H6mI"     
 token: token!  },
     }
    );

    const data: CartResponse = await response.json();
    console.log(data);

    if (data.status === "success") {
      toast.success("product deleted successfully");
      setCartData(data);
    }

    setRemovingId(null);
  }

  async function updateCartItem(productId: string, count: number) {
    setUpdatingId(productId);
 const token   = await getUserToken()
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
 token:  token!       },
        body: JSON.stringify({ count }),
      }
    );

    const data: CartResponse = await response.json();
    console.log(data);

    if (data.status === "success") {
      toast.success("product quantity updated successfully");
      setCartData(data);
    }

    setUpdatingId(null);
  }

  async function clearCart() {
    setIsClear(true)
     const token   = await getUserToken()
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/",
      {
        method: "DELETE",
        headers: {
 token: token!       },
      }
    );

    const data: CartResponse = await response.json();
    console.log(data);

    if (data.message === "success") {
      setCartData(null);
      getCart()
    }

    setIsClear(false)
  }

  return (
    <>
      {loading || typeof cartData?.data.products[0]?.product == 'string' ? <Loading /> : cartData?.numOfCartItems! > 0 ?
        <div className='container mx-auto py-6 px-4'>
          <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
          <p className='text-muted-foreground mt-1'>{cartData?.numOfCartItems} items in your cart</p>
          <div className='grid grid-cols-1 lg:grid-cols-3 lg:items-start  gap-6  mt-6 '>
            <div className='lg:col-span-2 space-y-4'>
              {cartData?.data.products.map((item) => <div key={item._id} className='flex gap-4 rounded-xl border p-4 shadow-sm bg-card'>
              
                  <Image
  src={item.product.imageCover}
  alt={item.product.title}
  width={112}
  height={112}
  className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
/>

                <div className='flex-1'>
                  <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
                    <div>
                      <h3 className='font-semibold text-base md:text-lg line-clamp-2'>
                        {item.product.title}
                      </h3>
                      <p className='text-sm text-muted-foreground mt-1'>
                        {item.product.brand.name}.{item.product.category.name}
                      </p>
                    </div>
                    <div className='text-right'>
                      <div className='font-semibold'>{item.price}EGP</div>
                    </div>
                  </div>
                  <div className='mt-3 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <button
                        aria-label="decrease"
                        disabled={item.count === 1}
                        onClick={() => updateCartItem(item.product.id, item.count - 1)}
                        className="size-8 rounded-lg border hover:bg-accent"
                      >
                        -
                      </button>

                      <span className="w-6 text-center font-medium">
                        {updatingId === item.product.id ? (
                          <Loader className="animate-spin" />
                        ) : (
                          item.count
                        )}
                      </span>

                      <button
                        aria-label="increase"
                        onClick={() => updateCartItem(item.product.id, item.count + 1)}
                        className="size-8 rounded-lg border hover:bg-accent"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeCartItem(item.product.id)}
                      aria-label="remove"
                      className="text-sm cursor-pointer flex text-destructive hover:underline items-center"
                    >
                      {removingId === item.product.id && (
                        <Loader className="animate-spin w-4 h-4 mr-1" />
                      )}
                      Remove
                    </button>
                  </div>
                </div>
              </div>)}
            </div>

            <div className='lg:col-span-1 sticky top-18'>
              <div className='rounded-xl border p-5 shadow-sm'>
                <h2 className=' text-lg font-semibold'>Order Summary</h2>
                <div className='mt-4 space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>
                      Subtotal :{cartData?.numOfCartItems} items
                    </span>
                    <span className='font-semibold'>{cartData?.data.totalCartPrice} EGP</span>
                  </div>
                  <div className=' flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground '>Shipping</span>
                    <span className='text-emerald-600 font-medium'>Free</span>
                  </div>
                </div>
                <div className='my-4 border-t'>
                  <div className='flex items-center justify-between'>
                    <span className='text-base font-semibold'>Total</span>
                    <span className='text-base font-bold'>{cartData?.data.totalCartPrice} EGP</span>
                  </div>
                  {cartData?.data?._id && (
                    <CheckOut cartId={cartData.data._id} />
                  )}
                <Link href={"/products"}>
                <Button className='w-full text-lg mt-2'>Continue Shopping</Button>
                </Link>  
                </div>
              </div>
             
              <div className="mt-2 flex gap-3">
  <Button
    variant="outline"
    onClick={clearCart}
    className="text-destructive hover:text-destructive flex items-center gap-2"
  >
    {isClear ? <Loader className="animate-spin w-4 h-4" /> : <Trash2 />}
    Clear Cart
  </Button>
<Link href={"/addresses"}>
<Button
    variant="outline"
    className="text-destructive hover:text-destructive flex items-center gap-2"
  >
    Address
  </Button>

</Link>


  
</div>

            </div>
          </div>
        </div>
        :
        <div className="flex min-h-[75vh] items-center justify-center flex-col">
          <h2 className="text-2xl my-4">Your Cart Is Empty...</h2>

          <Link href={"/products"}>
            <Button>Add Products to cart</Button>
          </Link>
        </div>
      }
    </>
  )
}
