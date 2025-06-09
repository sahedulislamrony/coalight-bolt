"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  increment,
  decrement,
  reset,
} from "@/redux/features/counter/counterSlice";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Plus, Minus, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleAction = (action: () => void, isReset = false) => {
    if (isReset) {
      setIsResetting(true);
      action();
      setTimeout(() => setIsResetting(false), 400);
    } else {
      action();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-4">
      <section className="w-full max-w-md rounded-3xl p-8 shadow-xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Smart Counter
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redux state management
            </p>
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-600" />
              )}
            </button>
          )}
        </div>

        {/* Counter Display */}
        <div className="text-center mb-8">
          <div className="h-32 flex items-center justify-center">
            <span className="text-7xl font-extralight text-gray-800 dark:text-white">
              {count}
            </span>
          </div>
          <div className="w-40 mx-auto h-[2px] bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent my-3" />
          <p className="text-xs tracking-widest text-gray-400 dark:text-gray-500 font-mono">
            CURRENT VALUE
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-3 gap-4">
          {/* Decrease */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction(() => dispatch(decrement()))}
            className="group p-5 rounded-xl bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800 transition flex flex-col items-center"
          >
            <div className="p-3 bg-red-500 dark:bg-red-400 rounded-full text-white">
              <Minus className="h-5 w-5" />
            </div>
            <span className="text-sm text-red-800 dark:text-red-300 mt-2 font-medium">
              Decrease
            </span>
          </motion.button>

          {/* Reset */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction(() => dispatch(reset()), true)}
            className="group p-5 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition flex flex-col items-center"
          >
            <div className="p-3 bg-gray-600 dark:bg-gray-500 rounded-full text-white">
              <RefreshCw
                className={`h-5 w-5 ${isResetting ? "animate-spin" : ""}`}
              />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 mt-2 font-medium">
              Reset
            </span>
          </motion.button>

          {/* Increase */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction(() => dispatch(increment()))}
            className="group p-5 rounded-xl bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-800 transition flex flex-col items-center"
          >
            <div className="p-3 bg-green-500 dark:bg-green-400 rounded-full text-white">
              <Plus className="h-5 w-5" />
            </div>
            <span className="text-sm text-green-800 dark:text-green-300 mt-2 font-medium">
              Increase
            </span>
          </motion.button>
        </div>
      </section>
    </main>
  );
}
