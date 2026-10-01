import type { ViewId } from "@/lib/journey";
import { Assess, Decoder, IsRight, Story, Welcome } from "./act1";
import { Cover, LinkedIn, Psych, Resume, Skills } from "./act2";
import { Apply, Network, Plan } from "./act3";
import { Interview, Ninety, Offer, Phone, Refs } from "./act4";
import { FirstYear, Grad, Next } from "./act5";
import { Contact, Dashboard, Premium } from "./other";

/** Every screen. Only imported by member pages, which are checked on the server first. */
export const MEMBER_VIEWS: Record<ViewId, () => React.ReactNode> = {
  dashboard: Dashboard, premium: Premium, contact: Contact,
  welcome: Welcome, story: Story, isright: IsRight, decoder: Decoder, assess: Assess,
  psych: Psych, skills: Skills, resume: Resume, cover: Cover, linkedin: LinkedIn,
  plan: Plan, network: Network, apply: Apply,
  phone: Phone, interview: Interview, refs: Refs, offer: Offer, ninety: Ninety,
  firstyear: FirstYear, grad: Grad, next: Next,
};
