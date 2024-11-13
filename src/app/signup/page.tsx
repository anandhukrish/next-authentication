"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    if (user.email === "" || user.password === "" || user.username === "") {
      return;
    }
    const response = await axios.post("/api/users/signup", {
      body: user,
    });
    console.log(response);
    if (response.data.error) {
      return;
    }

    router.push("/login");
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-1/3">
        <CardHeader>Sign Up</CardHeader>
        <CardContent>
          <div>
            <label htmlFor="">Username</label>
            <input
              type="email"
              className="w-full border p-3 focus-visible:outline-none"
              value={user.username}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="w-full border p-3 focus-visible:outline-none"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="password"
              name=""
              id=""
              className="w-full border p-3 focus-visible:outline-none"
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <Button onClick={onSubmit} className="flex mt-3 ml-auto">
            Sign Up
          </Button>
          <Button asChild variant="link" className="block text-center">
            <Link href="/login">Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
