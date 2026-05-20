create extension if not exists "pgcrypto";

create type service_status as enum ('draft', 'published', 'archived');

create table public.services (
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

create table public.fleet (
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

alter table public.services enable row level security;
alter table public.fleet enable row level security;

create policy "Published services are public"
  on public.services for select
  using (status = 'published');

create policy "Available fleet is public"
  on public.fleet for select
  using (is_active = true);

create policy "Admins manage services with service role"
  on public.services for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Admins manage fleet with service role"
  on public.fleet for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

insert into public.services (slug, name, category, description, highlights, status, starting_price)
values
  (
    'transfert-aeroport-vip',
    'Transfert aeroport VIP',
    'Airport',
    'Accueil personnalise, suivi de vol et prise en charge fluide entre aeroport, hotel, residence ou lieu de rendez-vous.',
    array['Suivi des vols', 'Accueil pancarte', 'Temps d''attente coordonne'],
    'published',
    750
  ),
  (
    'chauffeur-business',
    'Chauffeur business',
    'Corporate',
    'Deplacements professionnels avec chauffeur dedie, discretion et itineraire optimise pour chaque agenda.',
    array['Chauffeur bilingue', 'Facturation entreprise', 'Coordination assistant'],
    'published',
    1200
  ),
  (
    'mise-a-disposition',
    'Mise a disposition',
    'Private hire',
    'Vehicule avec chauffeur reserve a l''heure, a la journee ou pour une mission multi-etapes.',
    array['Forfait horaire', 'Multi-arrets', 'Service flexible'],
    'published',
    1800
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
values
  (
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
  ),
  (
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
  );
