alter table public.booking_requests
  add column if not exists phone text not null default '',
  add column if not exists pickup_place text not null default '',
  add column if not exists destination text not null default '',
  add column if not exists passengers integer not null default 1,
  add column if not exists message text;
