"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const checkEmail = async () => {
    const response = await axios.post("/api/forgotpassword", {
      email,
    });
    console.log(response);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-1/3 p-5">
        <CardTitle className="mb-3">Forgot Title</CardTitle>
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
