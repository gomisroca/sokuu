import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOKUU",
  description: "Brief description of SOKUU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-lime-400">{children}</body>
    </html>
  );
}
