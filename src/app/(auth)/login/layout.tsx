import Navbar from "@/components/basic/Navbar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex  min-h-screen  w-full items-start justify-start p-6 md:p-10">
        {children}
      </div>
    </>
  );
}
