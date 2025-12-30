
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "code" | "reset">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleSendEmail() {
    if (!email) {
      toast.error("Please enter your email ❌");
      return;
    }

    setIsLoading(true);
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setIsLoading(false);

    if (data.statusMsg?.toLowerCase() === "success") {
      toast.success("Reset code sent to your email ✅");
      setStep("code");
    } else {
      toast.error(data.message || "Failed to send reset code ❌");
    }
  }

  async function handleVerifyCode() {
    if (!code) {
      toast.error("Please enter the reset code ❌");
      return;
    }

    setIsLoading(true);

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetCode: code }),
    });
    const data = await res.json();
    setIsLoading(false);

if (data.status === "Success") {
  toast.success("Code verified ✅");
  setStep("reset");
} else {
  toast.error("Invalid code ❌");
}
  }

async function handleResetPassword() {
  setIsLoading(true);

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
    method: "PUT", // 👈 مهم جداً، بدل POST
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      newPassword,
      resetCode: code // الكود اللي اتحققنا منه قبل كده
    }),
  });

  const data = await res.json();
  setIsLoading(false);
console.log(data)
   if (data.token) { 
     toast.success("Password reset successful ✅");
   
    router.push("/login"); 

  } else {
    toast.error(data.message || "Failed to reset password ❌");
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        {step === "email" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="mt-4 w-full" onClick={handleSendEmail} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Code"}
            </Button>
          </>
        )}

        {step === "code" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Verify Code</h2>
            <Input
              placeholder="Enter reset code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button className="mt-4 w-full" onClick={handleVerifyCode} disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>
          </>
        )}

        {step === "reset" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
            <Input
              placeholder="Enter new password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button className="mt-4 w-full" onClick={handleResetPassword} disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
