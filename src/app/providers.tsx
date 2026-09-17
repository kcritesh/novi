"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";

import { SmoothScroll } from "@/components/motion/smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: "!rounded-card !border !border-hairline !bg-surface !font-sans !text-ink !shadow-lift",
            description: "!text-muted",
          },
        }}
      />
    </MotionConfig>
  );
}
