/** Sprint bookkeeping that is safe to ship to the free preview: titles only, no lessons. */
export const SPRINT_LENGTH = 30;

export const SPRINT_TITLES: string[] = [
  "Pick your lane for the next 30 days",
  "Count everything you did",
  "Find the one story you tell best",
  "Message one person who already knows you",
  "Learn the names your job goes by",
  "Read ten postings and find the pattern",
  "Review the week, then rest",
  "Rewrite your single strongest bullet",
  "Write your summary",
  "Finish the rest of the resume",
  "Publish your headline",
  "Write the About section",
  "Write the paragraph you will reuse forever",
  "Get one honest read",
  "Build your target list",
  "Get on two agency recruiters' radar",
  "Send three messages to people you do not know yet",
  "Apply to five roles, properly",
  "Comment, do not just scroll",
  "Follow up on everything from last week",
  "Book one coffee chat",
  "Build your 90 second answer",
  "Know your number before anyone asks",
  "Tell stories two and three out loud",
  "Write the questions you will ask them",
  "Do a mock interview",
  "Line up your three references",
  "Do the math on your search",
  "What to do when nothing has happened yet",
  "Start the next thirty",
];

export function sprintDone(chk: Record<string, boolean>): number {
  let n = 0;
  for (let i = 1; i <= SPRINT_LENGTH; i++) if (chk["sprint_d" + i]) n++;
  return n;
}

/** Which day it is today, 1 to 30, or null when no start date is set or the sprint is over. */
export function sprintToday(start: string): number | null {
  if (!start) return null;
  const s = new Date(start + "T00:00:00");
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const n = Math.floor((today.getTime() - s.getTime()) / 864e5) + 1;
  return n >= 1 && n <= SPRINT_LENGTH ? n : null;
}
