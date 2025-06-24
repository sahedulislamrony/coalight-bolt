import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Colors, Time } from "@/types/watch";

export default function Watch() {
  const [time, setTime] = useState<Time>({
    hours: "--",
    minutes: "--",
    seconds: "--",
    day: "---",
    date: "--",
    month: "---",
    ampm: "--",
  });
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (now.getSeconds() === 0) {
      setColorIndex((prev) => (prev + 1) % colorSchemes.length);
    }

    setTime({
      hours: (hours % 12 || 12).toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: now.getSeconds().toString().padStart(2, "0"),
      day: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][now.getDay()],
      date: now.getDate().toString().padStart(2, "0"),
      month: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ][now.getMonth()],
      ampm: hours >= 12 ? "PM" : "AM",
    });
  };

  const colors = colorSchemes[colorIndex];

  return (
    <WatchRoot>
      {/* Background gradient */}
      <Background colors={colors} />

      <WatchBody>
        <MetallicFrame colors={colors} />
        <Reflaction />
        <TimeDisplay>
          <div className="flex justify-between items-center">
            <DateSection time={time} colors={colors} />
            <MainTime time={time} colors={colors} />
            <AMPMAndSeconds time={time} colors={colors} />
          </div>
          <ProgressBar time={time} colors={colors} />
        </TimeDisplay>
      </WatchBody>
    </WatchRoot>
  );
}

const WatchRoot = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-60 h-20 select-none"
    >
      {children}
    </motion.div>
  );
};

const WatchBody = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div className="relative bg-gray-900/70 rounded-md p-3 w-full h-full shadow-xl border border-gray-700/50 overflow-hidden backdrop-blur-sm">
      {children}
    </motion.div>
  );
};

const TimeDisplay = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col justify-between relative z-10">
      {children}
    </div>
  );
};

const DateSection = ({ time, colors }: { time: Time; colors: Colors }) => {
  return (
    <div className="flex flex-col">
      <span
        style={{ color: colors.primary }}
        className="text-xs font-medium opacity-90 drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]"
      >
        {time.day}
      </span>
      <span className="text-xs font-medium text-gray-300 drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]">
        {time.month} {time.date}
      </span>
    </div>
  );
};

const MainTime = ({ time, colors }: { time: Time; colors: Colors }) => {
  return (
    <div className="font-mono text-3xl font-light tracking-tighter text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
      {time.hours}:
      <span
        style={{ color: colors.primary }}
        className="drop-shadow-[0_0_8px_currentColor]"
      >
        {time.minutes}
      </span>
    </div>
  );
};

const AMPMAndSeconds = ({ time, colors }: { time: Time; colors: Colors }) => {
  return (
    <div className="flex flex-col items-end">
      <span className="text-xs text-gray-400 drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]">
        {time.ampm}
      </span>
      <span
        style={{ color: colors.primary }}
        className="font-mono text-xs opacity-80 drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]"
      >
        {time.seconds}
      </span>
    </div>
  );
};

const ProgressBar = ({ time, colors }: { time: Time; colors: Colors }) => {
  return (
    <div className="flex gap-2">
      <motion.div
        animate={{ width: `${(Number(time.seconds) / 60) * 100}%` }}
        transition={{ duration: 0.5 }}
        className="h-1 rounded-full shadow-lg"
        style={{
          backgroundColor: colors.primary,
          opacity: 0.6,
          boxShadow: `0 0 4px ${colors.primary}`,
        }}
      />
    </div>
  );
};

const Reflaction = () => {
  return (
    <div className="absolute inset-0 rounded-md pointer-events-none overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full" />
    </div>
  );
};

const MetallicFrame = ({ colors }: { colors: Colors }) => {
  return (
    <div
      className="absolute inset-0 rounded-md pointer-events-none"
      style={{
        borderTop: `1px solid ${colors.metallic.top}`,
        borderLeft: `1px solid ${colors.metallic.left}`,
        borderRight: `1px solid ${colors.metallic.right}`,
        borderBottom: `1px solid ${colors.metallic.bottom}`,
      }}
    />
  );
};

const Background = ({ colors }: { colors: Colors }) => {
  return (
    <div
      className={`absolute inset-0 rounded-md bg-gradient-to-br ${colors.bgGradient}`}
    >
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:1rem_1rem]" />
    </div>
  );
};

const colorSchemes: Colors[] = [
  {
    primary: "#06b6d4", // cyan
    bgGradient: "from-gray-900 via-sky-900 to-gray-900",
    metallic: {
      top: "rgba(6, 182, 212, 0.5)",
      left: "rgba(34, 211, 238, 0.4)",
      right: "rgba(8, 145, 178, 0.5)",
      bottom: "rgba(14, 116, 144, 0.5)",
    },
  },
  {
    primary: "#10b981", // emerald
    bgGradient: "from-gray-900 via-emerald-900 to-gray-900",
    metallic: {
      top: "rgba(16, 185, 129, 0.5)",
      left: "rgba(52, 211, 153, 0.4)",
      right: "rgba(5, 150, 105, 0.5)",
      bottom: "rgba(6, 95, 70, 0.5)",
    },
  },
  {
    primary: "#f59e0b", // amber
    bgGradient: "from-gray-900 via-amber-900 to-gray-900",
    metallic: {
      top: "rgba(245, 158, 11, 0.5)",
      left: "rgba(251, 191, 36, 0.4)",
      right: "rgba(217, 119, 6, 0.5)",
      bottom: "rgba(180, 83, 9, 0.5)",
    },
  },
  {
    primary: "#8b5cf6", // violet
    bgGradient: "from-gray-900 via-violet-900 to-gray-900",
    metallic: {
      top: "rgba(139, 92, 246, 0.5)",
      left: "rgba(167, 139, 250, 0.4)",
      right: "rgba(124, 58, 237, 0.5)",
      bottom: "rgba(109, 40, 217, 0.5)",
    },
  },
  {
    primary: "#ec4899", // rose
    bgGradient: "from-gray-900 via-rose-900 to-gray-900",
    metallic: {
      top: "rgba(236, 72, 153, 0.5)",
      left: "rgba(244, 114, 182, 0.4)",
      right: "rgba(219, 39, 119, 0.5)",
      bottom: "rgba(190, 24, 93, 0.5)",
    },
  },
];
