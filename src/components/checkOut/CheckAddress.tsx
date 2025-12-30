

'use client'

import React, { useRef, useState } from 'react';
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
import toast from 'react-hot-toast';
import { Address } from '@/interfaces';

export default function Checkout() {
  const nameInput = useRef<HTMLInputElement | null>(null);
  const detailsInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);
   const [dialogOpen, setDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);


async function checkOutSession() {
  setLoading(true);

  const shippingAddress = {
    name: nameInput.current?.value,
    details: detailsInput.current?.value,
    city: cityInput.current?.value,
    phone: phoneInput.current?.value,
  };

  const token = await getUserToken();

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token || "",
    },
    body: JSON.stringify(shippingAddress)
  });

  const data = await response.json();
  setLoading(false);

  if (data.status === 'success') {
    
     window.location.href='/addresses'
    toast.success('Address saved successfully!');
        setDialogOpen(false); 


  } else {
    toast.error('Failed to save address');
  }
}


  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div className="mb-5"> 
            <Button
              variant="outline"
              className="text-destructive hover:text-destructive flex items-center gap-2"
            >
              Add Address
            </Button> 
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] mx-auto my-auto flex flex-col justify-center items-center">
          <div className="w-full">
            <DialogHeader>
              <DialogTitle>Add Shipping Address</DialogTitle>
              <DialogDescription>
                Make sure that you entered the correct address.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 w-full">
              <div className="grid gap-3 w-full">
                <Label>Name</Label>
                <Input ref={nameInput} id="name" />
              </div>
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

              <Button onClick={checkOutSession} disabled={loading}>
                {loading ? 'Adding...' : 'Save'}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      
    </div>
  );
}
