-- ============================================================
-- AGNEP — Criar a tabela "biblioteca" do Supabase
-- ============================================================
-- A biblioteca é o armazém interno de fotos usadas no site:
-- - As fotos enviadas pelo botão "Trocar Imagem" (em qualquer página)
--   vão para esta tabela. Elas servem apenas para decorar o site
--   (banner, cards, páginas) e NUNCA aparecem na galeria pública.
-- - A galeria pública (/galeria-fotos) mostra somente as fotos
--   anexadas manualmente aos eventos/torneios (tabela "fotos"
--   com album_id preenchido).
-- Execute este script no SQL Editor do Supabase uma única vez.
-- Se aparecer "já existe", a tabela já foi criada — pode ignorar.

-- 1. Cria a tabela "biblioteca" (fotos de uso interno do site)
CREATE TABLE IF NOT EXISTS public.biblioteca (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  imagem_url text NOT NULL,
  legenda text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Ativa a segurança por linha (RLS) para a tabela
ALTER TABLE public.biblioteca ENABLE ROW LEVEL SECURITY;

-- 3. Remove políticas antigas com o mesmo nome (para evitar conflito)
DROP POLICY IF EXISTS "biblioteca leitura publica" ON public.biblioteca;
DROP POLICY IF EXISTS "biblioteca envio por admin" ON public.biblioteca;
DROP POLICY IF EXISTS "biblioteca edicao por admin" ON public.biblioteca;
DROP POLICY IF EXISTS "biblioteca remocao por admin" ON public.biblioteca;

-- 4. Política: visitantes do site podem VER as fotos da biblioteca
--    (necessário para os previews do seletor "Trocar Imagem")
CREATE POLICY "biblioteca leitura publica"
  ON public.biblioteca FOR SELECT
  TO public
  USING (true);

-- 5. Política: somente usuários LOGADOS (admin) podem ENVIAR fotos
CREATE POLICY "biblioteca envio por admin"
  ON public.biblioteca FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

-- 6. Política: somente usuários LOGADOS podem EDITAR as legendas
CREATE POLICY "biblioteca edicao por admin"
  ON public.biblioteca FOR UPDATE
  TO authenticated
  USING (auth.role() = 'authenticated');

-- 7. Política: somente usuários LOGADOS podem REMOVER fotos
CREATE POLICY "biblioteca remocao por admin"
  ON public.biblioteca FOR DELETE
  TO authenticated
  USING (auth.role() = 'authenticated');

-- 8. Verificação: mostra a tabela criada
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'biblioteca';
