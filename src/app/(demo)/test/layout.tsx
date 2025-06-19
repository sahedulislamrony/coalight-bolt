import Navbar from "@/components/basic/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {" "}
      <Navbar />
      {children}
    </>
  );
}
