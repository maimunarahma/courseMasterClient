"use client"
import { NavigationMenu } from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";

import { useAuth } from "../context/auth-context";


export default function Navbar() {
    const {user}= useAuth();
  console.log("user", user)
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">MyApp</Link>
        <NavigationMenu />
        <div className="flex items-center gap-3">
          <Link href="/login"><Button variant="outline">Login</Button></Link>
          {user ? (
            <span>Welcome, {user.name}
</span> ):
          <Link href="/auth/register"><Button>Register</Button></Link>}
        </div>
      </div>
    </nav>
  );
}
