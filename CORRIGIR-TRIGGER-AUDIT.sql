-- ============================================================
-- AGNEP — Correção do erro "record 'old' has no field 'id'"
-- ============================================================
-- O gatilho de auditoria (log_admin_action) tentava ler OLD.id / NEW.id
-- em tabelas que NÃO possuem coluna 'id', causando o erro ao salvar.
-- Esta versão corrige a função usando TG_TABLE_NAME para saber a chave
-- primária de cada tabela e COALESCE para evitar o erro.
--
-- Execute no SQL Editor do Supabase (1 vez).

-- 1. Recria a função de auditoria com proteção contra o erro
CREATE OR REPLACE FUNCTION public.log_admin_action()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_op text := TG_OP;
  v_table text := TG_TABLE_NAME;
  v_pk_name text := 'id';
  v_old_value text := NULL;
  v_new_value text := NULL;
  v_pk_value text := NULL;
BEGIN
  -- Só registra se o usuário logado for admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
    RETURN NEW;
  END IF;

  BEGIN
    -- Descobre o nome da coluna da chave primária da tabela
    SELECT a.attname INTO v_pk_name
    FROM pg_index i
    JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
    WHERE i.indrelid = (TG_RELID::regclass) AND i.indisprimary;
    IF v_pk_name IS NULL THEN v_pk_name := 'id'; END IF;

    IF v_op IN ('UPDATE', 'DELETE') THEN
      v_old_value := COALESCE((OLD #>> ARRAY[v_pk_name]), 'unknown');
    END IF;
    IF v_op IN ('INSERT', 'UPDATE') THEN
      v_new_value := COALESCE((NEW #>> ARRAY[v_pk_name]), 'unknown');
    END IF;
    v_pk_value := COALESCE(v_new_value, v_old_value, 'unknown');

    INSERT INTO public.admin_audit_log (user_id, operacao, tabela, registro_id, detalhes)
    VALUES (
      auth.uid(),
      v_op,
      v_table,
      v_pk_value,
      jsonb_build_object(
        'coluna_chave', v_pk_name,
        'old', CASE WHEN v_op IN ('UPDATE', 'DELETE') THEN OLD ELSE NULL END,
        'new', CASE WHEN v_op IN ('INSERT', 'UPDATE') THEN NEW ELSE NULL END
      )
    );
  EXCEPTION WHEN OTHERS THEN
    -- Se a auditoria falhar por qualquer motivo (ex.: tabela sem log),
    -- não impede a operação original de acontecer
    NULL;
  END;

  IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
  RETURN NEW;
END;
$$;

-- 2. Reaplica o gatilho em todas as tabelas administradas
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

-- Se a tabela content_blocks existir, aplica nela também
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'content_blocks') THEN
    EXECUTE 'DROP TRIGGER IF EXISTS audit_content_blocks ON public.content_blocks';
    EXECUTE 'CREATE TRIGGER audit_content_blocks AFTER INSERT OR UPDATE OR DELETE ON public.content_blocks FOR EACH ROW EXECUTE FUNCTION public.log_admin_action()';
  END IF;
END $$;
