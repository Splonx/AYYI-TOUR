create extension if not exists "pgcrypto";

create table if not exists public.fleet (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_description text,
  long_description text,
  description text not null default '',
  image_url text,
  seats integer not null default 3,
  luggage integer not null default 2,
  price_note text,
  category text,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.fleet
  add column if not exists short_description text,
  add column if not exists long_description text,
  add column if not exists description text not null default '',
  add column if not exists image_url text,
  add column if not exists seats integer not null default 3,
  add column if not exists luggage integer not null default 2,
  add column if not exists price_note text,
  add column if not exists category text,
  add column if not exists is_featured boolean not null default false,
  add column if not exists is_active boolean not null default true,
  add column if not exists display_order integer not null default 0,
  add column if not exists created_at timestamptz not null default now();

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'fleet'
      and column_name = 'segment'
  ) then
    update public.fleet
    set category = coalesce(category, segment)
    where category is null;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'fleet'
      and column_name = 'passengers'
  ) then
    update public.fleet
    set seats = passengers
    where seats = 3;
  end if;
end $$;

alter table public.fleet
  drop column if exists slug,
  drop column if exists segment,
  drop column if exists passengers,
  drop column if exists status;

alter table public.fleet enable row level security;

drop policy if exists "Available fleet is public" on public.fleet;
create policy "Available fleet is public"
  on public.fleet for select
  using (is_active = true);

drop policy if exists "Admins manage fleet with service role" on public.fleet;
create policy "Admins manage fleet with service role"
  on public.fleet for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

insert into public.fleet (
  name,
  short_description,
  long_description,
  description,
  image_url,
  seats,
  luggage,
  price_note,
  category,
  is_featured,
  is_active,
  display_order
)
select
  'Mercedes Vito',
  'Van premium spacieux pour familles, equipes et delegations.',
  'Mercedes Vito avec chauffeur prive, ideal pour transferts aeroport, missions business et trajets inter-villes avec confort cabine.',
  'Van premium spacieux pour familles, equipes et delegations.',
  null,
  7,
  6,
  'Sur devis',
  'Van VIP',
  true,
  true,
  1
where not exists (
  select 1 from public.fleet where name = 'Mercedes Vito'
);

insert into public.fleet (
  name,
  short_description,
  long_description,
  description,
  image_url,
  seats,
  luggage,
  price_note,
  category,
  is_featured,
  is_active,
  display_order
)
select
  'Skoda Superb',
  'Berline executive discrete pour transferts VIP et rendez-vous business.',
  'Skoda Superb avec chauffeur prive, selectionnee pour sa discretion, son confort et sa tenue parfaite sur les trajets premium.',
  'Berline executive discrete pour transferts VIP et rendez-vous business.',
  null,
  3,
  2,
  'Sur devis',
  'Berline Executive',
  true,
  true,
  2
where not exists (
  select 1 from public.fleet where name = 'Skoda Superb'
);
