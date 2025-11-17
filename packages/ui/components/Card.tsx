import React from "react";

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Card({ children, style }: CardProps) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        background: "#fff",
        border: "1px solid #eee",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
