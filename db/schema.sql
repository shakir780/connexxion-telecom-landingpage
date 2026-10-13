-- Safe to run more than once: `npm run db:migrate` applies it to whichever
-- database DATABASE_URL points at.

create table if not exists consultations (
  id         bigint generated always as identity primary key,
  name       text not null,
  company    text,
  email      text not null,
  phone      text not null,
  category   text not null,
  message    text,
  status     text not null default 'new'
             check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists consultations_created_at_idx
  on consultations (created_at desc);

create table if not exists subscribers (
  id         bigint generated always as identity primary key,
  email      text not null unique,
  created_at timestamptz not null default now()
);
