"use client";
import { useApp } from "./AppProvider";
import { BADGES } from "@/lib/journey";

export function BadgeGrid() {
  const { S } = useApp();
  return (
    <div className="badge-grid">
      {BADGES.map((b) => (
        <div key={b.id} className={"badge" + (S.badges[b.id] ? " got" : "")}>
          <div className="bi" aria-hidden="true">{b.i}</div><b>{b.n}</b><span>{b.d}</span>
        </div>
      ))}
    </div>
  );
}

