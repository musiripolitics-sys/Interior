-- Run this once in your Supabase SQL editor (Dashboard → SQL Editor → New query → paste → Run).

create table if not exists public.interior360_leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  kind         text not null default 'quotation' check (kind in ('enquiry', 'quotation')),
  name         text not null,
  phone        text not null,
  email        text not null,
  city         text,
  project_type text,
  area         text,
  budget       text,
  timeline     text,
  notes        text
);

-- If you previously created the table without the `kind` column, run this once to add it:
alter table public.interior360_leads
  add column if not exists kind text not null default 'quotation'
  check (kind in ('enquiry', 'quotation'));

create index if not exists interior360_leads_created_at_idx
  on public.interior360_leads (created_at desc);

create index if not exists interior360_leads_kind_idx
  on public.interior360_leads (kind);

-- Lock down the table. Only the service role (used by our API) can read/write.
alter table public.interior360_leads enable row level security;
revoke all on public.interior360_leads from anon, authenticated;
