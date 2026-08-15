/*
  Arquivo: utils.ts
  Propósito: Funções utilitárias para manipulação de classes CSS usadas pela aplicação AGNEP.
  O principal objetivo deste arquivo é fornecer uma função que una classes condicionais/variadas
  e, ao mesmo tempo, resolva conflitos específicos do Tailwind CSS (por exemplo, múltiplas
  classes de cor ou padding aplicadas em diferentes lugares).
  Comentários adicionais explicam O QUE e POR QUE de cada parte para desenvolvedores iniciantes.
*/

import { clsx, type ClassValue } from "clsx"; // clsx monta uma string de classes a partir de valores variados; ClassValue é o tipo aceito
import { twMerge } from "tailwind-merge"; // twMerge resolve conflitos de classes do Tailwind (mantém a última regra válida)

/*
  Função: cn
  O QUE: Recebe vários valores de classes (strings, objetos condicionais, arrays, etc.) e retorna
        uma única string de classes já fundida e com conflitos do Tailwind resolvidos.
  POR QUE: Usamos clsx para permitir sintaxes condicionais e variadas ao declarar classes e twMerge
          para garantir que, quando houver classes conflitantes do Tailwind, a versão correta
          (normalmente a última declarada) seja aplicada sem necessidade de lógica extra.
*/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
