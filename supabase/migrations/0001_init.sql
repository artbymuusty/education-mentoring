-- Phase 1 schema: lead capture + minimal admin/RBAC foundation.
-- Deeper domains (students, applications, documents, mentorship_plans, ...)
-- are intentionally deferred to Phase 2+ per the product strategy doc —
-- this migration only creates what Phase 1 actually uses.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- profiles: one row per authenticated user, carries the RBAC role.
-- No public sign-up flow exists yet (Phase 1 has no student portal), so
-- rows are created manually for the people who need admin access:
--   insert into public.profiles (id, role, full_name)
--   values ('<auth-user-uuid>', 'admin', 'Ad Soyad');
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'visitor' check (role in ('admin', 'mentor', 'student', 'visitor')),
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- security definer helper so the leads/profiles policies below don't
-- recurse into profiles' own RLS.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

create policy "users can view own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "admins can view all profiles"
  on public.profiles for select
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------
-- leads: created by the public "Yolculuğunu Konuşalım" / assessment form.
-- ---------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  first_name text not null,
  last_name text not null,
  phone text not null,
  email text not null,
  preferred_contact text,

  stage text,
  education_status text,
  interest_area text,
  language_level text,
  target text,
  timeline text,
  message text,
  note text,

  status text not null default 'new'
    check (status in ('new', 'contacted', 'meeting', 'in_progress', 'converted', 'closed')),
  admin_notes text
);

alter table public.leads enable row level security;

create policy "anyone can submit a lead"
  on public.leads for insert
  to anon, authenticated
  with check (true);

create policy "admins can view leads"
  on public.leads for select
  to authenticated
  using (public.is_admin());

create policy "admins can update leads"
  on public.leads for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_set_updated_at
  before update on public.leads
  for each row
  execute function public.set_updated_at();
