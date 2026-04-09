"use client";

import { useEffect } from "react";

export function CSSStudioBridge() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    if (
      window.location.pathname.startsWith("/admin") ||
      window.location.pathname.startsWith("/api")
    ) {
      return;
    }

    let disposed = false;

    void import("cssstudio").then(({ startStudio }) => {
      if (!disposed) {
        startStudio();
      }
    });

    return () => {
      disposed = true;
    };
  }, []);

  return null;
}
