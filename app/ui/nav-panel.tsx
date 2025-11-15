import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function NavPanel() {
  return (
    <div className="flex flex-row gap-10 p-6 ">
      <h1 className="text-2xl">SOKUU</h1>
      <nav className="flex gap-4 items-center text-xl uppercase">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <ThemeToggle />
      </nav>
    </div>
  );
}
