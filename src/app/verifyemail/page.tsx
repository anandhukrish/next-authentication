"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const VerifyUser = () => {
  const query = useSearchParams();

  const tokenFromUrl = query.get("token")!;

  useEffect(() => {
    async function verifyToken() {
      const response = await axios.post("/api/verifyemail", {
        body: tokenFromUrl,
      });
      console.log(response);
    }
    verifyToken();
  }, [tokenFromUrl]);

  return <div>{tokenFromUrl}</div>;
};

export default VerifyUser;
