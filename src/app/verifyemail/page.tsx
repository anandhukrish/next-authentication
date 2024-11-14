"use client";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyUser = () => {
  const [userVerified, setUserVerified] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlToken = window.location.href.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    async function verifyToken() {
      try {
        await axios.post("/api/verifyemail", {
          body: token,
        });
        setUserVerified(true);
        toast.success("email verified successfully");
      } catch (error) {
        if (error instanceof AxiosError)
          toast.error(error.response?.data.error, {
            duration: 3000,
          });
      }
    }
    if (token.length > 0) {
      verifyToken();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <h1 className="text-2xl space-y-2 font-bold">Email Validation</h1>
      {userVerified && (
        <>
          <p>Email verified succesfully</p>
          <Button asChild>
            <Link href="/login" className="mt-3">
              Login
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default VerifyUser;
