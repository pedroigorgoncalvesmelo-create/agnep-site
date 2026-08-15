
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
