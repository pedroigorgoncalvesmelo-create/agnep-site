-- =========================
-- ROLES
-- =========================
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================
-- HELPERS
-- =========================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =========================
-- MODALIDADE ENUM
-- =========================
CREATE TYPE public.modalidade AS ENUM ('jiu-jitsu', 'xadrez', 'geral');

-- =========================
-- EVENTOS
-- =========================
CREATE TABLE public.eventos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descricao text,
  modalidade public.modalidade NOT NULL DEFAULT 'geral',
  data_evento timestamptz NOT NULL,
  local text,
  cidade text,
  link_inscricao text,
  imagem_url text,
  destaque boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.eventos TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.eventos TO authenticated;
GRANT ALL ON public.eventos TO service_role;

ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Eventos sao publicos"
  ON public.eventos FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admins gerenciam eventos"
  ON public.eventos FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER eventos_updated_at
  BEFORE UPDATE ON public.eventos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX eventos_data_idx ON public.eventos (data_evento DESC);

-- =========================
-- RESULTADOS
-- =========================
CREATE TABLE public.resultados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta text NOT NULL,
  modalidade public.modalidade NOT NULL DEFAULT 'jiu-jitsu',
  competicao text NOT NULL,
  colocacao text NOT NULL,
  categoria text,
  data_conquista date NOT NULL,
  descricao text,
  imagem_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.resultados TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.resultados TO authenticated;
GRANT ALL ON public.resultados TO service_role;

ALTER TABLE public.resultados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Resultados sao publicos"
  ON public.resultados FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admins gerenciam resultados"
  ON public.resultados FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER resultados_updated_at
  BEFORE UPDATE ON public.resultados
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX resultados_data_idx ON public.resultados (data_conquista DESC);REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
-- Concede admin automaticamente ao email do administrador inicial
CREATE OR REPLACE FUNCTION public.handle_initial_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'pedroigorgoncalvesmelo@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_grant_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_grant_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_initial_admin();

-- Caso o usuário já exista (login feito antes desta migração), concede agora
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users
WHERE email = 'pedroigorgoncalvesmelo@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
REVOKE EXECUTE ON FUNCTION public.handle_initial_admin() FROM PUBLIC, anon, authenticated;
-- Documentos
CREATE TABLE public.documentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descricao text,
  categoria text,
  arquivo_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.documentos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.documentos TO authenticated;
GRANT ALL ON public.documentos TO service_role;
ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Documentos publicos" ON public.documentos FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam documentos" ON public.documentos FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_documentos_updated BEFORE UPDATE ON public.documentos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Albuns + Fotos
CREATE TABLE public.albuns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descricao text,
  capa_url text,
  data_evento date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.albuns TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.albuns TO authenticated;
GRANT ALL ON public.albuns TO service_role;
ALTER TABLE public.albuns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Albuns publicos" ON public.albuns FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam albuns" ON public.albuns FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_albuns_updated BEFORE UPDATE ON public.albuns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.fotos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id uuid REFERENCES public.albuns(id) ON DELETE CASCADE,
  imagem_url text NOT NULL,
  legenda text,
  ordem int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.fotos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fotos TO authenticated;
GRANT ALL ON public.fotos TO service_role;
ALTER TABLE public.fotos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Fotos publicas" ON public.fotos FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam fotos" ON public.fotos FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- Videos
CREATE TABLE public.videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descricao text,
  youtube_id text NOT NULL,
  modalidade modalidade NOT NULL DEFAULT 'geral',
  data_publicacao date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.videos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.videos TO authenticated;
GRANT ALL ON public.videos TO service_role;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Videos publicos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam videos" ON public.videos FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_videos_updated BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Patrocinadores (sem niveis)
CREATE TABLE public.patrocinadores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  logo_url text,
  link text,
  descricao text,
  ordem int NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.patrocinadores TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.patrocinadores TO authenticated;
GRANT ALL ON public.patrocinadores TO service_role;
ALTER TABLE public.patrocinadores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Patrocinadores publicos" ON public.patrocinadores FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam patrocinadores" ON public.patrocinadores FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_patrocinadores_updated BEFORE UPDATE ON public.patrocinadores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Equipe
CREATE TABLE public.equipe (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  cargo text NOT NULL,
  bio text,
  foto_url text,
  ordem int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.equipe TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.equipe TO authenticated;
GRANT ALL ON public.equipe TO service_role;
ALTER TABLE public.equipe ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Equipe publica" ON public.equipe FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam equipe" ON public.equipe FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_equipe_updated BEFORE UPDATE ON public.equipe FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Public read storage agnep" ON storage.objects FOR SELECT
  USING (bucket_id IN ('documentos','galeria','patrocinadores','equipe'));

CREATE POLICY "Admin insert storage agnep" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('documentos','galeria','patrocinadores','equipe') AND has_role(auth.uid(),'admin'));

CREATE POLICY "Admin update storage agnep" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id IN ('documentos','galeria','patrocinadores','equipe') AND has_role(auth.uid(),'admin'));

CREATE POLICY "Admin delete storage agnep" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id IN ('documentos','galeria','patrocinadores','equipe') AND has_role(auth.uid(),'admin'));

CREATE TABLE public.site_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  valor TEXT NOT NULL,
  ordem INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_stats TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_stats TO authenticated;
