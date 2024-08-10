"use client";
import React from "react";
import { ModeToggle } from "../shadcn/themeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ResetIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col xs:flex-row justify-between items-center py-8">
      <Link className="h1-style flex items-center" href="/">
        <span className="flex-shrink-0">🎲 Dice App</span>
        <div className="flex items-center ml-1">
          {pathname === "/" ? null : <ResetIcon className="h-7 w-7 ml-2" />}
        </div>
      </Link>
      <div className="flex flex-row justify-between items-center w-full xs:w-auto">
        <Link className="h2-style" href="/history">
          History
        </Link>
        <Link className="h2-style" href="/about">
          About
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
