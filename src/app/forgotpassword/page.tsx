"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const checkEmail = async () => {
    try {
      await axios.post("/api/forgotpassword", {
        email,
      });
      toast.success("password reset email send to your mail");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-1/3 p-5">
        <CardTitle className="mb-3">Forgot Password</CardTitle>
        <CardContent>
          <div className="mb-3">
            <input
              type="email"
              className="w-full border p-3 focus-visible:outline-none rounded"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex">
            <Button className="ml-auto" onClick={checkEmail}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
