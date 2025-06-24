"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 text-white">
        <div className="max-w-md w-full space-y-8">
          {/* Floating grid background */}
          <motion.div
            className="absolute inset-0 overflow-hidden opacity-10"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <div className="grid grid-cols-12 gap-1 h-full w-full">
              {[...Array(144)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="text-9xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 8px rgba(192, 132, 252, 0)",
                  "0 0 8px rgba(192, 132, 252, 0.5)",
                  "0 0 8px rgba(192, 132, 252, 0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              404
            </motion.div>

            <motion.h2
              className="text-3xl font-semibold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Oops! Page not found
            </motion.h2>

            <motion.p
              className="text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link href="/" passHref>
                <motion.div
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Go Home
                </motion.div>
              </Link>

              <motion.button
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg font-medium hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Go Back
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-purple-400"
            animate={{
              y: [0, -20, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-pink-500"
            animate={{
              y: [0, 20, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </div>
    </>
  );
}
