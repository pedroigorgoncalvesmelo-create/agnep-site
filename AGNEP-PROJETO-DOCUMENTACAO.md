# Documentação Completa do Projeto AGNEP

Este documento apresenta uma visão detalhada do site da Associação Goiana Núcleo Esportivo e Paradesportivo (AGNEP). O objetivo é explicar como o sistema foi construído, quais funcionalidades estão ativas e como gerenciar o conteúdo.

## Visão Geral do Projeto

A AGNEP desenvolveu uma plataforma web completa para divulgar suas atividades em duas modalidades principais: Jiu-Jitsu e Xadrez. O sistema foi projetado para ser interativo, seguro e totalmente gerenciável pela equipe administrativa da associação. A plataforma permite a exibição de notícias, galerias de fotos, vídeos do YouTube, resultados de competições e documentos institucionais.

A arquitetura do site baseia-se em tecnologias modernas de desenvolvimento web, garantindo velocidade, responsividade em dispositivos móveis e fácil manutenção. O código-fonte é mantido em TypeScript e React, com estilização via Tailwind CSS, enquanto o banco de dados e o armazenamento de arquivos são gerenciados pelo Supabase.

## Arquitetura Técnica

O projeto foi estruturado utilizando uma combinação de ferramentas de última geração, escolhidas para garantir performance e facilidade de desenvolvimento. A tabela abaixo resume as principais tecnologias empregadas:

| Tecnologia | Função no Sistema |
|---|---|
| **React 19 & TanStack Start** | Gerenciamento de rotas, renderização do frontend e navegação entre páginas sem recarregamento. |
| **Tailwind CSS** | Framework de estilização que define as cores, layouts e animações do site. |
| **TypeScript** | Linguagem de programação que garante segurança de tipos e evita erros no código. |
| **Supabase** | Plataforma de backend que armazena o banco de dados relacional e os arquivos de mídia. |
| **Lovable Cloud** | Plataforma de hospedagem (hosting) onde o site é executado e acessado pelo público. |

## Estrutura de Páginas Públicas

O site está dividido em várias seções que podem ser acessadas através do menu principal no topo da página. Cada página tem um propósito específico dentro da comunicação da associação.

A **Página Inicial** é o cartão de visitas do site. Ela apresenta um banner de destaque com o slogan da associação, estatísticas de medalhas e atletas, as próximas competições e seções dedicadas ao Jiu-Jitsu e ao Xadrez. A seção **Sobre** contém a história, missão, visão e valores da AGNEP. A página de **Eventos** lista todos os torneios futuros, enquanto a página de **Resultados** exibe as conquistas e medalhas dos atletas.

A seção multimídia é composta pela **Galeria de Fotos** e pela **Galeria de Vídeos**, que exibe conteúdo carregado pelo administrador e também integra vídeos do YouTube. A página de **Documentos** permite que os visitantes baixem arquivos PDF institucionais, como estatutos e regulamentos. Por fim, a página de **Contato** fornece um formulário e informações para entrar em contato com a associação.

## Funcionalidades Administrativas

O sistema possui um painel administrativo completo, acessível através do caminho `/admin`. O acesso a esta área é restrito a usuários autenticados com a permissão de "admin" no banco de dados.

### Gerenciamento de Dados

O administrador tem controle total sobre o conteúdo exibido nas páginas públicas. Através de formulários intuitivos, é possível criar, editar e excluir eventos, cadastrar resultados de competições, fazer upload de fotos para a galeria, adicionar links de vídeos do YouTube e enviar documentos PDF. Além disso, o painel permite gerenciar os patrocinadores e a equipe de professores.

### Edição Inline de Conteúdo

Para facilitar a atualização rápida de textos e imagens, o site utiliza um sistema de edição inline. Quando um administrador acessa o site com sua conta, um botão de "lápis" aparece no canto superior direito. Ao ativar o modo de edição, o administrador pode clicar no ícone de lápis que aparece ao lado de qualquer texto ou imagem pré-definida no layout e alterá-lo instantaneamente, sem precisar acessar o painel administrativo completo.

### Blocos de Conteúdo Editáveis

Recentemente, foi adicionado um novo sistema de **Blocos de Conteúdo**. Esta funcionalidade permite que o administrador crie seções de texto ou imagem e as insira em qualquer página do site. No painel de "Blocos de Conteúdo", o administrador define a página de destino, o tipo de bloco (texto ou imagem) e o conteúdo. Esses blocos podem ser reordenados e alinhados (à esquerda, centro ou direita) conforme a necessidade visual da página.

## Segurança e Proteção de Dados

Para garantir a integridade das informações e proteger a plataforma contra ataques, diversas camadas de segurança foram implementadas no sistema.

A primeira linha de defesa são os **Headers de Segurança HTTP**. O servidor envia instruções ao navegador para forçar o uso de conexões criptografadas (HTTPS), bloquear a execução de scripts maliciosos (Content Security Policy) e impedir que o site seja embutido em outros sites (X-Frame-Options).

A segunda camada de proteção atua no momento do envio de arquivos. O sistema realiza uma **validação rigorosa de uploads**. Apenas arquivos com extensões permitidas (como PDF, JPG e PNG) são aceitos, e há um limite máximo de tamanho para evitar o esgotamento de espaço no servidor. Além disso, os nomes dos arquivos são automaticamente renomeados para códigos aleatórios, prevenindo ataques de injeção de arquivos.

A terceira camada está no **Banco de Dados**. O Supabase utiliza políticas de segurança em nível de linha (RLS). Isso significa que usuários anônimos (não logados) só têm permissão para ler os dados públicos do site. Qualquer tentativa de alterar, adicionar ou excluir informações no banco de dados requer autenticação e a função específica de administrador. Um sistema de auditoria também foi implementado, registrando todas as ações administrativas para fins de rastreamento.

## Design e Experiência do Usuário

O design visual do site foi cuidadosamente construído para transmitir profissionalismo e energia esportiva. A paleta de cores principal utiliza tons de dourado e azul marinho, criando um contraste elegante que remete à conquista (ouro) e à disciplina.

Para tornar a navegação mais agradável, foram incluídas **animações sutis e elegantes**. Elementos como botões e cartões de informações apresentam transições suaves ao passar o cursor (efeito hover), e as seções da página possuem animações de entrada discretas. O layout é totalmente responsivo, garantindo que a experiência seja perfeita tanto em computadores quanto em smartphones.
