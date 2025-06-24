import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white"
    >
      <div className="flex items-center justify-center size-8 shrink-0">
        <Image
          src="/logo.png"
          alt="Coalight Logo"
          width={24}
          height={24}
          className="size-full rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm object-cover"
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-[700] text-lg whitespace-nowrap"
      >
        Coalight
      </motion.span>
    </Link>
  );
}
