/*
  Arquivo: avatar.tsx
  Propósito: Componentes de Avatar reutilizáveis para o site AGNEP.
  O que contém:
    - Avatar: contêiner principal com estilo de círculo.
    - AvatarImage: imagem dentro do avatar.
    - AvatarFallback: fallback exibido quando a imagem não carrega.
  Por que existe:
    - Usa primitives do Radix UI para acessibilidade e comportamento previsível.
    - Fornece uma API simples para exibir imagens de perfil com fallback estilizado.
*/

"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

// Componente Avatar: envoltório principal que define o tamanho, formato e overflow.
// Usamos forwardRef para permitir referências a partir de componentes pais (por exemplo, para foco).
// Mantemos as props do Radix AvatarPrimitive.Root para compatibilidade direta.
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    // cn é uma utilidade para concatenar classes condicionais.
    // Aqui definimos um avatar circular padrão (h-10 w-10) e permitimos sobrescrever com className.
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
/* Expondo o displayName para facilitar debug no React DevTools.
   Atribuímos o mesmo nome do primitive para manter consistência. */
Avatar.displayName = AvatarPrimitive.Root.displayName;

// Componente AvatarImage: renderiza a imagem dentro do avatar.
// Usa as props do Radix AvatarPrimitive.Image e forwardRef para compatibilidade.
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    // Garantimos que a imagem preencha o contêiner mantendo proporção (aspect-square).
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
/* Mantemos o displayName do primitive para facilitar identificação no DevTools. */
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

// Componente AvatarFallback: exibido quando a imagem não está disponível ou falha no carregamento.
// Fornece um estado visual alternativo (ex.: iniciais do usuário, ícone, etc.).
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    // Estilização de fallback: centraliza conteúdo e usa uma cor de fundo neutra (bg-muted).
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
));
/* Novamente, manter o displayName alinhado ao primitive para melhor debug. */
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Exportamos os três componentes para uso em outras partes da aplicação.
export { Avatar, AvatarImage, AvatarFallback };
