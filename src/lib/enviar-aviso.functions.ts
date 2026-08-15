/*
  Arquivo: enviar-aviso.server.ts
  Propósito:
  - Server Function (executada apenas no servidor) que envia avisos por e-mail
    para todos os inscritos da área "Fique por Dentro das Novidades".
  - Usa o SMTP do Gmail com a conta da AGNEP (Agnepgoias@gmail.com).
  - Lê a senha de app do Gmail a partir da variável de ambiente GMAIL_APP_PASSWORD.

  IMPORTANTE (segurança):
  - Esta função roda SOMENTE no servidor — o usuário nunca vê a senha.
  - Requer a variável GMAIL_APP_PASSWORD no .env (senha de app do Gmail,
    não a senha normal de login — ver GUIA-EMAIL-NOVIDADES.md).

  Observações para desenvolvedores iniciantes:
  - `createServerFn` cria uma função que o cliente pode chamar, mas que roda no servidor.
  - O token do admin (enviado pelo auth-attacher) é verificado antes de disparar o envio.
*/
import { createServerFn } from "@tanstack/react-start";
// Utilitário do TanStack Start para ler headers da requisição no servidor
import { getRequestHeader } from "@tanstack/react-start/server";
import nodemailer from "nodemailer";
import { supabaseAdmin as supabaseServer } from "@/integrations/supabase/client.server";

