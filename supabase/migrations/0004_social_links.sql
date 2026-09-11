-- Social links (LinkedIn/Instagram/X), managed from /admin/settings —
-- same singleton pattern as site_settings in 0002_site_settings.sql, kept
-- as its own small table rather than altering that frozen table. Every
-- field is meant to be shown publicly in the footer, so reads are open;
-- writes are admin-only.

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique check (singleton),

  linkedin_url text,
  instagram_url text,
  x_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.social_links enable row level security;

create policy "anyone can read social links"
  on public.social_links for select
  to anon, authenticated
  using (true);

create policy "admins can insert social links"
  on public.social_links for insert
  to authenticated
  with check (public.is_admin());

create policy "admins can update social links"
  on public.social_links for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create trigger social_links_set_updated_at
  before update on public.social_links
  for each row
  execute function public.set_updated_at();

insert into public.social_links (singleton)
values (true)
on conflict (singleton) do nothing;
