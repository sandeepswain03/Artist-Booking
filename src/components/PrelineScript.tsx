"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IStaticMethods } from "preline/preline";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods | undefined;
  }
}

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    const loadPreline = async () => {
      try {
        // Dynamically import preline script
        await import("preline/preline");

        // Ensure HSStaticMethods is available before calling autoInit
        if (window.HSStaticMethods) {
          window.HSStaticMethods.autoInit();
        } else {
          console.error("HSStaticMethods is not available on window object.");
        }
      } catch (error) {
        console.error("Failed to load Preline script:", error);
      }
    };

    loadPreline();
  }, [path]);

  return null;
}
