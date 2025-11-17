import * as React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      style={{
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {props.children}
    </button>
  );
}
