import React from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";

export interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Global Application Providers
 * Wraps tree in smooth scrolling, layout, and any future contexts.
 */
export function Providers({ children }: ProvidersProps) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
