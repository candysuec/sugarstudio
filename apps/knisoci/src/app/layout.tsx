import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner"; // Import Toaster

export const metadata: Metadata = {
  title: "KniSoci",
  description: "Brain-driven insights powered by SugarStudio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

