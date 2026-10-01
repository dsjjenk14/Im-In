"use client";
import { createContext, useCallback, useContext, useRef, useState } from "react";

interface ToastCtx { toast: (msg: string) => void; celebrate: () => void }
const Ctx = createContext<ToastCtx | null>(null);

export function useToast(): ToastCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useToast outside ToastProvider");
  return c;
}

/** The prototype's toast and confetti, available on every page. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState("");
  const [up, setUp] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const toast = useCallback((m: string) => {
    setMsg(m); setUp(true);
    clearTimeout(t.current);
    t.current = setTimeout(() => setUp(false), 3400);
  }, []);

  const celebrate = useCallback(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cols = ["#8EDBC2", "#38B2AC", "#0F2744", "#C7EFE1", "#5FC4A4"];
    for (let i = 0; i < 70; i++) {
      setTimeout(() => {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = cols[i % cols.length];
        c.style.transform = "rotate(" + Math.random() * 360 + "deg)";
        document.body.appendChild(c);
        const dur = 2200 + Math.random() * 1400;
        c.animate(
          [{ transform: "translateY(0) rotate(0deg)", opacity: 1 },
            { transform: "translateY(105vh) rotate(" + (Math.random() * 720 - 360) + "deg)", opacity: 0 }],
          { duration: dur, easing: "cubic-bezier(.25,.6,.4,1)" },
        );
        setTimeout(() => c.remove(), dur);
      }, i * 22);
    }
  }, []);

  return (
    <Ctx.Provider value={{ toast, celebrate }}>
      {children}
      <div id="toast" className={up ? "up" : ""} role="status" aria-live="polite">{msg}</div>
    </Ctx.Provider>
  );
}
