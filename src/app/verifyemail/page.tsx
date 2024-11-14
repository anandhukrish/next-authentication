"use client";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyUser = () => {
  const query = useSearchParams();
  const [userVerified, setUserVerified] = useState(false);

  const tokenFromUrl = query.get("token")!;

  useEffect(() => {
    async function verifyToken() {
      try {
        await axios.post("/api/verifyemail", {
          body: tokenFromUrl,
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
    verifyToken();
  }, [tokenFromUrl]);

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
