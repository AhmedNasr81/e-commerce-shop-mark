

'use client'

import { HeartIcon, Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { WishlistContext } from '../context/wishlistContext'
import { addToWishListAction } from '@/app/(pages)/products/_action/addToWishlist'
import { WishlistProduct } from '@/interfaces'

export default function AddedToWishlist({
  productId,
}: {
  productId: string
}) {
  const [loading, setLoading] = useState(false);

  const { wishlistData, getWishlist } = useContext(WishlistContext)
  const { status } = useSession()
  const router = useRouter()

  // ✅ check لو المنتج موجود في الـ wishlist
  const isInWishlist =
    wishlistData?.data?.some(
      (item: WishlistProduct) => item._id === productId
    ) ?? false

  async function addToProductToWishList() {
    if (status !== 'authenticated') {
      router.push('/login')
      return
    }

    if (isInWishlist) {
      toast('Product already in wishlist ❤️')
      return
    }

    setLoading(true)

    const data = await addToWishListAction(productId)

    if (data?.status === 'success') {
      toast.success('Product added successfully ❤️')
      await getWishlist()
    } else {
      toast.error('Something went wrong')
    }

    setLoading(false)
  }

  return (
    <>
      {loading? (
        <Loader className="animate-spin text-red-500" />
      ) : (
        <HeartIcon
          onClick={addToProductToWishList}
          className={`cursor-pointer transition
            ${
              isInWishlist
                ? 'text-red-500 fill-red-500'
                : 'text-gray-500 hover:text-red-500'
            }`}
        />
      )}
    </>
  )
}
