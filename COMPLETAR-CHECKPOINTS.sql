-- AGNEP v8 — Notificações automáticas
-- Cria a tabela de controle que evita enviar o mesmo aviso duas vezes.
CREATE TABLE IF NOT EXISTS public.inscricao_checkpoints (
  id INTEGER PRIMARY KEY,
  ultimo_aviso TIMESTAMPTZ
);
ALTER TABLE public.inscricao_checkpoints ENABLE ROW LEVEL SECURITY;
