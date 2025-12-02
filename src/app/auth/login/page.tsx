"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { useAuth } from "../../../../context/auth-context";

export default function LoginPage() {
    const {login} =useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   try {
     console.log(form);
     login(form.email, form.password);

   } catch (error) {
        console.error("Login failed:", error);
    
   }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-zinc-900 dark:to-black p-6">
      <Card className="w-full max-w-md border border-zinc-200 dark:border-zinc-800 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your credentials to continue.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {/* Login button */}
            <Button type="submit" className="w-full h-11 text-base font-medium">
              Login
            </Button>

            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full h-11 text-base font-medium"
            >
              Continue with Google
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-6">
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-500">OR</span>
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-800" />
          </div>

          {/* Redirect */}
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
