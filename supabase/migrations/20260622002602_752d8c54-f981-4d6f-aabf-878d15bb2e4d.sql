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

CREATE INDEX resultados_data_idx ON public.resultados (data_conquista DESC);