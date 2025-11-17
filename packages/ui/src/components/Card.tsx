import * as React from "react";

export interface CardProps {
  children: React.ReactNode;
  title?: string;
}

export function Card(props: CardProps) {
  return (
    <div
      style={{
        border: "1px solid #e9ecef",
        borderRadius: "8px",
        padding: "1rem",
        margin: "1rem 0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      {props.title && <h2>{props.title}</h2>}
      {props.children}
    </div>
  );
}