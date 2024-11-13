"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onSubmit = () => {
    console.log(user);
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
          <button onClick={onSubmit}>Login</button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
