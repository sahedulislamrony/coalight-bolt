/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Head from "next/head";

const features = [
  {
    title: "Smart Course Organization",
    description:
      "Intuitive interface for organizing courses with modules, announcements, and resources",
    icon: "📚",
    color: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  {
    title: "Assignment Management",
    description:
      "Students submit work, teachers grade and provide feedback - all in one place",
    icon: "📝",
    color: "bg-gradient-to-br from-purple-500 to-fuchsia-600",
  },
  {
    title: "Anonymous Feedback",
    description:
      "Students can provide honest course feedback without fear of bias",
    icon: "🗣️",
    color: "bg-gradient-to-br from-amber-500 to-orange-500",
  },
  {
    title: "Study Buddy Matching",
    description: "AI-powered matching with peers for collaborative learning",
    icon: "👥",
    color: "bg-gradient-to-br from-green-500 to-teal-500",
  },
  {
    title: "Advanced Moderation",
    description:
      "Comprehensive admin tools for course management and oversight",
    icon: "🛡️",
    color: "bg-gradient-to-br from-red-500 to-pink-600",
  },
  {
    title: "Real-time Collaboration",
    description: "Built-in tools for students and teachers to work together",
    icon: "💬",
    color: "bg-gradient-to-br from-cyan-400 to-blue-500",
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Head>
        <title>Coalight - Next Generation Learning Platform</title>
        <meta
          name="description"
          content="From Grit to Growth - The modern way to organize courses and learning"
        />
      </Head>

      {/* Navigation */}
      <nav
        className={`px-6 py-4 flex justify-between items-center sticky top-0 z-50 ${
          darkMode
            ? "bg-gray-900/80 backdrop-blur-md"
            : "bg-white/80 backdrop-blur-md"
        } border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}
      >
        <div className="flex items-center space-x-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              darkMode
                ? "bg-gradient-to-br from-amber-400 to-amber-600"
                : "bg-gradient-to-br from-amber-500 to-amber-700"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <span
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Coalight
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {darkMode ? (
              <svg
                className="w-5 h-5 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
          <button
            className={`px-4 py-2 rounded-full font-medium transition ${
              darkMode
                ? "bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 hover:shadow-lg hover:shadow-amber-500/30"
                : "bg-gradient-to-r from-amber-500 to-amber-700 text-white hover:shadow-lg hover:shadow-amber-500/30"
            }`}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            The{" "}
            <span
              className={`bg-clip-text text-transparent ${
                darkMode
                  ? "bg-gradient-to-r from-amber-400 to-amber-600"
                  : "bg-gradient-to-r from-amber-500 to-amber-700"
              }`}
            >
              Future
            </span>{" "}
            of Course Management
          </h1>
          <p
            className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            From <span className="font-semibold text-amber-500">Grit</span> to{" "}
            <span className="font-semibold text-amber-500">Growth</span> - A
            smarter way for universities, teachers, and students to organize
            learning.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto sm:max-w-xl">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`px-8 py-4 rounded-full font-bold text-lg transition ${
                darkMode
                  ? "bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 hover:shadow-lg hover:shadow-amber-500/30"
                  : "bg-gradient-to-r from-amber-500 to-amber-700 text-white hover:shadow-lg hover:shadow-amber-500/30"
              }`}
            >
              Request Demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`px-8 py-4 rounded-full border font-bold text-lg transition ${
                darkMode
                  ? "border-gray-700 hover:border-amber-400 hover:text-amber-400"
                  : "border-gray-300 hover:border-amber-500 hover:text-amber-600"
              }`}
            >
              How It Works
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Animated Feature Showcase */}
      <section
        className={`py-20 ${darkMode ? "bg-gray-800/30" : "bg-gray-100"}`}
      >
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-3xl md:text-4xl font-bold text-center mb-16 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Powerful{" "}
            <span
              className={`bg-clip-text text-transparent ${
                darkMode
                  ? "bg-gradient-to-r from-amber-400 to-amber-600"
                  : "bg-gradient-to-r from-amber-500 to-amber-700"
              }`}
            >
              Features
            </span>{" "}
            for Modern Education
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                } border`}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center text-2xl mb-4`}
                >
                  {feature.icon}
                </div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div
            className={`max-w-5xl mx-auto rounded-2xl overflow-hidden ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-xl`}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-10">
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Experience Coalight
                </h3>
                <p
                  className={`mb-6 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  See how Coalight transforms course management with our
                  interactive demo. Explore the interface designed for both
                  educators and students.
                </p>

                <div className="space-y-4">
                  {[
                    "Course Creation",
                    "Assignment Workflow",
                    "Feedback System",
                    "Study Buddy Matching",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          darkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 text-amber-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      <span
                        className={`font-medium ${
                          darkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="md:w-1/2 relative">
                <div
                  className={`absolute inset-0 ${
                    darkMode
                      ? "bg-gradient-to-br from-gray-800 to-gray-900"
                      : "bg-gradient-to-br from-gray-100 to-gray-200"
                  }`}
                >
                  {/* Animated UI elements */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                    className={`absolute top-1/4 left-1/4 w-16 h-16 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-white"
                    } shadow-md`}
                  />
                  <motion.div
                    animate={{
                      y: [0, 15, 0],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className={`absolute top-1/3 right-1/4 w-20 h-12 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-white"
                    } shadow-md`}
                  />
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className={`absolute bottom-1/4 left-1/3 w-24 h-8 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-white"
                    } shadow-md`}
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    }}
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full ${
                      darkMode ? "bg-gray-700" : "bg-white"
                    } shadow-xl flex items-center justify-center`}
                  >
                    <div
                      className={`w-24 h-24 rounded-full ${
                        darkMode
                          ? "bg-gradient-to-br from-amber-400 to-amber-600"
                          : "bg-gradient-to-br from-amber-500 to-amber-700"
                      } flex items-center justify-center text-white text-2xl font-bold`}
                    >
                      C
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`max-w-4xl mx-auto rounded-2xl p-10 text-center ${
              darkMode
                ? "bg-gray-900 border border-gray-800"
                : "bg-white border border-gray-200"
            } shadow-lg`}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Ready to Transform Your Institution?
            </h2>
            <p
              className={`text-xl mb-8 max-w-2xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join universities and schools worldwide who are revolutionizing
              education with Coalight.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`flex-grow px-5 py-3 rounded-full ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 focus:border-amber-400"
                      : "bg-gray-50 border-gray-300 focus:border-amber-500"
                  } border focus:outline-none`}
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-3 rounded-full font-bold transition ${
                    darkMode
                      ? "bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 hover:shadow-lg hover:shadow-amber-500/30"
                      : "bg-gradient-to-r from-amber-500 to-amber-700 text-white hover:shadow-lg hover:shadow-amber-500/30"
                  }`}
                >
                  Get Started
                </motion.button>
              </div>
              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 text-amber-500"
                  >
                    Thank you! We&apos;ll be in touch soon.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 ${
          darkMode
            ? "bg-gray-900 border-t border-gray-800"
            : "bg-white border-t border-gray-200"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  darkMode
                    ? "bg-gradient-to-br from-amber-400 to-amber-600"
                    : "bg-gradient-to-br from-amber-500 to-amber-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Coalight
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              <div>
                <h4
                  className={`text-sm font-semibold mb-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } uppercase`}
                >
                  Product
                </h4>
                <ul className="space-y-2">
                  {["Features", "Pricing", "Integrations", "Updates"].map(
                    (item, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className={`hover:text-amber-500 transition ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h4
                  className={`text-sm font-semibold mb-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } uppercase`}
                >
                  Resources
                </h4>
                <ul className="space-y-2">
                  {["Documentation", "Guides", "Blog", "Support"].map(
                    (item, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className={`hover:text-amber-500 transition ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h4
                  className={`text-sm font-semibold mb-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } uppercase`}
                >
                  Company
                </h4>
                <ul className="space-y-2">
                  {["About", "Careers", "Contact", "Legal"].map((item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className={`hover:text-amber-500 transition ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`mt-12 pt-8 border-t ${
              darkMode ? "border-gray-800" : "border-gray-200"
            } flex flex-col md:flex-row justify-between items-center`}
          >
            <div
              className={`text-sm ${
                darkMode ? "text-gray-500" : "text-gray-400"
              } mb-4 md:mb-0`}
            >
              © {new Date().getFullYear()} Coalight. All rights reserved. From
              Grit to Growth.
            </div>

            <div className="flex space-x-6">
              {["twitter", "github", "linkedin", "facebook"].map(
                (social, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`${
                      darkMode
                        ? "text-gray-400 hover:text-amber-500"
                        : "text-gray-500 hover:text-amber-600"
                    } transition`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/* Social icons would go here */}
                    </svg>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
