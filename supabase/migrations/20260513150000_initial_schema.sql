create extension if not exists "pgcrypto";

create type service_status as enum ('draft', 'published', 'archived');
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

create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  phone text not null,
  service_slug text not null references public.services(slug),
  pickup_date timestamptz not null,
  pickup_place text not null,
  destination text not null,
  passengers integer not null default 1,
  message text,
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
  using (is_active = true);

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
  ),
  (
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
  );
