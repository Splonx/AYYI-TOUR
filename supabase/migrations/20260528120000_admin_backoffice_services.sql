alter table public.services
  add column if not exists title text,
  add column if not exists icon text not null default 'Sparkles',
  add column if not exists display_order integer not null default 0,
  add column if not exists is_active boolean not null default true;

update public.services
set
  title = coalesce(nullif(title, ''), nullif(name, ''), 'Service VIP'),
  icon = coalesce(nullif(icon, ''), 'Sparkles'),
  is_active = case
    when status::text = 'published' then true
    when status::text in ('draft', 'archived') then false
    else is_active
  end
where title is null
   or title = ''
   or icon is null
   or icon = '';

with ordered_services as (
  select
    id,
    row_number() over (order by created_at, id) as position
  from public.services
  where display_order = 0
)
update public.services
set display_order = ordered_services.position
from ordered_services
where public.services.id = ordered_services.id;

alter table public.services
  alter column title set not null,
  alter column icon set default 'Sparkles',
  alter column icon set not null,
  alter column display_order set default 0,
  alter column display_order set not null,
  alter column is_active set default true,
  alter column is_active set not null;

drop policy if exists "Published services are public" on public.services;
drop policy if exists "Active services are public" on public.services;
create policy "Active services are public"
  on public.services for select
  using (is_active = true);
