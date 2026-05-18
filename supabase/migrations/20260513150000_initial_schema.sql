create extension if not exists "pgcrypto";

create type service_status as enum ('draft', 'published', 'archived');
create type vehicle_status as enum ('available', 'maintenance', 'hidden');
create type booking_status as enum ('new', 'confirmed', 'completed', 'cancelled');

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
  slug text not null unique,
  name text not null,
  segment text not null,
  description text not null,
  passengers integer not null default 3,
  luggage integer not null default 2,
  status vehicle_status not null default 'available',
  created_at timestamptz not null default now()
);

create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  service_slug text not null references public.services(slug),
  pickup_date timestamptz not null,
  status booking_status not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;
alter table public.fleet enable row level security;
alter table public.booking_requests enable row level security;

create policy "Published services are public"
  on public.services for select
  using (status = 'published');

create policy "Available fleet is public"
  on public.fleet for select
  using (status = 'available');

create policy "Admins manage services with service role"
  on public.services for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Admins manage fleet with service role"
  on public.fleet for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Admins manage booking requests with service role"
  on public.booking_requests for all
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

insert into public.fleet (slug, name, segment, description, passengers, luggage, status)
values
  ('sedan-executive', 'Sedan Executive', 'Executive', 'Berline noire, silencieuse et elegante pour rendez-vous business.', 3, 2, 'available'),
  ('van-vip', 'Van VIP', 'VIP Van', 'Cabine spacieuse pour familles, equipes dirigeantes et delegations.', 7, 6, 'available'),
  ('suv-premium', 'SUV Premium', 'Premium SUV', 'Presence, confort et polyvalence pour trajets urbains ou longues distances.', 4, 4, 'maintenance');
