/*
  Arquivo: router.tsx
  Propósito: Configurar e exportar uma função que cria o roteador da aplicação AGNEP.
  Este arquivo integra o roteador do @tanstack/react-router com um QueryClient do
  @tanstack/react-query e define opções de comportamento (ex: restauração de scroll).
  Comentários abaixo explicam o QUE cada parte faz e POR QUE é necessária.
*/

import { QueryClient } from "@tanstack/react-query";
// Importa a função para criar o roteador do TanStack Router
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
// Importa a árvore de rotas gerada (estrutura de rotas da aplicação)

/* 
  Função pública que cria e retorna uma instância do roteador configurada.
  Mantemos essa lógica em uma função para poder criar instâncias isoladas
  durante testes ou inicialização da aplicação.
*/
export const getRouter = () => {
  // Cria um QueryClient para gerenciar cache, requisições e estado assíncrono
  // usando o @tanstack/react-query. Esse cliente será disponibilizado no contexto
  // do roteador para que loaders/actions das rotas possam acessá-lo.
  const queryClient = new QueryClient();

  /* 
    Cria o roteador com as opções principais:
    - routeTree: a estrutura de rotas da aplicação.
    - context: objetos que queremos disponibilizar globalmente para loaders/actions (aqui o queryClient).
    - scrollRestoration: ativa a restauração de posição de scroll entre navegações.
    - defaultPreloadStaleTime: controla por quanto tempo pré-carregamentos são considerados válidos (0 = não considera válidos por padrão).
  */
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  // Retorna a instância configurada do roteador para uso na aplicação.
  return router;
};
