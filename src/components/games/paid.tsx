"use client";
import { useState } from "react";
import { useApp } from "../AppProvider";
import { BG_GAME, GAME } from "@/lib/content/paid";
import { Feedback, Meta, Score } from "./choice";

/** "You be the recruiter": pick the bullet that gets the call. */
export function BulletGame() {
  const { update } = useApp();
  const newFlips = () => GAME.map(() => Math.random() < 0.5);
  const [flips, setFlips] = useState(newFlips);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<"A" | "B" | null>(null);

  if (i >= GAME.length) {
    const pctv = Math.round((score / GAME.length) * 100);
    let msg: string, sub: string;
    if (pctv >= 88) { msg = "You have the recruiter eye."; sub = "You spotted what we spot. Now write your bullets the same way you just judged everyone else."; }
    else if (pctv >= 63) { msg = "Solid instincts."; sub = "You caught most of them. The ones you missed are the ones where the weak version sounded busy. Busy is not the same as effective."; }
    else { msg = "This is exactly why you played."; sub = "The pattern is simple and it never changes. The bullet with the number wins. Every single time. Go write yours that way."; }
    return <Score score={score} total={GAME.length} msg={msg} sub={sub}
      onAgain={() => { setI(0); setScore(0); setPicked(null); setFlips(newFlips()); }} />;
  }
  const g = GAME[i], flip = flips[i];
  const A = flip ? g.s : g.w, B = flip ? g.w : g.s;
  const strongIs = flip ? "A" : "B";
  const right = picked === strongIs;
  const cls = (which: "A" | "B") => "gopt" + (picked && strongIs === which ? " right" : "") + (picked === which && !right ? " wrong" : "");
  const pick = (c: "A" | "B") => { if (picked) return; setPicked(c); if (c === strongIs) setScore(score + 1); };
  return (
    <div className="game">
      <Meta unit="Round" i={i} total={GAME.length} score={score} />
      <h4>Which one gets the call?</h4>
      <p className="gsub">You have ten seconds and two hundred more resumes. Go with your gut.</p>
      <button className={cls("A")} disabled={!!picked} onClick={() => pick("A")}>{A}</button>
      <button className={cls("B")} disabled={!!picked} onClick={() => pick("B")}>{B}</button>
      {picked ? (
        <>
          <Feedback right={right} word={right ? "Correct." : "Not quite."} text={g.e} />
          <button className="btn btn-t" style={{ marginTop: 14 }} autoFocus onClick={() => {
            if (i === GAME.length - 1 && score >= 6) update((s) => ({ ...s, badges: { ...s.badges, eye: true } }));
            setPicked(null); setI(i + 1);
          }}>{i === GAME.length - 1 ? "See my score →" : "Next round →"}</button>
        </>
      ) : null}
    </div>
  );
}

/** "Clears or flags?" background check game. */
export function BgGame() {
  const { update } = useApp();
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<"clear" | "flag" | null>(null);

  if (i >= BG_GAME.length) {
    const msg = score >= 4 ? "You know where the landmines are." : "Worth another look. These end more offers than bad interviews.";
    return <Score score={score} total={BG_GAME.length} msg={msg}
      sub="Titles and dates get flagged. Unfinished degrees end offers. Everything else you can frame yourself."
      onAgain={() => { setI(0); setScore(0); setPicked(null); }} />;
  }
  const q = BG_GAME[i];
  const right = picked === q.v;
  const cls = (c: "clear" | "flag") => "gopt" + (picked && q.v === c ? " right" : "") + (picked === c && !right ? " wrong" : "");
  const pick = (c: "clear" | "flag") => { if (picked) return; setPicked(c); if (c === q.v) setScore(score + 1); };
  return (
    <div className="game">
      <Meta unit="Case" i={i} total={BG_GAME.length} score={score} />
      <h4>{q.q}</h4><div style={{ height: 8 }} />
      <button className={cls("clear")} disabled={!!picked} onClick={() => pick("clear")}>Clears fine</button>
      <button className={cls("flag")} disabled={!!picked} onClick={() => pick("flag")}>Gets flagged</button>
      {picked ? (
        <>
          <Feedback right={right} word={right ? "Right." : "Missed it."} text={q.e} />
          <button className="btn btn-t" style={{ marginTop: 14 }} autoFocus onClick={() => {
            if (i === BG_GAME.length - 1 && score >= 4) update((s) => ({ ...s, badges: { ...s.badges, vouched: true } }));
            setPicked(null); setI(i + 1);
          }}>{i === BG_GAME.length - 1 ? "See result →" : "Next case →"}</button>
        </>
      ) : null}
    </div>
  );
}
