"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const redirect = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    if (user.email === "" || user.password === "") {
      return;
    }
    const response = await axios.post("/api/users/login", {
      body: user,
    });
    console.log(response);
    if (response.data.error) {
      return;
    }
    redirect.push("/profile");
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-1/3">
        <CardHeader>Login</CardHeader>
        <CardContent>
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
            Login
          </Button>
          <Button asChild variant="link" className="text-center block">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild variant="link" className="text-center block">
            <Link href="/forgotpassword">Forget Password</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
