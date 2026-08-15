/*
  Arquivo: storage.ts

  Propósito:
  - Fornece utilitários para upload, validação, sanitização e gerenciamento de arquivos
    usando o Supabase Storage.
  - Define regras de segurança (tamanho, MIME, extensões) por "bucket" da aplicação.
  - Gera URLs assinadas para acesso temporário e permite remoção de arquivos.

  Observações:
  - Comentários em português ajudam desenvolvedores iniciantes a entender o fluxo.
  - Validações são feitas no cliente/servidor para reduzir uploads maliciosos.
*/

import { supabase } from "@/integrations/supabase/client";

// Tipos de buckets suportados pela aplicação.
// Cada string corresponde a um bucket configurado no Supabase Storage.
export type BucketName = "documentos" | "galeria" | "patrocinadores" | "equipe";

/* Tamanhos máximos permitidos por bucket (em bytes).
   Essas restrições ajudam a evitar uploads excessivamente grandes que podem
   consumir banda/armazenamento indevidamente. */
const MAX_SIZE_BYTES: Record<BucketName, number> = {
  documentos: 10 * 1024 * 1024,
  galeria: 5 * 1024 * 1024,
  patrocinadores: 2 * 1024 * 1024,
  equipe: 5 * 1024 * 1024,
};

/* Tipos MIME permitidos por bucket.
   Verificamos o MIME para reduzir o risco de arquivos com conteúdo inesperado. */
const ALLOWED_MIME_TYPES: Record<BucketName, string[]> = {
  documentos: ["application/pdf"],
  galeria: ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"],
  patrocinadores: ["image/png", "image/svg+xml", "image/webp"],
  equipe: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
};

/* Extensões de arquivo permitidas por bucket.
   Defesa em profundidade: além do MIME, checamos a extensão para maior segurança. */
const ALLOWED_EXTENSIONS: Record<BucketName, string[]> = {
  documentos: ["pdf"],
  galeria: ["jpg", "jpeg", "png", "webp", "gif"],
  patrocinadores: ["png", "svg", "webp"],
  equipe: ["jpg", "jpeg", "png", "webp"],
};

/**
 * Validate file before upload: check size, MIME type, and extension.
 * Throws an Error with a descriptive message if validation fails.
 */
/* Valida o arquivo antes do upload.
   O que faz:
   - Confere tamanho máximo permitido para o bucket.
   - Verifica se o tipo MIME está na lista permitida.
   - Verifica se a extensão do nome do arquivo é permitida.
   Por que:
   - Evita uploads inválidos ou maliciosos antes de enviar ao Supabase. */
function validateFile(bucket: BucketName, file: File): void {
  const maxSize = MAX_SIZE_BYTES[bucket];
  // Verifica o tamanho do arquivo
  if (file.size > maxSize) {
    const maxMB = maxSize / (1024 * 1024);
    throw new Error(`Arquivo muito grande. Tamanho máximo: ${maxMB}MB. Enviado: ${(file.size / (1024 * 1024)).toFixed(1)}MB`);
  }

  // Verifica o tipo MIME do arquivo
  const allowedMimes = ALLOWED_MIME_TYPES[bucket];
  if (!allowedMimes.includes(file.type)) {
    throw new Error(
      `Tipo de arquivo não permitido: "${file.type}". Permitidos: ${allowedMimes.join(", ")}`
    );
  }

  // Extrai e verifica a extensão do nome do arquivo
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const allowedExts = ALLOWED_EXTENSIONS[bucket];
  if (!allowedExts.includes(ext)) {
    throw new Error(
      `Extensão não permitida: ".${ext}". Permitidas: ${allowedExts.map((e) => `.${e}`).join(", ")}`
    );
  }
}

/**
 * Sanitize filename: keep only the extension, replace the rest with a UUID.
 * Prevents path traversal and special characters.
 */
/* Gera um nome de arquivo seguro para armazenar no bucket.
   O que faz:
   - Mantém apenas a extensão original.
   - Substitui o nome por um UUID para evitar colisões e remover caracteres perigosos.
   Por que:
   - Previne path traversal e nomes com caracteres especiais que poderiam causar problemas. */
function sanitizePath(bucket: BucketName, file: File): string {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const id = crypto.randomUUID();
  return `${id}.${ext}`;
}

/* Faz o upload do arquivo para o Supabase Storage.
   O que faz:
   - Valida o arquivo localmente.
   - Sanitiza o nome do arquivo.
   - Realiza o upload com cacheControl e sem sobrescrever (upsert: false).
   Retorna:
   - O caminho (path) onde o arquivo foi salvo no bucket. */
export async function uploadFile(bucket: BucketName, file: File): Promise<string> {
  // Validate file security before any network call
  validateFile(bucket, file);

  const path = sanitizePath(bucket, file);
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

/** Default signed URL expiry: 1 hour (reduced from 7 days for security) */
/* Tempo padrão de expiração para URLs assinadas.
   URLs curtas reduzem o risco de compartilhamento indevido. */
const DEFAULT_EXPIRY = 60 * 60; // 1 hour

/* Gera uma URL assinada para um arquivo (acesso temporário).
   Retorna a URL ou null em caso de erro. */
export async function getSignedUrl(bucket: BucketName, path: string, expiresIn = DEFAULT_EXPIRY) {
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn);
  if (error) return null;
  return data.signedUrl;
}

/* Gera múltiplas URLs assinadas para vários caminhos.
   Retorna um mapa { path: signedUrl }.
   Se o array de paths estiver vazio, retorna um objeto vazio imediatamente. */
export async function getSignedUrls(bucket: BucketName, paths: string[], expiresIn = DEFAULT_EXPIRY) {
  if (paths.length === 0) return {};
  const { data } = await supabase.storage.from(bucket).createSignedUrls(paths, expiresIn);
  const map: Record<string, string> = {};
  data?.forEach((d) => {
    if (d.path && d.signedUrl) map[d.path] = d.signedUrl;
  });
  return map;
}

/* Remove um arquivo do bucket.
   Usa a API do Supabase Storage para deletar o arquivo pelo caminho. */
export async function removeFile(bucket: BucketName, path: string) {
  await supabase.storage.from(bucket).remove([path]);
}
