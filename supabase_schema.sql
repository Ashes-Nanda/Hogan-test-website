-- Create a table for user profiles (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text unique not null,
  full_name text,
  role text default 'employee' check (role in ('employee', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies for profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a table for test attempts
create table public.attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  attempt_number integer not null,
  answers jsonb not null,
  result jsonb not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for attempts
alter table public.attempts enable row level security;

-- Create policies for attempts
create policy "Users can view their own attempts."
  on attempts for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own attempts."
  on attempts for insert
  with check ( auth.uid() = user_id );

create policy "Admins can view all attempts."
  on attempts for select
  using ( 
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'employee');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- REFLECTIONS TABLE
create table public.reflections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  prompt_id text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.reflections enable row level security;

create policy "Users can view own reflections" on reflections for select using (auth.uid() = user_id);
create policy "Users can insert own reflections" on reflections for insert with check (auth.uid() = user_id);
create policy "Users can update own reflections" on reflections for update using (auth.uid() = user_id);

-- GOALS TABLE
create table public.goals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  content text not null,
  is_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.goals enable row level security;

create policy "Users can view own goals" on goals for select using (auth.uid() = user_id);
create policy "Users can insert own goals" on goals for insert with check (auth.uid() = user_id);
create policy "Users can update own goals" on goals for update using (auth.uid() = user_id);
create policy "Users can delete own goals" on goals for delete using (auth.uid() = user_id);
