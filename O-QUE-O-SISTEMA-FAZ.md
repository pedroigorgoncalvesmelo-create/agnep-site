# O Que o Sistema Faz — Inventário Completo de Funcionalidades AGNEP

Este documento responde à pergunta "o que o site da AGNEP já faz, exatamente?". Ele foi atualizado em **13 de agosto de 2026** e cobre todas as funcionalidades do sistema, tanto as visíveis ao público quanto as disponíveis apenas ao administrador.

## 1. Páginas públicas (visíveis a qualquer visitante)

O site possui nove páginas públicas, cada uma com título de página e descrição próprios para os motores de busca. A **Início** apresenta a associação com um banner principal, o emblema, as metas da associação e botões de ação. A página **Sobre** traz missão, visão, valores e as duas modalidades (Jiu-Jitsu e Xadrez). **Eventos** exibe o calendário de competições com filtros por modalidade e permite ver detalhes de cada evento. **Resultados** mostra o histórico de medalhas, troféus e títulos dos atletas. **Galeria de Fotos** exibe as fotos organizadas em álbuns por torneio ou evento, com legendas. **Galeria de Vídeos** exibe vídeos do YouTube embutidos no site. **Documentos** permite baixar regulamentos, folders e materiais oficiais enviados pelo administrador. **Patrocinadores** apresenta os parceiros e apoiadores com opção de contato para novas parcerias. **Contato** reúne telefone, e-mail, redes sociais (incluindo o Instagram oficial da AGNEP no rodapé) e a localização da sede em Itumbiara - GO.

Em todas as páginas o visitante pode navegar pelo menu superior, que no celular se transforma em um **menu hambúrguer**, e o rodapé se reorganiza automaticamente para telas pequenas.

A décima página pública é a **Novidades** (`/novidades`, também linkada no rodapé): qualquer visitante pode se inscrever digitando o e-mail para receber avisos por e-mail sempre que uma nova publicação for feita, e a página exibe as publicações mais recentes da associação em cartões com título, data e texto.

## 2. Painel de administração (apenas para o e-mail autorizado)

O painel fica na rota `/admin` e exige login no endereço `/auth`. Só o e-mail autorizado (**pedroigorgoncalvesmelo@gmail.com**) com a função de administrador no banco consegue acessar os recursos de edição. Dentro do painel existem dez módulos, detalhados a seguir.

| Módulo | O que o administrador consegue fazer |
|---|---|
| Início (`admin`) | Gerenciar estatísticas do site (medalhas, atletas filiados, títulos, projetos) |
| Textos (`admin/home`) | Editar todos os textos da página inicial: título, subtítulo, descrições |
| Galeria (`admin/galeria`) | Criar álbuns de eventos, anexar fotos da biblioteca aos álbuns, editar legendas e remover fotos |
| Eventos (`admin/eventos`) | Criar, editar e remover eventos e torneios do calendário |
| Resultados (`admin/resultados`) | Registrar medalhas, troféus e títulos conquistados |
| Vídeos (`admin/videos`) | Adicionar e remover vídeos do YouTube na galeria |
| Equipe (`admin/equipe`) | Gerenciar a equipe e os perfis apresentados no site |
| Patrocinadores (`admin/patrocinadores`) | Adicionar, editar e remover patrocinadores |
| Documentos (`admin/documentos`) | Enviar e remover documentos para download público |
| Novidades (`admin/novidades`) | Criar, publicar, despublicar e excluir novidades; ver a lista de inscritos e remover e-mails; ao publicar, o sistema envia um e-mail de aviso para todos os inscritos (configuração no arquivo `GUIA-EMAIL-NOVIDADES.md`) |

## 3. Biblioteca de imagens e troca de fotos

O sistema mantém duas áreas de fotos separadas. A **biblioteca interna** (tabela `biblioteca` no banco) guarda todas as fotos enviadas pelo administrador através dos botões "Trocar Imagem" das páginas — essas fotos servem apenas para decorar o site (banner, cards, imagens de modalidades). A **galeria pública** (tabelas `albuns` e `fotos`) exibe somente as fotos que o administrador anexou manualmente a um evento ou torneio. O seletor de mídia (**MediaPicker**) permite escolher fotos da biblioteca, enviar novas fotos direto do computador e pesquisar por nome ou legenda.

## 4. Autenticação e controle de acesso

O login usa o Supabase Auth com fluxo PKCE (códigos de verificação em vez de tokens na URL, mais seguro). Contas novas criadas pelo formulário público exigem confirmação por e-mail e nascem **sem qualquer privilégio** — a função de administrador é concedida apenas por script SQL no banco, que fica inacessível a visitantes. As permissões do banco usam **RLS (Row Level Security)**: cada tabela tem políticas que definem exatamente quem pode ler, criar, editar ou apagar cada dado, e essas políticas se aplicam mesmo que alguém tente atacar o banco diretamente sem passar pelo site.

## 5. Segurança aplicada ao site

O servidor do site envia cabeçalhos de segurança em todas as respostas: política de conteúdo restritiva (impede código malicioso de rodar), HSTS (força conexão criptografada), bloqueio de enquadramento por outros sites (anti-clickjacking), proteção contra detecção de tipo de arquivo, política de referenciador e bloqueio de câmera, microfone e localização. Além disso, há um registro de auditoria (`admin_audit_log`) que grava quem alterou o quê no sistema, e todos os erros do site são capturados por um sistema de tratamento de erros centralizado.

## 6. Estrutura técnica do projeto

O site é construído com **React 19** e **TanStack Start** (interface e navegação), **Vite 8** (ferramenta de desenvolvimento e build), **Tailwind CSS 4** (visual responsivo) e **TypeScript** (código com verificação de tipos). A infraestrutura de dados e login é o **Supabase** (PostgreSQL na nuvem, com armazenamento de fotos e autenticação). O projeto é 100% independente: roda em qualquer computador com Node.js, sem depender de plataformas pagas.

## 7. O que ainda não está configurado

Os contadores da página inicial (medalhas, atletas filiados, títulos, projetos) mostram zero até que o administrador os edite pela primeira vez no painel. O calendário de eventos está vazio até o primeiro evento ser cadastrado. O telefone e o e-mail de contato ainda usam valores de exemplo (o administrador pode atualizar os textos). A galeria de fotos e de vídeos também começam vazias, aguardando o conteúdo dos primeiros torneios.

> **Nota (versão 7):** para a área de Novidades funcionar, o administrador precisa executar o script `supabase/migrations/20260815000000_novidades.sql` no SQL Editor do Supabase (cria as tabelas `novidades` e `inscricoes` com suas travas de segurança).