// Função de servidor que envia o aviso para todos os inscritos ativos.
export const enviarAvisoNovidadesFn = createServerFn({ method: "POST" })
  // Extrai o header Authorization (token do usuário) via middleware global
  .validator((data: { titulo: string; texto: string }) => data)
  .handler(async ({ data }) => {
    // 1. Verifica quem está chamando — extrai o token do header Authorization
    //    (getRequestHeader lê os headers da requisição RPC no servidor)
    const authHeader = getRequestHeader("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
      throw new Error("Não autenticado");
    }

    // 2. Valida o usuário e confirma que ele é administrador
    const { data: user, error: userError } =
      await supabaseServer.auth.getUser(token);
    if (userError || !user.user) {
      throw new Error("Sessão inválida");
    }
    const userId = user.user.id;
    const { data: hasAdmin } = await supabaseServer.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (!hasAdmin) {
      throw new Error("Apenas administradores podem enviar avisos");
    }

    // 3. Busca todos os e-mails inscritos e ativos
    //    (as tabelas novidades/inscricoes ainda não existem nos tipos gerados do
    //     Supabase — usamos any de forma segura; a validação real fica com o RLS)
    const { data: inscritos, error: errList } = await supabaseServer
      .from("inscricoes")
      .select("email")
      .eq("ativo", true);
    if (errList || !inscritos || inscritos.length === 0) {
      // Sem inscritos: não há nada a enviar — sucesso silencioso
      return { enviados: 0, motivo: "nenhum inscrito" };
    }

    // 4. Configura o transportador SMTP do Gmail
    const appPassword = process.env.GMAIL_APP_PASSWORD;
    if (!appPassword) {
      throw new Error(
        "GMAIL_APP_PASSWORD não configurado — o aviso foi publicado no site, mas o e-mail não pôde ser enviado."
      );
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "Agnepgoias@gmail.com",
        pass: appPassword,
      },
    });

    // 5. Monta o corpo do e-mail em HTML simples
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <div style="background:#0e1b2c; color:#f1c232; padding: 20px; text-align:center; border-radius: 12px 12px 0 0;">
          <h1 style="margin:0; font-size:22px;">AGNEP — Novidade</h1>
        </div>
        <div style="border: 1px solid #0e1b2c; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
          <h2 style="color:#0e1b2c; margin-top:0;">${escapeHtml(data.titulo)}</h2>
          <div style="white-space: pre-line; color:#333;">${escapeHtml(data.texto)}</div>
          <p style="margin-top: 24px; color:#666; font-size: 13px;">
            Este é um aviso automático da AGNEP. Para deixar de receber, visite
            <a href="https://agnep.org.br/novidades">agnep.org.br/novidades</a>.
          </p>
        </div>
      </div>
    `;

    // 6. Envia o e-mail para cada inscrito
    let enviados = 0;
    const erros: string[] = [];
    for (const insc of inscritos) {
      try {
        await transporter.sendMail({
          from: '"AGNEP — Núcleo Esportivo e Paradesportivo" <Agnepgoias@gmail.com>',
          to: insc.email,
          subject: `Nova publicação na AGNEP: ${data.titulo}`,
          html,
        });
        enviados += 1;
      } catch (err) {
        erros.push(`${insc.email}: ${String(err)}`);
      }
    }

    if (erros.length > 0) {
      console.warn("Falhas no envio de avisos:", erros);
    }
    return { enviados, erros };
  });

/*
  Tabela de checkpoints (controle de notificações automáticas).
  Guarda o último momento em que os inscritos já foram avisados.
  Quando o admin adiciona conteúdo novo (fotos, resultados, eventos...),
  comparamos o created_at mais recente das tabelas de conteúdo com o checkpoint.
  Se houver conteúdo mais novo que o último aviso, enviamos o e-mail e atualizamos.
*/
// (as const) garante que `nome` seja tratado como a união exata de tabelas
// conhecidas pelo Supabase, evitando erros de tipo nas consultas abaixo.
const TABELAS_CONTEUDO = [
  { nome: "fotos", rotulo: "fotos na galeria" },
  { nome: "albuns", rotulo: "álbuns" },
  { nome: "biblioteca", rotulo: "fotos na biblioteca" },
  { nome: "eventos", rotulo: "eventos" },
  { nome: "resultados", rotulo: "resultados" },
  { nome: "documentos", rotulo: "documentos" },
  { nome: "patrocinadores", rotulo: "patrocinadores" },
  { nome: "equipe", rotulo: "equipe" },
  { nome: "videos", rotulo: "vídeos" },
] as const;

// Função de servidor que detecta conteúdo novo e avisa os inscritos automaticamente.
// É chamada após o admin inserir conteúdo em qualquer área do painel —
// o usuário NÃO precisa publicar nada na área de Novidades.
export const enviarAvisoConteudoNovoFn = createServerFn({ method: "POST" })
  .validator((data: { area: string }) => data)
  .handler(async ({ data }) => {
    // 1. Verifica quem está chamando (mesmo padrão de autenticação do aviso manual)
    const authHeader = getRequestHeader("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
      return { enviados: 0, motivo: "não autenticado" };
    }

    // 2. Valida o usuário e confirma que ele é administrador
    const { data: user, error: userError } = await supabaseServer.auth.getUser(token);
    if (userError || !user.user) {
      return { enviados: 0, motivo: "sessão inválida" };
    }
    const userId = user.user.id;
    const { data: hasAdmin } = await supabaseServer.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (!hasAdmin) {
      return { enviados: 0, motivo: "não é admin" };
    }

    // 3. Busca o último checkpoint (momento do último aviso enviado).
    // Se a tabela inscricao_checkpoints ainda não foi criada no banco,
    // não travamos o admin: apenas pulamos o aviso com motivo claro.
    let checkpoint = new Date(0);
    const { data: cpRow, error: cpError } = await supabaseServer
      .from("inscricao_checkpoints")
      .select("ultimo_aviso")
      .eq("id", 1)
      .maybeSingle();
    if (cpError) {
      return {
        enviados: 0,
        motivo:
          "aviso adiado: a tabela inscricao_checkpoints ainda não existe no banco — aplique o script COMPLETAR-CHECKPOINTS.sql",
      };
    }
    if (cpRow?.ultimo_aviso) {
      checkpoint = new Date(cpRow.ultimo_aviso);
    }

    // 4. Verifica se há conteúdo mais novo que o último aviso
    const atual = new Date();
    const limite = new Date(atual.getTime() - 5 * 60 * 1000); // ignora o que acabou de ser criado nos últimos 5min do próprio admin
    let maisRecente: Date | null = null;
    for (const tabela of TABELAS_CONTEUDO) {
      const { data: rows } = await supabaseServer
        .from(tabela.nome)
        .select("created_at")
        .gt("created_at", checkpoint.toISOString())
        .order("created_at", { ascending: false })
        .limit(1);
      if (rows && rows.length > 0 && rows[0].created_at) {
        const d = new Date(rows[0].created_at);
        if (!maisRecente || d > maisRecente) {
          maisRecente = d;
        }
      }
    }

    // Se não há conteúdo mais novo que o último aviso, nada a fazer
    if (!maisRecente || maisRecente <= checkpoint) {
      return { enviados: 0, motivo: "sem conteúdo novo desde o último aviso" };
    }

    // 5. Busca todos os inscritos ativos
    const { data: inscritos } = await supabaseServer
      .from("inscricoes")
      .select("email")
      .eq("ativo", true);
    if (!inscritos || inscritos.length === 0) {
      await atualizarCheckpoint(atual);
      return { enviados: 0, motivo: "nenhum inscrito" };
    }

    // 6. Envia o e-mail de aviso (só sai se GMAIL_APP_PASSWORD estiver no .env)
    const appPassword = process.env.GMAIL_APP_PASSWORD;
    if (!appPassword) {
      await atualizarCheckpoint(atual);
      return { enviados: 0, motivo: "GMAIL_APP_PASSWORD não configurado" };
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: "Agnepgoias@gmail.com", pass: appPassword },
    });

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <div style="background:#0e1b2c; color:#f1c232; padding: 20px; text-align:center; border-radius: 12px 12px 0 0;">
          <h1 style="margin:0; font-size:22px;">AGNEP — Site Atualizado</h1>
        </div>
        <div style="border: 1px solid #0e1b2c; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
          <p style="color:#0e1b2c; margin-top:0;">
            Olá! O site da AGNEP foi atualizado${data.area ? ` na área de ${escapeHtml(data.area)}` : ""}.
            Acesse <a href="https://agnep.org.br">agnep.org.br</a> para conferir as novidades —
            novos resultados, fotos, eventos e muito mais.
          </p>
          <p style="margin-top: 24px; color:#666; font-size: 13px;">
            Este é um aviso automático da AGNEP. Para deixar de receber, visite
            <a href="https://agnep.org.br/novidades">agnep.org.br/novidades</a>.
          </p>
        </div>
      </div>
    `;

    let enviados = 0;
    const erros: string[] = [];
    for (const insc of inscritos) {
      try {
        await transporter.sendMail({
          from: '"AGNEP — Núcleo Esportivo e Paradesportivo" <Agnepgoias@gmail.com>',
          to: insc.email,
          subject: "AGNEP: o site foi atualizado!",
          html,
        });
        enviados += 1;
      } catch (err) {
        erros.push(`${insc.email}: ${String(err)}`);
      }
    }

    // 7. Atualiza o checkpoint para não avisar de novo do mesmo conteúdo
    await atualizarCheckpoint(atual);

    if (erros.length > 0) {
      console.warn("Falhas no envio de avisos automáticos:", erros);
    }
    return { enviados, erros };
  });

// Atualiza (ou cria) a linha do checkpoint com o momento do último aviso enviado
async function atualizarCheckpoint(agora: Date) {
  const { data: exists } = await supabaseServer
    .from("inscricao_checkpoints")
    .select("id")
    .eq("id", 1)
    .maybeSingle();
  if (exists) {
    await supabaseServer
      .from("inscricao_checkpoints")
      .update({ ultimo_aviso: agora.toISOString() })
      .eq("id", 1);
  } else {
    await supabaseServer
      .from("inscricao_checkpoints")
      .insert({ id: 1, ultimo_aviso: agora.toISOString() })
      .select();
  }
}

/* Função auxiliar que escapa texto para evitar injeção no HTML do e-mail */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
