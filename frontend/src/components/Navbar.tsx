"use client"
import React from "react";
import Link from "next/link";
import { useAuth } from "@/store/authstore";



const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Test",
    href: "/test",
  },
  {
    name: "Profile",
    href: "/profile",
  },
];


const Navbar = () => {

  const { isAuthenticated } = useAuth();


  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-white text-lg font-bold">
            EcoSync
          </Link>
        </div>
        <ul className="flex space-x-4">
          {links.map((link)=>{
            return (
              <li key={link.href}>
                <Link href={link.href} className="text-white hover:text-green-300">
                  {link.name}
                </Link>
              </li>
            )
          })}
          <li>
            {isAuthenticated ? (
              <Link href="/auth/logout" className="text-white">
                Logout
              </Link>
            ) : (
              <Link href="/login" className="text-white">
                Login
              </Link>
            
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
