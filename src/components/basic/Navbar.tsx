"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import ChangeThemeBtn from "./ChangeThemeBtn";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container max-w-screen-2xl mx-auto  flex h-16 items-center justify-between space-v">
        {/* Logo & Title */}
        <Link href="/" className="flex items-center gap-2 ">
          <Image
            src="/logo1.png"
            alt="Ballot Guard Logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Ballot Guard
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link href="/signin">
            <Button
              variant="ghost"
              className="rounded-sm px-5 hover:bg-muted/70 transition font-[600]"
            >
              Sign In
            </Button>
          </Link>

          <Link href="/signup">
            <Button className="rounded-sm px-5 shadow hover:shadow-md font-[600] transition">
              Sign Up
            </Button>
          </Link>

          <ChangeThemeBtn />
        </div>
      </div>
    </nav>
  );
}
