"use client";
import { useState } from "react";
import { shuffle } from "@/lib/state";
import type { ChoiceQ } from "@/lib/content/act1";

export function Score({ score, total, msg, sub, onAgain }: { score: number; total: number; msg: string; sub: string; onAgain: () => void }) {
  return (
    <div className="game"><div className="gscore">
      <b>{score}/{total}</b>
      <div className="gl"><strong style={{ color: "#fff", fontFamily: "var(--dsp)", fontSize: 18, display: "block", marginBottom: 8 }}>{msg}</strong>{sub}</div>
      <button className="btn btn-t" onClick={onAgain}>Play again</button>
    </div></div>
  );
}

export function Feedback({ right, word, text }: { right: boolean; word: string; text: string }) {
  return <div className="gfb" role="status"><strong style={{ color: right ? "#8EDBC2" : "#E2725B" }}>{word}</strong> {text}</div>;
}

export function Meta({ unit, i, total, score }: { unit: string; i: number; total: number; score: number }) {
  return (
    <>
      <div className="gmeta"><span>{unit} {i + 1} of {total}</span><span>Score {score}</span></div>
      <div className="gbar"><div style={{ width: (i / total) * 100 + "%" }} /></div>
    </>
  );
}

/** Multiple choice game (decoder, phone screen). Options are shuffled every round. */
export function ChoiceGame({ questions, unit, nextLabel, rightWord, wrongWord, end, onEnd }: {
  questions: ChoiceQ[]; unit: string; nextLabel: string; rightWord: string; wrongWord: string;
  end: (score: number) => { msg: string; sub: string }; onEnd: (score: number) => void;
}) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [opts, setOpts] = useState(() => shuffle(questions[0].a));

  if (i >= questions.length) {
    const r = end(score);
    return <Score score={score} total={questions.length} msg={r.msg} sub={r.sub}
      onAgain={() => { setI(0); setScore(0); setPicked(null); setOpts(shuffle(questions[0].a)); }} />;
  }
  const q = questions[i];
  const pick = (k: number) => { if (picked != null) return; setPicked(k); if (opts[k][1] === "right") setScore(score + 1); };
  const right = picked != null && opts[picked][1] === "right";
  return (
    <div className="game">
      <Meta unit={unit} i={i} total={questions.length} score={score} />
      <h4>{q.q}</h4><div style={{ height: 8 }} />
      {opts.map((o, k) => (
        <button key={o[0]} className={"gopt" + (picked != null && o[1] === "right" ? " right" : "") + (picked === k && o[1] !== "right" ? " wrong" : "")}
          disabled={picked != null} onClick={() => pick(k)}>{o[0]}</button>
      ))}
      {picked != null ? (
        <>
          <Feedback right={right} word={right ? rightWord : wrongWord} text={q.e} />
          <button className="btn btn-t" style={{ marginTop: 14 }} autoFocus onClick={() => {
            if (i === questions.length - 1) onEnd(score);
            else setOpts(shuffle(questions[i + 1].a));
            setPicked(null); setI(i + 1);
          }}>{i === questions.length - 1 ? "See result →" : nextLabel}</button>
        </>
      ) : null}
    </div>
  );
}

