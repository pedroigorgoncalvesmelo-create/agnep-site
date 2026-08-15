
CREATE POLICY "Public read storage agnep" ON storage.objects FOR SELECT
  USING (bucket_id IN ('documentos','galeria','patrocinadores','equipe'));

CREATE POLICY "Admin insert storage agnep" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('documentos','galeria','patrocinadores','equipe') AND has_role(auth.uid(),'admin'));

CREATE POLICY "Admin update storage agnep" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id IN ('documentos','galeria','patrocinadores','equipe') AND has_role(auth.uid(),'admin'));

CREATE POLICY "Admin delete storage agnep" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id IN ('documentos','galeria','patrocinadores','equipe') AND has_role(auth.uid(),'admin'));
