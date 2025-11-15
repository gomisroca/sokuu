import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NavPanel from "./ui/nav-panel";

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
      <body className="bg-lime-400 dark:bg-amber-400">
        <ThemeProvider attribute="class">
          <NavPanel />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
