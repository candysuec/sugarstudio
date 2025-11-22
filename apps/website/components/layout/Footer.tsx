"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={cn("mt-12 border-t border-gray-200 py-8 md:py-12")}>
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            {/* Replace with your actual logo or brand name */}
            <span className="inline-block font-bold text-lg text-foreground">SugarStudio</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with ❤️ by Your Team.
          </p>
        </div>
        <nav className="flex gap-x-4">
          <Link
            href="/privacy"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Terms of Service
          </Link>
        </nav>
      </div>
      <div className="container mt-4 text-center text-sm text-muted-foreground">
        &copy; {currentYear} SugarStudio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
