-- ============================================================
-- AGNEP — Content Blocks Table
-- Data: 2026-08-02
-- Purpose: Allow admins to add editable text/image blocks
--          to any page of the site.
-- ============================================================

-- Block type enum
CREATE TYPE public.block_type AS ENUM ('text', 'image');

-- Main table
CREATE TABLE public.content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  position int NOT NULL DEFAULT 0,
  type public.block_type NOT NULL DEFAULT 'text',
  title text,
  content text,
  alignment text NOT NULL DEFAULT 'left',
  max_width text,
  bg_style text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

GRANT SELECT ON public.content_blocks TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.content_blocks TO authenticated;
GRANT ALL ON public.content_blocks TO service_role;

ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;

-- Public can read (blocks are rendered on public pages)
CREATE POLICY "Content blocks public read"
  ON public.content_blocks FOR SELECT
  USING (true);

-- Only admins can manage blocks
CREATE POLICY "Admins insert content blocks"
  ON public.content_blocks FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update content blocks"
  ON public.content_blocks FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete content blocks"
  ON public.content_blocks FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION public.content_blocks_touch()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$;

CREATE TRIGGER content_blocks_touch_trg
  BEFORE INSERT OR UPDATE ON public.content_blocks
  FOR EACH ROW EXECUTE FUNCTION public.content_blocks_touch();

-- Track creator on insert
CREATE OR REPLACE FUNCTION public.content_blocks_set_creator()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER content_blocks_set_creator_trg
  BEFORE INSERT ON public.content_blocks
  FOR EACH ROW EXECUTE FUNCTION public.content_blocks_set_creator();

-- Indexes
CREATE INDEX idx_content_blocks_page ON public.content_blocks (page, position);
CREATE INDEX idx_content_blocks_type ON public.content_blocks (type);
