import React from "react";
import { ModeToggle } from "../shadcn/themeToggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="h2-style  justify-beginning" href="/about">
        About
      </Link>
      <Link className="h1-style  text-center" href="/">
        🎲 Dice App
      </Link>
      <div className=" flex justify-end">
        <ModeToggle />
      </div>
    </nav>
  );
}
