import React from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { MotionProvider } from "@/context/MotionContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Global Application Providers
 * Wraps tree in motion controls, smooth scrolling, and layout contexts.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <MotionProvider>
      <SmoothScroll>{children}</SmoothScroll>
    </MotionProvider>
  );
}

