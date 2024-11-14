"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfileDetails = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const getMe = async () => {
      const response = await axios("/api/users/me");
      setUser(response.data.userId);
    };
    getMe();
  }, []);
  return <div>ProfileDetails {user}</div>;
};

export default ProfileDetails;
