-- "Bize Katılın" mentor applications — a live public form, same pattern as
-- leads in 0001_init.sql (public insert, admin-only read/update). 0001 and
-- 0002 are frozen; this is purely additive.

create table if not exists public.mentor_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  first_name text not null,
  last_name text not null,
  phone text not null,
  email text not null,

  germany_experience text not null,
  motivation text not null,
  message text,

  status text not null default 'new'
    check (status in ('new', 'reviewing', 'contacted', 'accepted', 'declined')),
  admin_notes text
);

alter table public.mentor_applications enable row level security;

create policy "anyone can submit a mentor application"
  on public.mentor_applications for insert
  to anon, authenticated
  with check (true);

create policy "admins can view mentor applications"
  on public.mentor_applications for select
  to authenticated
  using (public.is_admin());

create policy "admins can update mentor applications"
  on public.mentor_applications for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create trigger mentor_applications_set_updated_at
  before update on public.mentor_applications
  for each row
  execute function public.set_updated_at();
