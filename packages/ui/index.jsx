"use client";

import React from "react";

export function PageShell({ title, children }) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.8rem" }}>{title}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

export function PrimaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "999px",
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
}