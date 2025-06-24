/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  motion,
  //   useMotionTemplate,
  useMotionValue,
  animate,
  useTransform,
} from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Types for QuantumParticle props
interface QuantumParticleProps {
  mouseX: { get: () => number };
  mouseY: { get: () => number };
  color: string;
}

// Types for HolographicText props
interface HolographicTextProps {
  children: React.ReactNode;
}

// Dynamically import the WebGL wormhole with TypeScript types
const Wormhole = dynamic(() => import("@/components/Wormhole"), {
  ssr: false,
  loading: () => null,
});

const QuantumParticle: React.FC<QuantumParticleProps> = ({
  mouseX,
  mouseY,
  color,
}) => {
  const x = useMotionValue(Math.random() * 100);
  const y = useMotionValue(Math.random() * 100);
  const size = useMotionValue(Math.random() * 4 + 1);
  const opacity = useMotionValue(Math.random() * 0.6 + 0.1);

  // Use useTransform to convert x/y to percent strings for style
  const left = useTransform(x, (v) => `${v}%`);
  const top = useTransform(y, (v) => `${v}%`);

  const distance = useTransform(
    [mouseX as any, mouseY as any, x, y],
    (values: number[]) => {
      const [mx, my, px, py] = values;
      return Math.sqrt((mx - px) ** 2 + (my - py) ** 2);
    }
  );

  //   const scale = useTransform(distance, [0, 150], [3, 0.5], { clamp: true });
  const glow = useTransform(distance, [0, 150], [1, 0], { clamp: true });
  const boxShadow = useTransform(glow, (g) => `0 0 ${g * 15}px currentColor`);

  useEffect(() => {
    const moveParticle = () => {
      animate(x, Math.random() * 100, {
        duration: Math.random() * 15 + 15,
        onComplete: moveParticle,
      });
      animate(y, Math.random() * 100, {
        duration: Math.random() * 15 + 15,
      });
    };
    moveParticle();

    return () => {
      // Cleanup animations if component unmounts
      x.stop();
      y.stop();
    };
  }, [x, y]);

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${color}`}
      style={{
        left,
        top,
        width: size,
        height: size,
        opacity,
        boxShadow: boxShadow,
      }}
    />
  );
};

const HolographicText: React.FC<HolographicTextProps> = ({ children }) => {
  return (
    <motion.div
      className="relative"
      animate={{
        textShadow: [
          "0 0 5px rgba(56, 182, 255, 0.3)",
          "0 0 20px rgba(56, 182, 255, 0.8)",
          "0 0 5px rgba(56, 182, 255, 0.3)",
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-sky-500 opacity-10 blur-md -z-10"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
};

const NotFoundPage: React.FC = () => {
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  const [showWormhole, setShowWormhole] = useState(false);

  const radius = useMotionValue(0);
  const backgroundOpacity = useMotionValue(0.1);
  //   const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(56, 182, 255, 0.4), transparent 80%)`;

  useEffect(() => {
    // Quantum particles
    setParticles([
      ...Array.from({ length: 30 }, (_, i) => (
        <QuantumParticle
          key={`sky-${i}`}
          mouseX={mouseX}
          mouseY={mouseY}
          color="bg-sky-400"
        />
      )),
      ...Array.from({ length: 10 }, (_, i) => (
        <QuantumParticle
          key={`pink-${i}`}
          mouseX={mouseX}
          mouseY={mouseY}
          color="bg-pink-400"
        />
      )),
    ]);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      radius.set(Math.min(e.clientX * 0.4, 600));
      animate(backgroundOpacity, 0.4, { duration: 0.4 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // Cleanup motion values
      mouseX.destroy();
      mouseY.destroy();
      radius.destroy();
      backgroundOpacity.destroy();
    };
  }, [mouseX, mouseY, radius, backgroundOpacity]);

  return (
    <>
      <Head>
        <title>404 | Quantum Displacement Detected</title>
        <meta
          name="description"
          content="Warp signature not found in current spacetime continuum"
        />
      </Head>

      <div
        ref={containerRef}
        className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-white relative overflow-hidden"
      >
        {/* WebGL Wormhole Portal */}
        {showWormhole && (
          <div className="absolute inset-0 z-0">
            <Wormhole mouseX={mouseX} mouseY={mouseY} />
          </div>
        )}

        {/* Quantum Energy Field */}
        <div className="absolute inset-0 overflow-hidden z-10">{particles}</div>

        {/* Main Interface */}
        <div className="max-w-3xl w-full relative z-20 px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Holographic Title */}
            <motion.div
              className="mb-12"
              onHoverStart={() => setShowWormhole(true)}
              onHoverEnd={() => setShowWormhole(false)}
            >
              <HolographicText>
                <motion.h1
                  className="text-8xl md:text-9xl font-bold text-sky-400 mb-4"
                  initial={{ letterSpacing: "0.5em" }}
                  animate={{ letterSpacing: "0.2em" }}
                  transition={{
                    duration: 2,
                    ease: "backOut",
                  }}
                >
                  404
                </motion.h1>
              </HolographicText>

              <motion.h2
                className="text-3xl md:text-4xl font-light text-gray-300 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <span className="text-sky-400 font-medium">
                  Quantum_Anomaly
                </span>{" "}
                Detected
              </motion.h2>
            </motion.div>

            {/* Diagnostic Console */}
            <motion.div
              className="bg-black bg-opacity-60 border border-gray-800 rounded-xl p-6 mb-10 text-left max-w-2xl mx-auto font-mono text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div className="flex items-center gap-2 text-sky-400 mb-4">
                <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
                <span>SYSTEM DIAGNOSTICS</span>
              </div>

              <div className="space-y-2 text-gray-300">
                <p>
                  &gt; ERROR:{" "}
                  <span className="text-pink-400">
                    Temporal coordinates invalid
                  </span>
                </p>
                <p>
                  &gt; REASON:{" "}
                  <span className="text-amber-400">
                    Page does not exist in this timeline
                  </span>
                </p>
                <p>
                  &gt; SUGGESTED ACTION:{" "}
                  <span className="text-sky-400">
                    Navigate to known quantum node
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Quantum Navigation */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              <Link href="/" passHref legacyBehavior>
                <motion.a
                  className="px-8 py-4 bg-sky-900 bg-opacity-60 hover:bg-opacity-100 border border-sky-700 rounded-xl font-medium flex items-center gap-3 group relative overflow-hidden transition-all duration-500 cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(56, 182, 255, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">
                    <span className="block text-sky-300 group-hover:text-white transition-colors">
                      Activate
                    </span>
                    <span className="block text-white text-lg">
                      Home Portal
                    </span>
                  </span>
                  <motion.div
                    className="relative z-10 w-6 h-6"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="absolute inset-0 border-2 border-sky-400 border-t-transparent rounded-full" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-[url('/images/holo-grid.png')] bg-cover opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.a>
              </Link>

              <motion.button
                onClick={() => router.back()}
                className="px-8 py-4 bg-gray-900 bg-opacity-60 hover:bg-opacity-100 border border-gray-700 rounded-xl font-medium flex items-center gap-3 group relative overflow-hidden transition-all duration-500"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(56, 182, 255, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  <span className="block text-gray-300 group-hover:text-white transition-colors">
                    Engage
                  </span>
                  <span className="block text-white text-lg">
                    Temporal Retreat
                  </span>
                </span>
                <motion.div
                  className="relative z-10"
                  animate={{
                    x: [-3, 3, -3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  ←•
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Quantum Signature */}
            <motion.div
              className="mt-16 text-xs text-gray-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <p>
                QUANTUM SIGNATURE:{" "}
                {Math.random().toString(36).slice(2, 10).toUpperCase()}-
                {Math.random().toString(36).slice(2, 6).toUpperCase()}
              </p>
              <p className="mt-1">
                SPACETIME COORDINATES: {new Date().toISOString()}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Wormhole Activation Prompt */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 text-center text-xs text-gray-400 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2 }}
        >
          [ Hover over anomaly to activate quantum bridge ]
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;
