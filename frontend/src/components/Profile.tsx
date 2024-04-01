"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/user";
import { useAuth } from "@/store/authstore";

const ProfilePage = () => {
  //data from global store
  const { isAuthenticated, user, login, logout, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // console.log(user);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {isAuthenticated && (
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Username:</label>
            <p>{user?.username}</p>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Email:</label>
            <p>{user?.email}</p>
          </div>
          {/* Add more user information here */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
