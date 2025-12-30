
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// 🔹 Schema جديد للـ form مع password قوي
const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be at most 32 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
    .trim(),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

const searchParams = useSearchParams()
const router=useRouter()
console.log(searchParams.get('error'));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
      redirect: true,
    });
    console.log(response);
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <Form {...form}>
          {searchParams.get('error') && <h2 className='text-red-500'>{searchParams.get('error')}  </h2>}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormDescription>Your email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormDescription>
                    Password must contain uppercase, lowercase, number, and special character
                  </FormDescription>
                  <FormMessage />
                   <p
                    className="text-sm text-blue-500 mt-2 cursor-pointer hover:underline"
                    onClick={() => router.push("/forgot-password")}
                  >
                    Forgot Password?
                  </p>
                </FormItem>


              )}
            />
            <Button type="submit" className="w-full flex justify-center items-center gap-2">
              {isLoading && <Loader className="animate-spin w-5 h-5" />}
              Login
            </Button>
                      <p className="text-center mt-3 text-gray-700">
              Don not have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => router.push("/register")}
              >
                Register
              </span>
            </p>


          </form>

        </Form>

      </div>
    </div>
  );
}
