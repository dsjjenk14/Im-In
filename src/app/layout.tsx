import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ToastProvider } from "@/components/Toast";
import { Pwa } from "@/components/Pwa";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "The HR Blueprint · Your Career Platform",
  description:
    "The full platform that walks you from wherever you are now into a real HR, recruiting, or talent acquisition job.",
  applicationName: "The HR Blueprint",
  appleWebApp: { capable: true, title: "HR Blueprint", statusBarStyle: "default" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
};

const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export const viewport: Viewport = {
  themeColor: "#0F2744",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <ToastProvider>{children}</ToastProvider>
        <Pwa />
        {PLAUSIBLE ? <Script defer data-domain={PLAUSIBLE} src="https://plausible.io/js/script.js" strategy="afterInteractive" /> : null}
      </body>
    </html>
  );
}
