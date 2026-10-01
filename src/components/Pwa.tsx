"use client";
import { useEffect } from "react";

/** Registers the service worker in production so the app installs and keeps working on patchy signal. */
export function Pwa() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {});
  }, []);
  return null;
}
