'use client'
import { ReactNode } from 'react'
import { useAuth } from '../../context/auth-context'


interface Props {
  children: ReactNode
}

export function AuthInitializer({ children }: Props) {
  const { user, loading } = useAuth()
console.log(user)
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <div className="relative flex items-center justify-center">
          {/* Outer ring */}
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>

          {/* Inner glow circle */}
          <div className="absolute w-8 h-8 bg-white/20 rounded-full blur-md animate-pulse"></div>
        </div>

        <p className="mt-6 text-lg tracking-wide text-gray-200 animate-pulse">
          Loading user...
        </p>
      </div>
    )
  }

  return <>{children}</>
}