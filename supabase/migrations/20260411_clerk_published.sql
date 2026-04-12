-- Optional: list profiles on Discover; safe to run once.
alter table public.profiles
  add column if not exists published boolean not null default true;

-- Clerk + Supabase: use Clerk JWT template named `supabase` and Third-Party Auth in Supabase.
-- Example policy (adjust to your schema):
-- create policy "profiles_select_own_or_published"
--   on public.profiles for select
--   using (
--     coalesce(published, true) = true
--     or (auth.jwt()->>'sub') = user_id
--   );
