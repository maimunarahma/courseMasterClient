"use client";

import * as React from "react";

export function Button({ children, variant = "default", ...props }) {
  const baseStyle = "px-4 py-2 rounded font-medium";
  const variantStyle =
    variant === "outline"
      ? "border border-gray-300 hover:bg-gray-100"
      : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button className={`${baseStyle} ${variantStyle}`} {...props}>
      {children}
    </button>
  );
}
