"use client";
/**
 * Holds the progress blob (the prototype's `S`) and the app wide actions.
 * Member mode: loaded from Postgres by the server, saved back to the member's own
 * row (row level security), with a local copy so nothing is lost on patchy signal.
 * Demo mode: the beta preview, kept in this browser only.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { STEPS, stepIndex, type ViewId } from "@/lib/journey";
import { checkBadges, migrateJobs, normalize, pct, touchStreak, type AppState } from "@/lib/state";
import { demoState } from "@/lib/demo";
import type { Tier } from "@/config/site";
import type { AdConfig } from "./ui";
import { useToast } from "./Toast";
import { supabaseBrowser } from "@/lib/supabase/browser";

const KEY_DEMO = "hrbp_demo_v1";
const cacheKey = (uid: string) => "hrbp_cache_" + uid;

const Store = {
  get<T>(k: string, d: T): T {
    try { const v = localStorage.getItem(k); return v == null ? d : (JSON.parse(v) as T); } catch { return d; }
  },
  set(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } },
  del(k: string) { try { localStorage.removeItem(k); } catch { /* private mode */ } },
};

export type Ads = Record<1 | 2, AdConfig | null>;

export interface MemberInit {
  userId: string;
  profile: { name: string; email: string; industry: string; dream_role: string; goal: string };
  tier: Tier;
  data: Partial<AppState> | null;
  updatedAt: string | null;
  isAdmin: boolean;
}

export type SyncState = "saved" | "saving" | "offline";

interface Ctx {
  ready: boolean;
  S: AppState;
  demo: boolean;
  base: "/app" | "/preview";
  tier: Tier;
  isPremium: boolean;
  isAdmin: boolean;
  ads: Ads;
  sync: SyncState;
  update: (fn: (s: AppState) => AppState) => void;
  setTxt: (k: string, v: string | number) => void;
  toggleChk: (k: string) => void;
  badges: () => void;
  toast: (msg: string) => void;
  celebrate: () => void;
  go: (id: ViewId) => void;
  markDone: (id: string) => void;
  prevStep: (id: string) => void;
  signOut: () => void;
  exitDemo: () => void;
}

const AppCtx = createContext<Ctx | null>(null);

export function useApp(): Ctx {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp outside AppProvider");
  return c;
}

/** What gets stored: everything except the user, which comes from the profile table. */
function forStorage(S: AppState) {
  return { ...S, user: null };
}

