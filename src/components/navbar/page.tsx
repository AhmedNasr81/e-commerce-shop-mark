"use client"
import React, { useContext } from 'react'
import {
  NavigationMenu,

  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
 
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { Loader, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { CartContext } from '../context/cartContext'
import { signOut, useSession } from 'next-auth/react'
import MyStar from '../myStarIcon'
import { WishlistContext } from '../context/wishlistContext'
export default function Navbar() {
  const{cartData,loading}=useContext(CartContext)
    const{wishlistData}=useContext(WishlistContext)

 const session= useSession()
 console.log(session);
 
  return (
    <>
    <nav className='bg-gray-100 py-3 text-2xl font-semibold fixed top-0 start-0 end-0 shadow'>
      <div className='container w-5/6 mx-auto'>
        <div className='flex items-center justify-between'>
          <h1 className='flex gap-2'>
            <span className="px-3 py-0.5 rounded-lg text-white bg-black">S</span>
            <Link href={'/'}>ShopMart</Link>
          </h1>
        <NavigationMenu>
  <NavigationMenuList>
     <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/products">Products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
     <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
     <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/categories">Categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
<div className='flex items-center gap-1'>
  {session.status=="authenticated"&&<h2>hi {session.data.user.name}  </h2>}
<DropdownMenu>
  <DropdownMenuTrigger><UserIcon/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {
      session.status=="authenticated"?
      <>
   

   <DropdownMenuItem onClick={()=>signOut({
    callbackUrl:"/"
   })}>Logout</DropdownMenuItem>

    </> : <>
    <Link href={'/login'}><DropdownMenuItem>Login</DropdownMenuItem></Link>
    <Link href={'/register'}><DropdownMenuItem>Register</DropdownMenuItem></Link>
    </>
    }
    
   
    
  </DropdownMenuContent>
</DropdownMenu>


  {session.status === "authenticated" && (
  <div className="flex items-center gap-4">

    <div className="relative">
      <Link href="/carts">
        <ShoppingCartIcon />
        <Badge className="h-5 absolute -top-3 -end-3 min-w-5 rounded-full px-1 font-mono tabular-nums">
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            cartData?.numOfCartItems
          )}
        </Badge>
      </Link>
    </div>

    <div className="relative">
      <Link href="/wishlist">
        <MyStar />
        <Badge className="h-5 absolute -top-3 -end-3 min-w-5 rounded-full px-1 font-mono tabular-nums">
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            wishlistData?.count
          )}
        </Badge>
      </Link>
    </div>

  </div>
)}
            

        </div>

      </div>
</div>
    </nav> 
    
    </>
  )
}