"use client"
import { NavigationMenu } from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";

import { useAuth } from "../context/auth-context";


export default function Navbar() {
    const {user , isAuthenticated , logout}= useAuth();
  console.log("user", user)
  const handleLogout = () => {
    logout();

  }
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">Course Master</Link>
        <NavigationMenu />
        <div className="flex items-center gap-3">
         
          {isAuthenticated ? (
            <span>Welcome, {user?.name}
           <Button variant="outline" onClick={handleLogout}>Logout</Button>
</span> ):
<>
 <Link href="/auth/login"><Button variant="outline">Login</Button></Link>
          <Link href="/auth/register"><Button>Register</Button></Link> </>}
        </div>
      </div>
    </nav>
  );
}
