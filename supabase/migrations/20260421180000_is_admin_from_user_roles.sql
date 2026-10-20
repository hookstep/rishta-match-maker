-- Admin flag used by the app (useAuth → is_admin RPC) and by SECURITY DEFINER RPCs.
-- Ensures public.is_admin(uuid) reflects public.user_roles.role = 'admin'.

DO $$
BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'candidate');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

CREATE INDEX IF NOT EXISTS user_roles_user_id_idx ON public.user_roles (user_id);

-- SECURITY DEFINER: callers must still pass the uid under check; RLS on user_roles does not block this read.
CREATE OR REPLACE FUNCTION public.is_admin (_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    WHERE ur.user_id = _user_id
      AND lower(ur.role::text) = 'admin'
  );
$$;

ALTER FUNCTION public.is_admin (uuid) OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.is_admin (uuid) TO authenticated;

-- Let signed-in users read their own role row (client fallback + transparency).
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user_roles_select_own" ON public.user_roles;

CREATE POLICY "user_roles_select_own"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

GRANT SELECT ON TABLE public.user_roles TO authenticated;