GRANT ALL ON public.site_stats TO service_role;

ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_stats public read" ON public.site_stats FOR SELECT USING (true);
CREATE POLICY "site_stats admin insert" ON public.site_stats FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "site_stats admin update" ON public.site_stats FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "site_stats admin delete" ON public.site_stats FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER site_stats_set_updated_at BEFORE UPDATE ON public.site_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_stats (label, valor, ordem) VALUES
  ('Medalhas de Ouro', '142', 1),
  ('Atletas Filiados', '850+', 2),
  ('Títulos Estaduais', '28', 3),
  ('Projetos Ativos', '12', 4);
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT _user_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_id = _user_id
        AND role = _role
    )
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  kind text NOT NULL DEFAULT 'text',
  value text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ler conteúdo do site"
  ON public.site_content FOR SELECT
  USING (true);

CREATE POLICY "Apenas admin pode inserir"
  ON public.site_content FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Apenas admin pode atualizar"
  ON public.site_content FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Apenas admin pode apagar"
  ON public.site_content FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.site_content_touch()
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

CREATE TRIGGER site_content_touch_trg
  BEFORE INSERT OR UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.site_content_touch();
-- ============================================================
-- AGNEP — Security Hardening Migration
-- Data: 2026-08-02
-- Purpose: Reinforce data protection against leaks and abuse
-- ============================================================

-- 1. Add audit logging table for admin actions
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  details jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.admin_audit_log TO authenticated;
GRANT INSERT ON public.admin_audit_log TO authenticated;
GRANT ALL ON public.admin_audit_log TO service_role;

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit log"
  ON public.admin_audit_log FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert audit log"
  ON public.admin_audit_log FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2. Audit trigger function for sensitive tables
CREATE OR REPLACE FUNCTION public.log_admin_action()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin') THEN
    INSERT INTO public.admin_audit_log (user_id, action, table_name, record_id, details)
    VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      COALESCE(
        (CASE WHEN TG_OP = 'DELETE' THEN OLD.id ELSE NEW.id END),
        NEW.id
      ),
      jsonb_build_object(
        'old', CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
        'new', CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
      )
    );
  END IF;
  RETURN NEW;
END;
$$;

-- 3. Attach audit triggers to all admin-managed tables
DROP TRIGGER IF EXISTS audit_eventos ON public.eventos;
CREATE TRIGGER audit_eventos
  AFTER INSERT OR UPDATE OR DELETE ON public.eventos
  FOR EACH ROW EXECUTE FUNCTION public.log_admin_action();

DROP TRIGGER IF EXISTS audit_resultados ON public.resultados;
CREATE TRIGGER audit_resultados
  AFTER INSERT OR UPDATE OR DELETE ON public.resultados
  FOR EACH ROW EXECUTE FUNCTION public.log_admin_action();

DROP TRIGGER IF EXISTS audit_fotos ON public.fotos;
CREATE TRIGGER audit_fotos
  AFTER INSERT OR UPDATE OR DELETE ON public.fotos
  FOR EACH ROW EXECUTE FUNCTION public.log_admin_action();

DROP TRIGGER IF EXISTS audit_albuns ON public.albuns;
CREATE TRIGGER audit_albuns
  AFTER INSERT OR UPDATE OR DELETE ON public.albuns
  FOR EACH ROW EXECUTE FUNCTION public.log_admin_action();

DROP TRIGGER IF EXISTS audit_videos ON public.videos;
CREATE TRIGGER audit_videos
  AFTER INSERT OR UPDATE OR DELETE ON public.videos
  FOR EACH ROW EXECUTE FUNCTION public.log_admin_action();

DROP TRIGGER IF EXISTS audit_documentos ON public.documentos;
CREATE TRIGGER audit_documentos
  AFTER INSERT OR UPDATE OR DELETE ON public.documentos
  FOR EACH ROW EXECUTE FUNCTION public.log_admin_action();

DROP TRIGGER IF EXISTS audit_patrocinadores ON public.patrocinadores;
CREATE TRIGGER audit_patrocinadores
  AFTER INSERT OR UPDATE OR DELETE ON public.patrocinadores
  FOR EACH ROW EXECUTE FUNCTION public.log_admin_action();

DROP TRIGGER IF EXISTS audit_equipe ON public.equipe;
CREATE TRIGGER audit_equipe
  AFTER INSERT OR UPDATE OR DELETE ON public.equipe
  FOR EACH ROW EXECUTE FUNCTION public.log_admin_action();

DROP TRIGGER IF EXISTS audit_site_content ON public.site_content;
CREATE TRIGGER audit_site_content
  AFTER INSERT OR UPDATE OR DELETE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.log_admin_action();

-- 4. Revoke direct table access for anonymous users
-- (Public read is handled by RLS policies, not direct grants)
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
GRANT SELECT ON public.eventos TO anon;
GRANT SELECT ON public.resultados TO anon;
GRANT SELECT ON public.fotos TO anon;
GRANT SELECT ON public.albuns TO anon;
GRANT SELECT ON public.videos TO anon;
GRANT SELECT ON public.documentos TO anon;
GRANT SELECT ON public.patrocinadores TO anon;
GRANT SELECT ON public.equipe TO anon;
GRANT SELECT ON public.site_content TO anon;

-- 5. Restrict has_role function to authenticated only (defense in depth)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- 6. Add created_at index to audit log for efficient querying
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON public.admin_audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON public.admin_audit_log (user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_table ON public.admin_audit_log (table_name);
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

-- ============================================================
-- Configuração do administrador (executa por último)
-- ============================================================
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users
WHERE email = 'pedroigorgoncalvesmelo@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Verificação
SELECT u.email, r.role
FROM auth.users u
JOIN public.user_roles r ON u.id = r.user_id
WHERE u.email = 'pedroigorgoncalvesmelo@gmail.com';
