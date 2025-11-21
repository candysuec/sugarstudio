"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-all",
        variant === "default" && "bg-black text-white hover:bg-neutral-800",
        variant === "outline" &&
          "border border-black text-black hover:bg-black hover:text-white",
        className
      )}
      {...props}
    />
  );
}