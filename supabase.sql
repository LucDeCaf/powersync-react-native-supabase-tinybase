-- Paste the contents of this file into your Supabase SQL editor
-- In an actual application, you will also want to enable RLS.

-- Create todos table
create table public.todos (
    id uuid primary key default gen_random_uuid(),
    created_at timestamp with time zone not null default now(),
    completed boolean not null default false,
    description text not null,
    owner_id uuid not null,

    foreign key (owner_id) references auth.users(id) on delete cascade
) tablespace pg_default;

-- Create publication for PowerSync
create publication powersync for table public.todos;
