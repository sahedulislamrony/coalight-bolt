// import Navbar from "@/components/basic/Navbar";

import AppSidebar from "@/components/basic/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppSidebar>{children}</AppSidebar>
    </div>
  );
}
