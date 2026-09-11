-- DB-backed site settings: contact channels, legal/company identity, and
-- the production domain, editable from /admin/settings. Everything in this
-- table is meant to be shown publicly somewhere on the site (WhatsApp/email
-- in the footer and contact page, company identity on the legal pages,
-- domain in canonical/sitemap/OG) — there is no confidential field here, so
-- the read policy is open and only writes are restricted to admins.
--
-- Singleton pattern: `singleton` is always `true` and UNIQUE, so a second
-- row can never be inserted. The row is seeded below so the app can always
-- assume it exists rather than handling a "no settings yet" case.

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique check (singleton),

  whatsapp_number text,
  contact_email text,

  company_name text,
  company_address text,
  tax_office text,
  tax_number text,
  mersis_no text,

  production_domain text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "anyone can read site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "admins can insert site settings"
  on public.site_settings for insert
  to authenticated
  with check (public.is_admin());

create policy "admins can update site settings"
  on public.site_settings for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row
  execute function public.set_updated_at();

insert into public.site_settings (singleton)
values (true)
on conflict (singleton) do nothing;
