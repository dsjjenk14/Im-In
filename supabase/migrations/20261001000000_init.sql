-- The HR Blueprint: initial schema.
-- Members read and write only their own rows. Anything money or admin related
-- is written by the server with the service role key, never from the browser.

-- ───────── profiles ─────────
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  name        text not null default '',
  industry    text not null default '',
  dream_role  text not null default '',
  goal        text not null default '',
  role        text not null default 'member' check (role in ('member', 'admin')),
  created_at  timestamptz not null default now()
);

-- ───────── progress: the prototype's S object, one row per member ─────────
create table public.progress (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  data        jsonb not null default '{}'::jsonb,
  pct         int not null default 0,           -- journey percent, kept for admin reporting
  updated_at  timestamptz not null default now()
);

-- ───────── entitlements: what someone paid for ─────────
-- A row can exist before the account does (pay first, then sign up).
-- It is claimed by setting user_id.
create table public.entitlements (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references auth.users (id) on delete set null,
  email               text,
  tier                text not null check (tier in ('basic', 'premium')),
  access              boolean not null default true,
  source              text not null check (source in ('stripe', 'code', 'admin')),
  stripe_session_id   text unique,
  stripe_customer_id  text,
  stripe_payment_id   text,
  amount_cents        int not null default 0,
  purchased_at        timestamptz not null default now()
);
create index entitlements_user_idx on public.entitlements (user_id);
create index entitlements_email_idx on public.entitlements (lower(email));

-- ───────── access codes: one time, generated from the admin panel ─────────
create table public.access_codes (
  code         text primary key,
  tier         text not null check (tier in ('basic', 'premium')),
  note         text not null default '',
  redeemed_by  uuid references auth.users (id) on delete set null,
  redeemed_at  timestamptz,
  created_at   timestamptz not null default now()
);

-- ───────── messages: contact form and premium messages ─────────
create table public.messages (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users (id) on delete set null,
  name        text not null default '',
  email       text not null,
  subject     text not null default '',
  body        text not null,
  is_premium  boolean not null default false,
  replied     boolean not null default false,
  reply_body  text,
  replied_at  timestamptz,
  created_at  timestamptz not null default now()
);
create index messages_created_idx on public.messages (created_at desc);

-- ───────── ads: the two sponsor slots ─────────
create table public.ads (
  slot        int primary key check (slot in (1, 2)),
  headline    text not null default '',
  text        text not null default '',
  cta         text not null default '',
  url         text not null default '',
  active      boolean not null default false,
  updated_at  timestamptz not null default now()
);
insert into public.ads (slot) values (1), (2);

-- ───────── coaching: Dominique's side of the premium 90 days ─────────
create table public.coaching (
  user_id         uuid primary key references auth.users (id) on delete cascade,
  kickoff_booked  boolean not null default false,
  session_notes   text not null default '',
  goal            text not null default '',
  updated_at      timestamptz not null default now()
);

-- ───────── row level security ─────────
alter table public.profiles     enable row level security;
alter table public.progress     enable row level security;
alter table public.entitlements enable row level security;
alter table public.access_codes enable row level security;
alter table public.messages     enable row level security;
alter table public.ads          enable row level security;
alter table public.coaching     enable row level security;

-- profiles: read and edit your own. The role column cannot be changed from the browser.
create policy "own profile read"   on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "own profile update" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
revoke update on public.profiles from authenticated;
grant update (name, industry, dream_role, goal) on public.profiles to authenticated;

-- progress: full control of your own row.
create policy "own progress read"   on public.progress for select to authenticated using (user_id = (select auth.uid()));
create policy "own progress insert" on public.progress for insert to authenticated with check (user_id = (select auth.uid()));
create policy "own progress update" on public.progress for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- entitlements, coaching, messages: read your own, the server writes.
create policy "own entitlements read" on public.entitlements for select to authenticated using (user_id = (select auth.uid()));
create policy "own coaching read"     on public.coaching     for select to authenticated using (user_id = (select auth.uid()));
create policy "own messages read"     on public.messages     for select to authenticated using (user_id = (select auth.uid()));

-- ads: anyone can see live ads.
create policy "live ads read" on public.ads for select to anon, authenticated using (active);

-- access_codes: no browser access at all (no policies).
