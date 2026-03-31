-- CV.live: one CV per user, private by default
CREATE TABLE public.cvs (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slug         text NOT NULL,
  is_published boolean NOT NULL DEFAULT false,
  cv_data      jsonb NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT cvs_slug_unique UNIQUE (slug),
  CONSTRAINT cvs_one_per_user UNIQUE (user_id)
);

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER cvs_updated_at
  BEFORE UPDATE ON public.cvs
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Row Level Security
ALTER TABLE public.cvs ENABLE ROW LEVEL SECURITY;

-- Owner can always read their own CV (published or not)
CREATE POLICY "owner_select"
  ON public.cvs FOR SELECT
  USING (auth.uid() = user_id);

-- Anyone can read published CVs (Postgres ORs permissive SELECT policies)
CREATE POLICY "public_select_published"
  ON public.cvs FOR SELECT
  USING (is_published = true);

-- Owner CRUD
CREATE POLICY "owner_insert"
  ON public.cvs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "owner_update"
  ON public.cvs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "owner_delete"
  ON public.cvs FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_cvs_slug ON public.cvs (slug);
CREATE INDEX idx_cvs_user_id ON public.cvs (user_id);
