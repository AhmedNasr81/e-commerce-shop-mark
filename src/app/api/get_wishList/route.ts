import { getUserToken } from "@/app/helpers/getUserToken";
import {  WishlistResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
 const token= await getUserToken()
  const response = await fetch(
     "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: {
//  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2M0MzIwMjAzN2YwZDI5MDNkZWU4MSIsIm5hbWUiOiJBaG1lZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY1NTU3MDI1LCJleHAiOjE3NzMzMzMwMjV9.Dunq_qezR19ZBOm8ooOkXGdlJjigHqtWNWrWmi8H6mI"            
    token:token!  },
    }
  );
  const data: WishlistResponse = await response.json();
  return NextResponse.json(data);
}
