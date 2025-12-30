'use server'

import { getUserToken } from "@/app/helpers/getUserToken"

export async function addToWishListAction(productId:string){
    const token= await getUserToken()
     const response=await  fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
        method:'POST',
        body: JSON.stringify({productId}),
        headers:{
            token: token!,
          'content-type':'application/json'
       }
    })
    const data=await response.json()
    return data
}