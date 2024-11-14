"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const redirect = useRouter();

  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlToken = window.location.href.split("=")[1];
    setToken(urlToken);
  }, []);

  const resetPassword = async () => {
    if (token.length <= 0) {
      return;
    }
    try {
      const response = await axios.post("/api/resetpassword", {
        password,
        token,
      });
      if (response.status === 200) {
        redirect.push("/login");
      }
      toast.success("password reset successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      }
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
