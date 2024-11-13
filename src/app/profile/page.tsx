"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const redirect = useRouter();
  const logout = async () => {
    await axios.get("/api/users/logout");
    redirect.push("/login");
  };
  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      ProfilePage
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default ProfilePage;
