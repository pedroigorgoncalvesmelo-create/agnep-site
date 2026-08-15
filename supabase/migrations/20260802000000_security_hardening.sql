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
