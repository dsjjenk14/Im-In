import Link from "next/link";
import { requireAdmin } from "./guard";
import { createCode, grantTier, replyMessage, revokeAccess, saveAd, saveCoaching, toggleReplied } from "./actions";
import { createAdmin } from "@/lib/supabase/server";
import { STEPS } from "@/lib/journey";

export const metadata = { title: "Admin · The HR Blueprint" };

const TABS = [["overview", "Numbers"], ["members", "Members"], ["messages", "Messages"], ["ads", "Ad slots"], ["codes", "Access codes"]] as const;
type Tab = (typeof TABS)[number][0];

const money = (c: number) => "$" + (c / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });
/** Purchases from the last n days. */
function withinDays<T extends { purchased_at: string }>(list: T[], n: number): T[] {
  const since = Date.now() - n * 864e5;
  return list.filter((e) => new Date(e.purchased_at).getTime() >= since);
}
const day = (s: string | null) => (s ? new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "");

export default async function Admin({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const me = await requireAdmin();
  const q = await searchParams;
  const tab = (TABS.some((t) => t[0] === q.tab) ? q.tab : "overview") as Tab;

  return (
    <div style={{ minHeight: "100vh", background: "var(--fog)" }}>
      <header style={{ background: "var(--navy)", color: "#fff", padding: "16px 24px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div className="brandmark" style={{ marginBottom: 0 }}><div className="bm-dot">HR</div><div className="bm-txt">Admin</div></div>
        <nav style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1 }} aria-label="Admin sections">
          {TABS.map(([id, label]) => (
            <Link key={id} href={"/admin?tab=" + id} className="btn btn-sm" aria-current={tab === id ? "page" : undefined}
              style={{ background: tab === id ? "var(--teal)" : "rgba(255,255,255,.08)", color: "#fff" }}>{label}</Link>
          ))}
        </nav>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>{me.email}</span>
        <Link href="/app" className="btn btn-g btn-sm">Back to the app</Link>
      </header>
      <main id="view" style={{ maxWidth: 1100 }}>
        {tab === "overview" ? <Overview /> : null}
        {tab === "members" ? <Members /> : null}
        {tab === "messages" ? <Messages sent={q.sent} /> : null}
        {tab === "ads" ? <Ads /> : null}
        {tab === "codes" ? <Codes created={q.new} /> : null}
      </main>
    </div>
  );
}

async function Overview() {
  const db = createAdmin();
  const [{ count: signups }, { data: ents }, { data: prog }] = await Promise.all([
    db.from("profiles").select("id", { count: "exact", head: true }),
    db.from("entitlements").select("user_id, tier, source, amount_cents, access, purchased_at"),
    db.from("progress").select("pct, data"),
  ]);
  const paid = (ents ?? []).filter((e) => e.source === "stripe");
  const revenue = paid.reduce((a, e) => a + (e.amount_cents ?? 0), 0);
  const premium = new Set((ents ?? []).filter((e) => e.tier === "premium" && e.access && e.user_id).map((e) => e.user_id)).size;
  const rows = prog ?? [];
  const avg = rows.length ? Math.round(rows.reduce((a, r) => a + (r.pct ?? 0), 0) / rows.length) : 0;
  const finished = rows.filter((r) => (r.pct ?? 0) >= 100).length;
  const last30 = withinDays(paid, 30);

  return (
    <>
      <div className="stat-grid" style={{ marginBottom: 22 }}>
        <div className="stat"><b>{signups ?? 0}</b><span>Accounts</span></div>
        <div className="stat"><b>{paid.length}</b><span>Purchases</span></div>
        <div className="stat"><b>{money(revenue)}</b><span>Revenue, all time</span></div>
        <div className="stat"><b>{money(last30.reduce((a, e) => a + e.amount_cents, 0))}</b><span>Revenue, last 30 days</span></div>
        <div className="stat"><b>{premium}</b><span>Premium members</span></div>
        <div className="stat"><b>{avg}%</b><span>Average journey complete</span></div>
        <div className="stat"><b>{finished}</b><span>Finished all 21 steps</span></div>
      </div>
      <div className="card">
        <h3 className="sec">Completion by step</h3>
        <p className="sub">Share of members who marked each step complete.</p>
        <table className="tbl"><thead><tr><th>Step</th><th>Completed</th><th></th></tr></thead><tbody>
          {STEPS.map((s, i) => {
            const n = rows.filter((r) => (r.data as { done?: Record<string, unknown> })?.done?.[s.id]).length;
            const p = rows.length ? Math.round((n / rows.length) * 100) : 0;
            return (
              <tr key={s.id}><td>{i + 1}. {s.title}</td><td>{n} ({p}%)</td>
                <td style={{ width: "40%" }}><div style={{ height: 7, background: "var(--fog-2)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: p + "%", background: "linear-gradient(90deg,var(--mint),var(--teal))" }} /></div></td></tr>
            );
          })}
        </tbody></table>
      </div>
    </>
  );
}

async function Members() {
  const db = createAdmin();
  const [{ data: profiles }, { data: ents }, { data: prog }, { data: coach }] = await Promise.all([
    db.from("profiles").select("id, name, email, industry, dream_role, goal, created_at").order("created_at", { ascending: false }).limit(1000),
    db.from("entitlements").select("user_id, tier, access"),
    db.from("progress").select("user_id, pct, updated_at, data"),
    db.from("coaching").select("user_id, kickoff_booked, session_notes, goal"),
  ]);
  const tierOf = (id: string) => {
    const e = (ents ?? []).filter((x) => x.user_id === id && x.access);
    return e.some((x) => x.tier === "premium") ? "premium" : e.length ? "basic" : "none";
  };
  const list = (profiles ?? []).map((p) => ({ ...p, tier: tierOf(p.id), prog: (prog ?? []).find((x) => x.user_id === p.id), coach: (coach ?? []).find((x) => x.user_id === p.id) }));
  const premium = list.filter((m) => m.tier === "premium");

  return (
    <>
      <div className="card">
        <h3 className="sec">Premium members</h3>
        <p className="sub">Your 90 day people. Track the kickoff and keep your session notes here.</p>
        {!premium.length ? <div className="empty"><b>No premium members yet</b><p>They show up here as soon as they pay.</p></div> : premium.map((m) => {
          const txt = ((m.prog?.data as { txt?: Record<string, string> })?.txt) ?? {};
          return (
            <div className="sbank" key={m.id}>
              <div className="sh"><span className="prem-badge">Premium</span><b>{m.name || m.email}</b><span style={{ fontSize: 12.5, color: "var(--slate)" }}>{m.email} · {m.prog?.pct ?? 0}% · joined {day(m.created_at)}</span></div>
              {txt.premGoal ? <p className="body" style={{ fontSize: 14 }}><strong>Their goal:</strong> {txt.premGoal}</p> : null}
              <form action={saveCoaching}>
                <input type="hidden" name="user_id" value={m.id} />
                <label className="cbx" style={{ marginBottom: 12 }}><input type="checkbox" name="kickoff_booked" defaultChecked={!!m.coach?.kickoff_booked} /> Kickoff call booked</label>
                <div className="field"><label>Goal we agreed on</label><input className="inp" name="goal" defaultValue={m.coach?.goal ?? ""} /></div>
                <div className="field"><label>My session notes</label><textarea className="inp" name="session_notes" rows={4} defaultValue={m.coach?.session_notes ?? ""} /></div>
                <button className="btn btn-t btn-sm">Save</button>
              </form>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h3 className="sec">Everyone</h3>
        <p className="sub">{list.length} accounts.</p>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl"><thead><tr><th>Member</th><th>Tier</th><th>Progress</th><th>Last active</th><th>Change access</th></tr></thead><tbody>
            {list.map((m) => (
              <tr key={m.id}>
                <td>{m.name || "(no name)"}<div style={{ fontWeight: 400, fontSize: 12.5, color: "var(--slate)" }}>{m.email}<br />{m.industry} → {m.dream_role}</div></td>
                <td><span className={"pill " + (m.tier === "premium" ? "mint" : m.tier === "basic" ? "navy" : "coral")}>{m.tier}</span></td>
                <td>{m.prog?.pct ?? 0}%</td>
                <td>{day(m.prog?.updated_at ?? null)}</td>
                <td>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {m.tier !== "premium" ? <form action={grantTier}><input type="hidden" name="user_id" value={m.id} /><input type="hidden" name="tier" value="premium" /><button className="btn btn-t btn-sm">Make premium</button></form> : null}
                    {m.tier === "none" ? <form action={grantTier}><input type="hidden" name="user_id" value={m.id} /><input type="hidden" name="tier" value="basic" /><button className="btn btn-g btn-sm">Give basic</button></form> : null}
                    {m.tier !== "none" ? <form action={revokeAccess}><input type="hidden" name="user_id" value={m.id} /><button className="btn btn-g btn-sm">Remove access</button></form> : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody></table>
        </div>
      </div>
    </>
  );
}

async function Messages({ sent }: { sent?: string }) {
  const { data } = await createAdmin().from("messages").select("*").order("created_at", { ascending: false }).limit(200);
  const list = data ?? [];
  return (
    <div className="card">
      <h3 className="sec">Messages</h3>
      <p className="sub">{list.filter((m) => !m.replied).length} waiting on you. Replies are emailed to the member and saved here.</p>
      {sent === "0" ? <div className="note n-mistake"><p>The reply was saved but the email did not send. Check the Resend settings.</p></div> : null}
      {!list.length ? <div className="empty"><b>No messages yet</b><p>The contact form and premium messages land here.</p></div> : list.map((m) => (
        <div className="sbank" key={m.id} style={m.replied ? { opacity: 0.75 } : undefined}>
          <div className="sh" style={{ flexWrap: "wrap" }}>
            {m.is_premium ? <span className="prem-badge">Premium</span> : null}
            <b>{m.subject}</b>
            <span style={{ fontSize: 12.5, color: "var(--slate)" }}>{m.name} · {m.email} · {day(m.created_at)}</span>
            <span className={"pill " + (m.replied ? "mint" : "coral")}>{m.replied ? "Replied" : "Needs reply"}</span>
          </div>
          <p className="body" style={{ whiteSpace: "pre-wrap", color: "var(--navy)" }}>{m.body}</p>
          {m.reply_body ? <div className="note n-rec"><div className="nl">Your reply · {day(m.replied_at)}</div><p style={{ whiteSpace: "pre-wrap" }}>{m.reply_body}</p></div> : null}
          <form action={replyMessage}>
            <input type="hidden" name="id" value={m.id} />
            <div className="field"><label>{m.replied ? "Send another reply" : "Your reply"}</label><textarea className="inp" name="reply" rows={4} required /></div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className="btn btn-t btn-sm">Send reply by email</button>
              <button className="btn btn-g btn-sm" formAction={toggleReplied} name="replied" value={m.replied ? "false" : "true"} formNoValidate>{m.replied ? "Mark as needing reply" : "Mark as handled"}</button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}

async function Ads() {
  const { data } = await createAdmin().from("ads").select("*").order("slot");
  return (
    <div className="grid2">
      {(data ?? []).map((a) => (
        <div className="card" key={a.slot}>
          <h3 className="sec">Slot {a.slot}</h3>
          <p className="sub">{a.slot === 1 ? "Shows on the dashboard." : "Shows on Application Strategy."} Labeled Sponsored. Turn it off and the placeholder shows instead.</p>
          <form action={saveAd}>
            <input type="hidden" name="slot" value={a.slot} />
            <div className="field"><label>Headline</label><input className="inp" name="headline" defaultValue={a.headline} /></div>
            <div className="field"><label>Body</label><textarea className="inp" name="text" rows={3} defaultValue={a.text} /></div>
            <div className="row2">
              <div className="field"><label>Button text</label><input className="inp" name="cta" defaultValue={a.cta} placeholder="Learn more" /></div>
              <div className="field"><label>Link</label><input className="inp" name="url" defaultValue={a.url} placeholder="https://" /></div>
            </div>
            <label className="cbx" style={{ margin: "4px 0 16px" }}><input type="checkbox" name="active" defaultChecked={a.active} /> Live</label>
            <button className="btn btn-t btn-sm">Save slot {a.slot}</button>
          </form>
        </div>
      ))}
    </div>
  );
}

async function Codes({ created }: { created?: string }) {
  const { data } = await createAdmin().from("access_codes").select("*").order("created_at", { ascending: false }).limit(100);
  return (
    <>
      <div className="card">
        <h3 className="sec">Make an access code</h3>
        <p className="sub">For a buyer whose redirect failed, a comp, or a giveaway. Each code works once.</p>
        {created ? <div className="tpl"><div className="tl">New code</div><pre style={{ fontSize: 20, fontFamily: "var(--mono)" }}>{created}</pre></div> : null}
        <form action={createCode} style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div className="field" style={{ marginBottom: 0 }}><label>Tier</label>
            <select className="inp" name="tier" defaultValue="basic"><option value="basic">The Blueprint</option><option value="premium">Blueprint + 90 Days</option></select></div>
          <div className="field" style={{ marginBottom: 0, flex: 1, minWidth: 200 }}><label>Note (who it is for)</label><input className="inp" name="note" /></div>
          <button className="btn btn-t">Create code</button>
        </form>
      </div>
      <div className="card">
        <h3 className="sec">Recent codes</h3>
        <table className="tbl"><thead><tr><th>Code</th><th>Tier</th><th>Note</th><th>Status</th></tr></thead><tbody>
          {(data ?? []).map((c) => (
            <tr key={c.code}><td style={{ fontFamily: "var(--mono)" }}>{c.code}</td><td>{c.tier}</td><td>{c.note}</td>
              <td>{c.redeemed_at ? "Used " + day(c.redeemed_at) : "Unused"}</td></tr>
          ))}
        </tbody></table>
      </div>
    </>
  );
}
