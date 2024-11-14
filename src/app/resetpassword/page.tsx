"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const redirect = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const resetPassword = async () => {
    const response = await axios.post("/api/resetpassword", {
      password,
      token,
    });
    console.log(response);
    if (response.status === 200) {
      redirect.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-1/3 p-5">
        <CardTitle className="mb-3">Reset Password</CardTitle>
        <CardContent>
          <div className="mb-3">
            <input
              type="email"
              className="w-full border p-3 focus-visible:outline-none rounded"
              placeholder="Enter your New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex">
            <Button className="ml-auto" onClick={resetPassword}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
