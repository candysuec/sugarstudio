import * as React from "react";

export interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function Header(props: HeaderProps) {
  return (
    <header
      style={{
        backgroundColor: "#f8f9fa",
        padding: "1rem",
        borderBottom: "1px solid #e9ecef",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>{props.title}</h1>
      {props.children}
    </header>
  );
}
