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
where not exists (select 1 from public.fleet where name = 'Ford Transit');

update public.fleet
   set image_url = '/fleet/ford-transit.jpg',
       display_order = 1,
       is_featured = true,
       is_active = true
 where name = 'Ford Transit';

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
where not exists (select 1 from public.fleet where name = 'Skoda Superb');

update public.fleet
   set image_url = '/fleet/skoda-superb.jpg',
       display_order = 2,
       is_featured = true,
       is_active = true
 where name = 'Skoda Superb';
