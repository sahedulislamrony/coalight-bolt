"use client";

import Watch2 from "@/components/dashboard/Watch2";
import { ReactNode } from "react";

export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <div className="p-6 min-h-full   max-w-full mx-auto space-y-6 md:rounded-tl-4xl  dark:bg-white/5 shadow-lg bg-black/5">
      {/* Header */}
      <Header>
        <HeaderTitle title="Dashboard" />
        <Watch2 />
      </Header>

      <div className="w-full h-full">{children}</div>
    </div>
  );
}

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4">
      {children}
    </header>
  );
};

const HeaderTitle = ({ title }: { title?: string }) => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const hour = date.getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  console.log(title);
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {greeting}
      </h1>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {formattedDate}
      </p>
    </div>
  );
};
