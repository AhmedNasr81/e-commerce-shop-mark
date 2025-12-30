

"use server"

import { getUserToken } from "@/app/helpers/getUserToken";

export async function addToCartAction(productId: string) {
 const token=await  getUserToken()
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2M0MzIwMjAzN2YwZDI5MDNkZWU4MSIsIm5hbWUiOiJBaG1lZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY1NTU3MDI1LCJleHAiOjE3NzMzMzMwMjV9.Dunq_qezR19ZBOm8ooOkXGdlJjigHqtWNWrWmi8H6mI"             
   token: token!   },

      body: JSON.stringify({ productId }),
  });

  console.log("STATUS:", response.status);
  const data = await response.json();
  console.log("DATA:", data);

  return data;
}
