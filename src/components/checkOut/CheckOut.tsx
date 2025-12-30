
    'use client'

import React, { useContext, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { getUserToken } from '@/app/helpers/getUserToken';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { CartContext } from '../context/cartContext';

export default function Checkout({ cartId }: { cartId: string }) {
  const detailsInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);
  const { getCart } = useContext(CartContext);

  const router = useRouter();

  async function handleVisaPayment() {
    const shippingAddress = {
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value
    };
    const token = await getUserToken();

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          token: token || ""
        },
        body: JSON.stringify({ shippingAddress })
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.status === 'success' && data.session?.url) {
      window.location.href = data.session.url;
    }
  }


  async function handleCashPayment() {
    const shippingAddress = {
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value
    };
    const token = await getUserToken();

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token || ""
      },
      body: JSON.stringify({ shippingAddress })
    });

    const data = await response.json();
    console.log(data);

    if (data.status === "success") {
      toast.success('Order successfully placed');
// setCartData(data)
getCart()
      router.push('/allorders');
    } else {
      toast.error('Failed to place order');
    }

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full text-lg mt-2' variant="outline">Proceed to Checkout</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] mx-auto my-auto flex flex-col justify-center items-center">
        <DialogHeader>
          <DialogTitle>Add Shipping Address</DialogTitle>
          <DialogDescription>
            Make sure that you entered the correct address.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 w-full mt-4">
          <div className="grid gap-3 w-full">
            <Label>City</Label>
            <Input ref={cityInput} id="city" />
          </div>
          <div className="grid gap-3 w-full">
            <Label>Details</Label>
            <Input ref={detailsInput} id="details" />
          </div>
          <div className="grid gap-3 w-full">
            <Label>Phone</Label>
            <Input ref={phoneInput} id="phone" />
          </div>
        </div>

        <DialogFooter className="w-full flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleVisaPayment}>Visa</Button>
          <Button onClick={handleCashPayment}>Cash</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
