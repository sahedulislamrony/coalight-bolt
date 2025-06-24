"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

import Logo from "@/components/dashboard/Logo";
import { cn } from "@/lib/utils";
import { sideBarLink } from "@/data/AppSidebar";

export default function AppSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = sideBarLink;
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full  flex-1 flex-col overflow-hidden bg-white dark:bg-black rounded-none border border-l-0 border-neutral-200  md:flex-row dark:border-neutral-700 ",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10 bg-white dark:bg-black border-0">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <Logo />

            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            {/* Profile Section */}

            <SidebarLink
              link={{
                label: "Sahedul Islam",
                subLabel: "cast.sahedul@gmail.com",
                href: "#",
                icon: (
                  <Image
                    src="/defaults/avatar.jpg"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 overflow-y-auto ">{children}</div>
    </div>
  );
}
