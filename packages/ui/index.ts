import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
}

export const Button = ({ children, onClick, style }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        borderRadius: "8px",
        background: "#f2f2f2",
        border: "1px solid #ccc",
        cursor: "pointer",
        fontWeight: "600",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export { Card } from "./components/Card.tsx";
export { Header } from "./components/Header.tsx";
export { Nav } from "./components/Nav.tsx";
export { ErrorBoundary } from "./components/ErrorBoundary.tsx";