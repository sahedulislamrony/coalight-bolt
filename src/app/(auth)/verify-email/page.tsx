"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import OtpVerification from "./VerifyEmail";

export default function VerifyEmailPage() {
  const isVerified = useAppSelector((state) => state.auth.isVerified);
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isVerified) return;

    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isVerified]);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/dashboard");
    }
  }, [countdown, router]);

  if (isVerified) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="w-full max-w-lg space-y-8 text-center">
          <div className="relative inline-block">
            <CheckCircle2 className="h-20 w-20 text-blue-500 animate-[softBounce_2s_ease-in-out_infinite]" />
            <div className="absolute inset-0 rounded-full bg-blue-100/50 animate-ping opacity-75 [animation-duration:2s]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-800">
              Verification Complete
            </h1>
            <p className="text-slate-500">
              Your email has been successfully verified
            </p>
          </div>

          <div className="w-full max-w-xs mx-auto space-y-4">
            <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-blue-500 animate-[progress_5s_linear_forwards]"
                style={{
                  animationName: "progress",
                  animationDuration: "5s",
                  animationTimingFunction: "linear",
                  animationFillMode: "forwards",
                }}
              />
            </div>

            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Redirecting automatically</span>
              <span className="font-medium text-slate-700">
                {countdown} second{countdown !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Continue to Dashboard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <style jsx>{`
          @keyframes progress {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
          @keyframes softBounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }
        `}</style>
      </div>
    );
  }

  return <OtpVerification />;
}
