/** Renders `**bold**` inside a plain string. Nothing else, on purpose. */
export function rich(text: string): React.ReactNode {
  const parts = text.split("**");
  return parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : p));
}
