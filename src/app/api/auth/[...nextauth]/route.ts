import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { SuccessLoginResponse, FailedLoginResponse } from "@/interfaces"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credential",

      credentials: {
        email: {},
        password: {}
      },

      authorize: async (credentials) => {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            }),
            headers: { "content-type": "application/json" }
          }
        )

        const payload: SuccessLoginResponse | FailedLoginResponse =
          await response.json()

        console.log(payload)

        if ("token" in payload) {
          return {
            id: payload.user.email,   
            user: payload.user,      
            token: payload.token      
          }
        } else {
          throw new Error(payload.message)
        }
      }
    })
  ],


callbacks: {
  jwt: ({ token, user }) => {
    if (user) {
      token.user = user.user;         
      token.token = user.token;      
    }
    return token;
  },

  session: ({ session, token }) => {
    session.user = token.user!;     
    session.user.token = token.token; 
    return session;
  }
}

  ,
  pages:{
    signIn:"/login",
    error:"/login"
  },
  secret:process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
