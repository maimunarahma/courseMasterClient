"use client";

import React, { useState } from "react";
import { useAuth } from "../../../../context/auth-context";

import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
 

export default function RegisterPage() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async (e : React.FormEvent) => {
    e.preventDefault();
try {
  console.log(form)
      await register(form);
      
} catch (error) {
  console.log(error)
}  };

  return (
    <div className="w-full flex justify-center items-center mt-20 px-4">
      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold">Create Account</CardTitle>
          <CardDescription>
            Fill out the form to create your CourseMaster account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-5">

            {/* Full Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                 onChange={(e) => setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              Create Account
            </Button>

          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <a href="/auth/login" className="text-primary hover:underline">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
