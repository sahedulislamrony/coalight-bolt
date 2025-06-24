"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFoundPage() {
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);
  const backgroundOpacity = useMotionValue(0.1);
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(56, 182, 255, 0.4), transparent 80%)`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      radius.set(Math.min(clientX * 0.3, 500));
      animate(backgroundOpacity, 0.3, { duration: 0.4 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>404 - Not Found</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist"
        />
      </Head>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-white relative overflow-hidden">
        {/* Dynamic gradient background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background,
            opacity: backgroundOpacity,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Main content */}
        <div className="max-w-2xl w-full space-y-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Animated 404 text */}
            <motion.div className="relative inline-block">
              <motion.span
                className="text-9xl font-bold mb-4 text-sky-500 block"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  textShadow: [
                    "0 0 10px rgba(56, 182, 255, 0)",
                    "0 0 20px rgba(56, 182, 255, 0.5)",
                    "0 0 10px rgba(56, 182, 255, 0)",
                  ],
                }}
                transition={{
                  scale: { duration: 0.8, type: "spring" },
                  opacity: { duration: 0.6 },
                  textShadow: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              >
                404
              </motion.span>

              {/* Floating dots */}
              <motion.span
                className="absolute -top-4 -right-4 w-4 h-4 rounded-full bg-sky-500"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="absolute -bottom-2 -left-4 w-3 h-3 rounded-full bg-sky-400"
                animate={{
                  y: [0, 8, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>

            <motion.h2
              className="text-4xl font-medium mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Lost in <span className="text-sky-400">Space</span>
            </motion.h2>

            <motion.p
              className="text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              The page you&apos;re trying to reach doesn&apos;t exist. Maybe it
              was moved or deleted, or perhaps you mistyped the address.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <Link href="/" passHref>
                <motion.div
                  className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(56, 182, 255, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Return Home</span>
                  <motion.span
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </Link>

              <motion.button
                onClick={() => router.back()}
                className="px-8 py-3.5 bg-transparent border border-gray-700 hover:border-sky-400 text-gray-300 hover:text-sky-300 rounded-lg font-medium flex items-center gap-2 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 10px rgba(56, 182, 255, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Go Back</span>
                <motion.span
                  animate={{
                    x: [0, -4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                >
                  ←
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Binary rain animation */}
          <motion.div
            className="absolute -bottom-20 left-0 right-0 h-40 overflow-hidden opacity-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 1 }}
          >
            {[...Array(30)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-sky-400 text-xs font-mono"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100 - 100}%`,
                }}
                animate={{
                  y: `+=${window.innerHeight + 200}`,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              >
                {Math.random() > 0.5 ? "1" : "0"}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
