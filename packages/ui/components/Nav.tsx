"use client";

import Link from "next/link";
import React from "react";

export function Nav() {
  return (
    <nav style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
      <Link href="/knisoci" style={{ marginRight: "20px" }}>
        KniSoci
      </Link>
      <Link href="/candyland">CandyLand</Link>
    </nav>
  );
}
