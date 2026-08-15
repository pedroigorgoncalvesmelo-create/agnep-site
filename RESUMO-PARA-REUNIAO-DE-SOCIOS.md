# AGNEP — Resumo do Projeto para Reunião de Sócios

Este documento resume, de forma simples, o estado atual do site da AGNEP, o que ele oferece e as opções de evolução, para apoiar a reunião de sócios.

## 1. O que é o projeto

O site da AGNEP é a presença digital da **Associação Goiana Núcleo Esportivo e Paradesportivo**, localizada em **Itumbiara - GO**, dedicada ao **Jiu-Jitsu** e ao **Xadrez**. Ele apresenta a associação ao público, divulga eventos e torneios, publica resultados, exibe a galeria de fotos organizada por competição e disponibiliza documentos e informações sobre patrocinadores.

## 2. O que já está pronto e funcionando

| Área | Situação |
|---|---|
| Página inicial com apresentação da associação | ✅ Funcionando |
| Seções de Jiu-Jitsu e Xadrez com identidade visual própria | ✅ Funcionando |
| Página de eventos e torneios | ✅ Funcionando |
| Resultados e conquistas | ✅ Funcionando |
| Galeria de fotos organizada por eventos (passados e futuros) | ✅ Funcionando |
| Documentos e patrocinadores | ✅ Funcionando |
| Painel de administração com login seguro | ✅ Funcionando |
| Edição de textos do site pelo administrador | ✅ Funcionando |
| Troca de imagens enviando fotos direto do computador | ✅ Funcionando |
| Criação de eventos com galeria de fotos e legendas | ✅ Funcionando |
| Biblioteca interna de imagens (fotos guardadas no banco) | ✅ Funcionando |
| Link do Instagram da AGNEP no rodapé | ✅ Funcionando |
| Localização real: Itumbiara - GO | ✅ Funcionando |
| Banco de dados com controle de permissões e auditoria | ✅ Funcionando |
| Armazenamento de fotos com regras de segurança | ✅ Funcionando |

O projeto é **100% independente** e roda localmente no computador, sem depender de plataformas pagas. Os dados ficam no Supabase (plano gratuito suficiente para o uso atual) e a marca registrada é o logo oficial da AGNEP presente em todo o site.

## 3. Segurança e controle de acesso

Apenas o e-mail autorizado (**pedroigorgoncalvesmelo@gmail.com**) tem permissão de administrador. Qualquer pessoa que visite o site consegue apenas **ver o conteúdo público**; para criar ou editar qualquer informação é obrigatório fazer login, e o painel reconhece apenas usuários com a função de admin configurada no banco de dados. O banco possui auditoria automática que registra todas as alterações feitas.

## 4. Ideias para melhorias futuras

Estas sugestões podem ser levadas à reunião para decisão dos sócios:

1. **Domínio próprio** — apontar o domínio já comprado para o site, deixando o endereço profissional (por exemplo, `agnep.com.br`)
2. **Formulário de inscrição** — receber inscrições para aulas e torneios direto pelo site
3. **Calendário de treinos** — exibir horários e turmas de Jiu-Jitsu e Xadrez
4. **Página de atletas e professores** — apresentar a equipe e seus títulos
5. **Integração com o Instagram** — exibir as últimas publicações no site
6. **Área de notícias** — blog simples com novidades da associação
7. **Plataforma de torneios de xadrez** — quadro de jogos e resultados por rodada
8. **Aplicativo mobile no futuro** — versão para celular para avisos e convocações

## 5. Custos atuais

O site roda em software livre e no plano gratuito do Supabase. Os únicos custos são o **domínio** (já comprado) e, no futuro, a **hospedagem** (pode usar serviços gratuitos ou planos baixos).

## 6. Conclusão

O projeto está estável, funcional e completamente administrável pela própria associação. É um patrimônio digital da AGNEP que cresce conforme novas necessidades surgirem.