export function AppProvider({ mode, member, ads, children }: { mode: "member" | "demo"; member?: MemberInit; ads: Ads; children: React.ReactNode }) {
  const router = useRouter();
  const { toast, celebrate } = useToast();
  const demo = mode === "demo";
  const base = demo ? "/preview" : "/app";
  const [ready, setReady] = useState(false);
  const [S, setS] = useState<AppState>(() => normalize(null));
  const [sync, setSync] = useState<SyncState>("saved");
  const dirty = useRef(false);
  const latest = useRef(S);
  useEffect(() => { latest.current = S; }, [S]);

  // Load once on the client.
  useEffect(() => {
    let s: AppState;
    if (demo) {
      const saved = normalize(Store.get<AppState | null>(KEY_DEMO, null));
      s = saved.user ? saved : demoState();
    } else {
      const m = member!;
      s = normalize(m.data);
      const cached = Store.get<{ S: AppState; at: string } | null>(cacheKey(m.userId), null);
      if (cached && (!m.updatedAt || cached.at > m.updatedAt)) {
        // This device has newer work that never reached the server (patchy signal). Keep it and send it up.
        s = normalize(cached.S);
        dirty.current = true;
      }
      s = {
        ...s,
        user: { name: m.profile.name, email: m.profile.email, industry: m.profile.industry, dream: m.profile.dream_role, goal: m.profile.goal, paid: true, tier: m.tier },
      };
    }
    s = touchStreak(migrateJobs(s));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one time hydration
    setS(s);
    setReady(true);
  }, [demo, member]);

  const push = useCallback(async () => {
    if (demo || !member || !dirty.current) return;
    const s = latest.current;
    dirty.current = false;
    setSync("saving");
    const { error } = await supabaseBrowser().from("progress").upsert({
      user_id: member.userId, data: forStorage(s), pct: pct(s), updated_at: new Date().toISOString(),
    });
    if (error) { dirty.current = true; setSync("offline"); return; }
    if (!dirty.current) setSync("saved");
  }, [demo, member]);

  // Save on every change: locally right away, to the account shortly after.
  useEffect(() => {
    if (!ready || !S.user) return;
    if (demo) {
      const t = setTimeout(() => Store.set(KEY_DEMO, S), 250);
      return () => clearTimeout(t);
    }
    Store.set(cacheKey(member!.userId), { S: forStorage(S), at: new Date().toISOString() });
    dirty.current = true;
    const t = setTimeout(() => { void push(); }, 700);
    return () => clearTimeout(t);
  }, [S, ready, demo, member, push]);

  // Retry when the signal comes back, and save before the tab goes away.
  useEffect(() => {
    if (demo) return;
    const onOnline = () => { void push(); };
    const onHide = () => { if (document.visibilityState === "hidden") void push(); };
    window.addEventListener("online", onOnline);
    document.addEventListener("visibilitychange", onHide);
    return () => { window.removeEventListener("online", onOnline); document.removeEventListener("visibilitychange", onHide); };
  }, [demo, push]);

  const update = useCallback((fn: (s: AppState) => AppState) => setS((s) => fn(s)), []);

  const badges = useCallback(() => {
    setS((s) => {
      const r = checkBadges(s);
      if (r.unlocked) setTimeout(() => toast("Badge unlocked. Check your dashboard."), 0);
      return r.state;
    });
  }, [toast]);

  const setTxt = useCallback((k: string, v: string | number) => setS((s) => ({ ...s, txt: { ...s.txt, [k]: v } })), []);

  const toggleChk = useCallback((k: string) => {
    setS((s) => {
      const r = checkBadges({ ...s, chk: { ...s.chk, [k]: !s.chk[k] } });
      if (r.unlocked) setTimeout(() => toast("Badge unlocked. Check your dashboard."), 0);
      return r.state;
    });
  }, [toast]);

  const go = useCallback((id: ViewId) => {
    router.push(id === "dashboard" ? base : base + "/" + id);
    window.scrollTo({ top: 0, behavior: "auto" });
    setS((s) => (s.user ? touchStreak(s) : s));
  }, [router, base]);

  const nextStep = useCallback((id: string) => {
    const i = stepIndex(id);
    if (i >= 0 && i < STEPS.length - 1) go(STEPS[i + 1].id); else go("dashboard");
  }, [go]);

  const prevStep = useCallback((id: string) => {
    const i = stepIndex(id);
    if (i > 0) go(STEPS[i - 1].id); else go("dashboard");
  }, [go]);

  const markDone = useCallback((id: string) => {
    if (S.done[id]) { nextStep(id); return; }
    setS((s) => {
      const r = checkBadges({ ...s, done: { ...s.done, [id]: true } });
      if (r.unlocked) setTimeout(() => toast("Badge unlocked. Check your dashboard."), 0);
      return r.state;
    });
    toast("Step complete. Nice work.");
    setTimeout(() => nextStep(id), 420);
  }, [S.done, nextStep, toast]);

  const exitDemo = useCallback(() => {
    if (!confirm("Leave the beta? Anything you changed while exploring is discarded.")) return;
    Store.del(KEY_DEMO);
    router.push("/signin");
  }, [router]);

  const signOut = useCallback(async () => {
    if (demo) { exitDemo(); return; }
    if (!confirm("Sign out? Your progress is saved to your account.")) return;
    await push();
    Store.del(cacheKey(member!.userId));
    navigator.serviceWorker?.controller?.postMessage("clear");
    await supabaseBrowser().auth.signOut();
    router.replace("/signin");
    router.refresh();
  }, [demo, exitDemo, push, member, router]);

  const tier: Tier = demo ? "premium" : member!.tier;
  const value = useMemo<Ctx>(() => ({
    ready, S, demo, base, tier, isPremium: tier === "premium", isAdmin: !!member?.isAdmin, ads, sync,
    update, setTxt, toggleChk, badges, toast, celebrate, go, markDone, prevStep, signOut: () => { void signOut(); }, exitDemo,
  }), [ready, S, demo, base, tier, member, ads, sync, update, setTxt, toggleChk, badges, toast, celebrate, go, markDone, prevStep, signOut, exitDemo]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
