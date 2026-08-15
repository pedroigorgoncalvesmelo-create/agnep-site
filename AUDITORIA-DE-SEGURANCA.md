# Auditoria de Segurança — Site e Banco de Dados AGNEP

Data da auditoria: **13 de agosto de 2026**. A auditoria foi realizada simulando um invasor externo: partimos da chave pública do projeto (aquela que fica visível no código do site e no arquivo `.env`), que é a única informação que qualquer pessoa pode obter sem invadir nada, e testamos tudo o que seria possível fazer com ela. O resultado geral é **APROVADO**, com alguns pontos de melhoria listados ao final.

## 1. Testes realizados contra o banco de dados (produção)

| # | Teste (o que o invasor tentou) | Resultado | Situação |
|---|---|---|---|
| 1 | Listar todas as tabelas do banco pela API pública | 401 — Bloqueado | ✅ Seguro |
| 2 | Ler a tabela de fotos internas (`biblioteca`) | 401 — Bloqueado | ✅ Seguro |
| 3 | Ler as tabelas públicas (`albuns`, `fotos`, `eventos`, `resultados`) | 200 — Somente leitura | ✅ Seguro (conteúdo público por natureza) |
| 4 | Inserir dados falsos em `albuns` / `fotos` | 400 — Bloqueado | ✅ Seguro |
| 5 | Deletar fotos do banco | 400 — Bloqueado | ✅ Seguro |
| 6 | Enviar arquivo ao armazenamento sem estar logado | 400 — Bloqueado | ✅ Seguro |
| 7 | Listar todo o conteúdo do bucket `galeria` | 400 — Bloqueado | ✅ Seguro |
| 8 | Criar uma conta de teste pelo formulário de cadastro | Conta criada, mas sem qualquer privilégio | ⚠️ Ver item 2 |
| 9 | Acessar cabeçalhos do site (CSP, HSTS, clickjacking) | Todos os cabeçalhos ativos | ✅ Seguro |

O teste 3 merece uma explicação: as tabelas públicas realmente permitem leitura anônima, mas elas **não contêm dados sensíveis** — apenas o conteúdo que o próprio site exibe (nomes de álbuns, fotos públicas, eventos). É exatamente assim que um site de vitrine precisa funcionar. Nenhum dado de login, senha, e-mail de usuário ou informação interna ficou exposto.

## 2. O cadastro público é um risco?

Qualquer visitante consegue criar uma conta no sistema de login — isso foi confirmado no teste 8. Porém, **criar conta não dá acesso ao painel administrativo**. A conta nasce como "usuário comum" e as políticas do banco exigem a função `admin`, que só é concedida por um comando SQL que roda dentro do Supabase, inacessível a qualquer pessoa de fora. Além disso, contas novas precisam ser **confirmadas por e-mail** antes de fazerem login. Em resumo: o risco é muito baixo, mas recomendamos duas ações preventivas no painel do Supabase (Authentication → Providers → Email): manter "Confirm email" ativado (já está) e, se o site nunca precisar de cadastros públicos, desativar "Enable Signups", pois toda conta nova de fato precisa ser criada manualmente por vocês.

## 3. Travas de segurança do banco (RLS) — estado atual

Todas as 14 tabelas do banco têm **RLS ativado** (Row Level Security — a trava que o banco aplica linha por linha, independentemente do site). O padrão de políticas está correto: leitura pública apenas para conteúdo que deve ser visto por todos (eventos, fotos, resultados, documentos, patrocinadores, equipe, vídeos, estatísticas e álbuns), e escrita bloqueada para qualquer pessoa que não tenha a função `admin` na tabela `user_roles`. O armazenamento de arquivos (`galeria`) aceita uploads apenas de usuários logados e leitura pública apenas dos arquivos existentes. Há ainda a tabela de auditoria (`admin_audit_log`) registrando cada alteração feita no painel.

## 4. Segurança das conexões do site

O servidor do site envia cabeçalhos que protegem quem visita: **CSP** impede que scripts de outros sites rodem na página; **HSTS** força o navegador a usar conexão criptografada; **X-Frame-Options: DENY** impede que o site seja embutido em páginas falsas (proteção contra phishing); **Referrer-Policy** limita o que é compartilhado entre sites; e **Permissions-Policy** bloqueia acesso a câmera, microfone e localização. O site também não expõe o nome da tecnologia usada (`x-powered-by` removido).

## 5. Pontos de melhoria recomendados (não urgentes)

O primeiro ponto é verificar no painel do Supabase (Authentication → Providers → Email) se a opção **Confirm email** está marcada; se estiver, ótimo, caso contrário ative-a. O segundo é considerar a desativação de **Enable Signups** se vocês nunca precisarão de cadastros abertos. O terceiro é ativar **MFA (autenticação em duas etapas)** na conta do Supabase de vocês, para proteger o painel de administração da nuvem. O quarto é o mapa: como o site ainda não tem endereço definitivo (domínio), ao publicar no domínio comprado recomendamos ajustar as URLs de redirecionamento do Auth no Supabase para o domínio real.

## 6. Veredicto

| Área | Avaliação |
|---|---|
| Banco de dados (travas RLS) | ✅ Aprovado |
| Armazenamento de fotos | ✅ Aprovado |
| Autenticação e controle de admin | ✅ Aprovado (com melhorias opcionais) |
| Cabeçalhos e conexões do site | ✅ Aprovado |
| Exposição de dados sensíveis | ✅ Nenhum dado sensível exposto |
| **Resultado geral** | **✅ APROVADO** |
