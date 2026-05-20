create extension if not exists "pgcrypto";

do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'service_status'
  ) then
    create type service_status as enum ('draft', 'published', 'archived');
  end if;
end $$;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  description text not null,
  highlights text[] not null default '{}',
  status service_status not null default 'draft',
  starting_price integer,
  created_at timestamptz not null default now()
);

alter table public.services
  add column if not exists slug text,
  add column if not exists name text,
  add column if not exists category text,
  add column if not exists description text,
  add column if not exists highlights text[] not null default '{}',
  add column if not exists status service_status not null default 'draft',
  add column if not exists starting_price integer,
  add column if not exists created_at timestamptz not null default now();

update public.services
set
  slug = coalesce(nullif(slug, ''), 'service-' || id::text),
  name = coalesce(nullif(name, ''), 'Service'),
  category = coalesce(nullif(category, ''), 'Service VIP'),
  description = coalesce(description, ''),
  highlights = coalesce(highlights, '{}'::text[])
where
  slug is null
  or slug = ''
  or name is null
  or name = ''
  or category is null
  or category = ''
  or description is null
  or highlights is null;

do $$
declare
  source_column text;
  source_udt text;
begin
  foreach source_column in array array['features', 'tags']
  loop
    select udt_name
    into source_udt
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'services'
      and column_name = source_column;

    if source_udt = '_text' then
      execute format(
        'update public.services set highlights = %I where coalesce(array_length(highlights, 1), 0) = 0 and %I is not null',
        source_column,
        source_column
      );
    elsif source_udt = 'text' then
      execute format(
        'update public.services set highlights = array_remove(regexp_split_to_array(%I, E''\\s*,\\s*|\\r?\\n''), '''') where coalesce(array_length(highlights, 1), 0) = 0 and nullif(%I, '''') is not null',
        source_column,
        source_column
      );
    end if;
  end loop;
end $$;

alter table public.services
  alter column slug set not null,
  alter column name set not null,
  alter column category set not null,
  alter column description set not null,
  alter column highlights set default '{}',
  alter column highlights set not null,
  alter column status set default 'draft',
  alter column status set not null,
  alter column created_at set default now(),
  alter column created_at set not null;

create unique index if not exists services_slug_key on public.services(slug);

alter table public.services enable row level security;

drop policy if exists "Published services are public" on public.services;
create policy "Published services are public"
  on public.services for select
  using (status = 'published');

drop policy if exists "Admins manage services with service role" on public.services;
create policy "Admins manage services with service role"
  on public.services for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

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
  'Ford Transit',
  'Van premium spacieux et confortable pour transferts aeroport, groupes et familles.',
  'Van premium spacieux et confortable, ideal pour les transferts aeroport, groupes, familles et trajets longue distance VIP.',
  'Van premium spacieux et confortable pour transferts aeroport, groupes et familles.',
  '/fleet/ford-transit.jpg',
  7,
  6,
  'Sur devis',
  'Van VIP',
  true,
  true,
  1
where not exists (
  select 1
  from public.fleet
  where name in (
    'Ford Transit',
    chr(77) || chr(101) || chr(114) || chr(99) || chr(101) || chr(100) || chr(101) || chr(115) || chr(32) || chr(86) || chr(105) || chr(116) || chr(111)
  )
);

update public.fleet
set
  name = 'Ford Transit',
  short_description = 'Van premium spacieux et confortable pour transferts aeroport, groupes et familles.',
  long_description = 'Van premium spacieux et confortable, ideal pour les transferts aeroport, groupes, familles et trajets longue distance VIP.',
  description = 'Van premium spacieux et confortable pour transferts aeroport, groupes et familles.',
  image_url = '/fleet/ford-transit.jpg',
  seats = 7,
  luggage = 6,
  category = 'Van VIP',
  display_order = 1,
  is_featured = true,
  is_active = true
where name in (
  'Ford Transit',
  chr(77) || chr(101) || chr(114) || chr(99) || chr(101) || chr(100) || chr(101) || chr(115) || chr(32) || chr(86) || chr(105) || chr(116) || chr(111)
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
  'Berline elegante et confortable pour deplacements professionnels, prives et VIP.',
  'Berline elegante et confortable adaptee aux deplacements professionnels, prives et transport VIP.',
  'Berline elegante et confortable pour deplacements professionnels, prives et VIP.',
  '/fleet/skoda-superb.jpg',
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

update public.fleet
set
  short_description = 'Berline elegante et confortable pour deplacements professionnels, prives et VIP.',
  long_description = 'Berline elegante et confortable adaptee aux deplacements professionnels, prives et transport VIP.',
  description = 'Berline elegante et confortable pour deplacements professionnels, prives et VIP.',
  image_url = '/fleet/skoda-superb.jpg',
  seats = 3,
  luggage = 2,
  category = 'Berline Executive',
  display_order = 2,
  is_featured = true,
  is_active = true
where name = 'Skoda Superb';

delete from public.fleet
where lower(name) = chr(102) || chr(105) || chr(97) || chr(116);
