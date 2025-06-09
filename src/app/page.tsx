import Navbar from "@/components/basic/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[80vh] flex-col items-center justify-center p-24 gap-12">
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Welcome to App
        </h1>

        <Link
          href="/counter"
          className="relative isolate overflow-hidden text-lg font-medium px-6 py-3 rounded-lg group transition-all duration-500"
        >
          {/* Main button text with shine effect */}
          <span className="relative z-10 flex items-center gap-2 text-gray-900 dark:text-white">
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
            <span>View Counter</span>
          </span>

          {/* Modern layered effects */}
          <span className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg"></span>
          <span className="absolute inset-0 -z-20 bg-[conic-gradient(at_top_right,var(--tw-gradient-stops))] from-gray-300 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-900 dark:to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

          {/* Ultra-thin border animation */}
          <span className="absolute inset-0 rounded-lg p-px bg-gradient-to-br from-gray-900/30 to-transparent dark:from-white/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

          {/* Hover shine effect */}
          <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="absolute top-0 left-1/4 w-1/2 h-px bg-gray-900/30 dark:bg-white/30"></span>
            <span className="absolute top-1/4 left-0 w-px h-1/2 bg-gray-900/30 dark:bg-white/30"></span>
          </span>
        </Link>
      </main>
    </>
  );
}
