import React from "react";
import { ModeToggle } from "../shadcn/themeToggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-col xs:flex-row justify-between items-center py-8">
      <Link className="h1-style" href="/">
        🎲 Dice App
      </Link>
      <div className="flex flex-row justify-between items-center w-full xs:w-auto">
        <Link className="h2-style" href="/about">
          About
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
