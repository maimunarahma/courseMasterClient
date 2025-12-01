
"use client";
import { User } from '../types/mock-types';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner"; // Use 'toast' function from 'sonner' directly

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  error: any;
   register: (formData: Partial<User> & { password: string; confirmPassword: string }) => Promise<void>; 
  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Fetch user on initial load using cookies
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/register`, {
          withCredentials: true,
        });
        const userData = res?.data?.data;
        
          setUser({
            ...userData,
            bmi : userData?.bmi || { weight : 0, height : 0, value : 0}
          });
          setIsAuthenticated(!!userData)
          queryClient.setQueryData<User | null>(['auth-user'], userData || null);
        
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false)
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [queryClient]);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true); // Start loading
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      const userData = res.data?.data;
      if (!userData) setUser(null);
      setUser(userData || null );
      setIsAuthenticated(!!userData)
      queryClient.setQueryData<User | null>(['auth-user'], userData || null);
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });

      // Use toast() function directly
      toast("Welcome back!", {
        description: "You have been successfully logged in.",
      });
    } catch (err) {
      console.error('Login failed:', err);
      setError(err);
      setUser(null);
        toast("Login failed", {
        description: err instanceof Error ? err.message : "Invalid credentials",
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      });
      throw err;
    
    } finally {
      setLoading(false);
    }
  };
   const register = async (formData: Partial<User> & { password: string; confirmPassword: string }) => {
    setLoading(true);
    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/register`,
        formData,
        { withCredentials: true }
      );

      const userData = res.data?.data;
      setUser(userData || null);
       setIsAuthenticated(!!userData)
      queryClient.setQueryData(['auth-user'], userData || null);
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });

      toast('Account created!', { description: 'Welcome to MealMate! You can now start exploring.' });
    } catch (err: any) {
      setUser(null);
      setError(err)
      toast('Registration failed', {
        description: err.response?.data?.message || err.message || 'Something went wrong',
        style: { backgroundColor: 'red', color: 'white' },
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };


  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false)

      queryClient.setQueryData<User | null>(['auth-user'], null);
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });

      toast("Logged out", {
        description: "You have been logged out successfully.",
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100; // Convert cm to meters
    const newBMI = weight / (heightInMeters * heightInMeters);
    
    // Determine BMI category
    let category: 'underweight' | 'normal' | 'overweight' | 'obese';
    if (newBMI < 18.5) {
      category = 'underweight';
    } else if (newBMI < 25) {
      category = 'normal';
    } else if (newBMI < 30) {
      category = 'overweight';
    } else {
      category = 'obese';
    }

    if (user) {
      setUser({
        ...user
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated,
        setUser,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}