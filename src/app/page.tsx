import Navbar from "@/components/basic/Navbar";
import JoinUSWindow from "@/components/auth/JoinUSWindow";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <JoinUSWindow />
      </main>
    </>
  );
}
