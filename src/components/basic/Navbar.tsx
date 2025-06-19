"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import ChangeThemeBtn from "./ChangeThemeBtn";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = (
    <>
      <Link href="/login">
        <Button
          variant="ghost"
          className="rounded-sm px-5 hover:bg-muted/70 transition font-[600] w-full md:w-auto text-left md:text-center"
        >
          Login
        </Button>
      </Link>

      <Link href="/signup">
        <Button className="rounded-sm px-5 shadow hover:shadow-md font-[600] transition w-full md:w-auto text-left md:text-center">
          Join Now
        </Button>
      </Link>

      <div className="hidden md:block">
        <ChangeThemeBtn />
      </div>
    </>
  );

  return (
    <nav className="space-v fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container max-w-screen-2xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo & Title */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Ballot Guard Logo"
            width={32}
            height={32}
            className="h-10 w-10 rounded-full"
          />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Coalight
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">{navLinks}</div>

        {/* Mobile Controls (Theme + Hamburger) */}
        <div className="flex items-center gap-4 md:hidden">
          <ChangeThemeBtn />

          <button
            className="focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="space-y-2">
              <motion.span
                animate={isOpen ? "open" : "closed"}
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 7 },
                }}
                className="block h-0.5 w-6 bg-foreground"
              ></motion.span>
              <motion.span
                animate={isOpen ? "open" : "closed"}
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="block h-0.5 w-6 bg-foreground"
              ></motion.span>
              <motion.span
                animate={isOpen ? "open" : "closed"}
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -7 },
                }}
                className="block h-0.5 w-6 bg-foreground"
              ></motion.span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <motion.div
              className="px-4 pb-4 pt-2 flex flex-col gap-3"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
