
'use client'

import React, { useEffect, useState } from 'react'
import { AddAddressResponse, Address } from '@/interfaces/address'
import { getUserToken } from '@/app/helpers/getUserToken'
import { Loader} from 'lucide-react'
import Loading from '@/app/loading' // الـ Component بتاعك للـ loading
import CheckAddress from '@/components/checkOut/CheckAddress'
import toast from 'react-hot-toast'

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null);

  async function loadAddresses() {
    setLoading(true)
    const token = await getUserToken()
   

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
      headers: { token: token! },
    })

    const data = await res.json()
    if (data.status === 'success') {
      setAddresses(data.data)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadAddresses()
  }, [])


async function removeAddressItem(productId: string) {
 const token   = await getUserToken()
    setRemovingId(productId);

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses/" + productId,
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

    const data: AddAddressResponse = await response.json();
    console.log(data);

    if (data.status === "success") {
      toast.success("address deleted successfully");
setAddresses(data.data) // data.data هنا هي Address[]
    }

    setRemovingId(null);
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-3xl pt-32">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        {/* <Button variant="outline">Add Address</Button> */}
         

      </div>
  <CheckAddress/> 
      {loading ? (
        // ✅ Loading داخل الـ container
        <div className="flex justify-center items-center py-10">
          <Loading />
        </div>
      ) : addresses.length === 0 ? (
        <div className="flex justify-center items-center h-64">
    <p className="text-gray-500 text-lg">No addresses found</p>
  </div>
      ) : (
        <div className="grid gap-4">
    


          {addresses.map(address => (
            <div
              key={address._id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-lg">{address.name}</p>
                <p className="text-gray-700 mt-1">{address.details}</p>
                <p className="text-gray-600 mt-1">{address.city}</p>
                <p className="text-gray-600 mt-1">{address.phone}</p>
              </div>

              <div>
               
                <button
  onClick={() => removeAddressItem(address._id)}
  aria-label="remove"
  className="text-sm cursor-pointer flex text-destructive hover:underline items-center"
>
  {removingId === address._id && (
    <Loader className="animate-spin w-4 h-4 mr-1" />
  )}
  Remove
</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
