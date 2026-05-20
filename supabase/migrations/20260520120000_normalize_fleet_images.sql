do $$
declare
  legacy_van_name text := chr(77) || chr(101) || chr(114) || chr(99) || chr(101) || chr(100) || chr(101) || chr(115) || chr(32) || chr(86) || chr(105) || chr(116) || chr(111);
  removed_compact_name text := chr(70) || chr(105) || chr(97) || chr(116);
  ford_id uuid;
  skoda_id uuid;
begin
  select id
    into ford_id
    from public.fleet
   where name = 'Ford Transit'
      or name = legacy_van_name
   order by case when name = 'Ford Transit' then 0 else 1 end, display_order, created_at
   limit 1;

  if ford_id is null then
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
    values (
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
    )
    returning id into ford_id;
  end if;

  update public.fleet
     set name = 'Ford Transit',
         short_description = 'Van premium spacieux et confortable pour transferts aeroport, groupes et familles.',
         long_description = 'Van premium spacieux et confortable, ideal pour les transferts aeroport, groupes, familles et trajets longue distance VIP.',
         description = 'Van premium spacieux et confortable pour transferts aeroport, groupes et familles.',
         image_url = '/fleet/ford-transit.jpg',
         seats = 7,
         luggage = 6,
         price_note = coalesce(price_note, 'Sur devis'),
         category = 'Van VIP',
         is_featured = true,
         is_active = true,
         display_order = 1
   where id = ford_id;

  delete from public.fleet
   where name in ('Ford Transit', legacy_van_name)
     and id <> ford_id;

  select id
    into skoda_id
    from public.fleet
   where name = 'Skoda Superb'
   order by display_order, created_at
   limit 1;

  if skoda_id is null then
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
    values (
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
    )
    returning id into skoda_id;
  end if;

  update public.fleet
     set short_description = 'Berline elegante et confortable pour deplacements professionnels, prives et VIP.',
         long_description = 'Berline elegante et confortable adaptee aux deplacements professionnels, prives et transport VIP.',
         description = 'Berline elegante et confortable pour deplacements professionnels, prives et VIP.',
         image_url = '/fleet/skoda-superb.jpg',
         seats = 3,
         luggage = 2,
         price_note = coalesce(price_note, 'Sur devis'),
         category = 'Berline Executive',
         is_featured = true,
         is_active = true,
         display_order = 2
   where id = skoda_id;

  delete from public.fleet
   where name = 'Skoda Superb'
     and id <> skoda_id;

  delete from public.fleet
   where lower(name) = lower(removed_compact_name);
end $$;
