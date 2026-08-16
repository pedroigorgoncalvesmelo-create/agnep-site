/*
  Arquivo: types.ts
  Propósito: definir tipos TypeScript usados pela integração com Supabase.
  Contém tipos gerados que descrevem o esquema do banco (tabelas, enums, funções),
  além de utilitários genéricos para extrair tipos Row/Insert/Update a partir do esquema.
  Estes comentários explicam o que cada parte faz e por que é útil para o projeto AGNEP.
*/

/* Tipo recursivo que representa qualquer valor JSON válido.
   Usado para campos JSON genéricos ou APIs que retornam dados JSON. */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

/* Tipo principal que representa o esquema do banco de dados usado pelo Supabase.
   Contém informações sobre schemas (aqui apenas "public"), tabelas, views,
   funções, enums e tipos compostos. Este tipo é usado para tipar o cliente Supabase. */
export type Database = {
  // Permite instanciar createClient já com a opção correta do Postgrest.
  // Mantemos essa propriedade interna para facilitar chamadas tipadas ao supabase.
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      /* Tabela 'albuns' - álbuns de fotos do site */
      albuns: {
        Row: {
          capa_url: string | null
          created_at: string
          data_evento: string | null
          descricao: string | null
          id: string
          titulo: string
          updated_at: string
        }
        /* Tipo usado ao inserir um novo registro em 'albuns' (campos opcionais quando há default) */
        Insert: {
          capa_url?: string | null
          created_at?: string
          data_evento?: string | null
          descricao?: string | null
          id?: string
          titulo: string
          updated_at?: string
        }
        /* Tipo usado ao atualizar um registro em 'albuns' (todos os campos opcionais) */
        Update: {
          capa_url?: string | null
          created_at?: string
          data_evento?: string | null
          descricao?: string | null
          id?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      /* Tabela 'documentos' - documentos públicos do site */
      documentos: {
        Row: {
          arquivo_url: string
          categoria: string | null
          created_at: string
          descricao: string | null
          id: string
          titulo: string
          updated_at: string
        }
        Insert: {
          arquivo_url: string
          categoria?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          titulo: string
          updated_at?: string
        }
        Update: {
          arquivo_url?: string
          categoria?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      /* Tabela 'equipe' - membros da equipe/organização */
      equipe: {
        Row: {
          bio: string | null
          cargo: string
          created_at: string
          foto_url: string | null
          id: string
          nome: string
          ordem: number
          updated_at: string
        }
        Insert: {
          bio?: string | null
          cargo: string
          created_at?: string
          foto_url?: string | null
          id?: string
          nome: string
          ordem?: number
          updated_at?: string
        }
        Update: {
          bio?: string | null
          cargo?: string
          created_at?: string
          foto_url?: string | null
          id?: string
          nome?: string
          ordem?: number
          updated_at?: string
        }
        Relationships: []
      }
      /* Tabela 'eventos' - eventos e competições */
      eventos: {
        Row: {
          cidade: string | null
          created_at: string
          data_evento: string
          /* data_fim: término do evento (opcional, para campeonatos de vários dias) */
          data_fim: string | null
          descricao: string | null
          destaque: boolean
          id: string
          imagem_url: string | null
          link_inscricao: string | null
          local: string | null
          modalidade: Database["public"]["Enums"]["modalidade"]
          /* pdf_url: path do PDF anexado ao evento no bucket "documentos" */
          pdf_url: string | null
          titulo: string
          updated_at: string
        }
        Insert: {
          cidade?: string | null
          created_at?: string
          data_evento: string
          /* data_fim: término do evento (opcional) */
          data_fim?: string | null
          descricao?: string | null
          destaque?: boolean
          id?: string
          imagem_url?: string | null
          link_inscricao?: string | null
          local?: string | null
          modalidade?: Database["public"]["Enums"]["modalidade"]
          /* pdf_url: path do PDF anexado ao evento no bucket "documentos" */
          pdf_url?: string | null
          titulo: string
          updated_at?: string
        }
        Update: {
          cidade?: string | null
          created_at?: string
          data_evento?: string
          descricao?: string | null
          destaque?: boolean
          id?: string
          imagem_url?: string | null
          link_inscricao?: string | null
          local?: string | null
          modalidade?: Database["public"]["Enums"]["modalidade"]
          /* data_fim: término do evento (opcional) */
          data_fim?: string | null
          /* pdf_url: path do PDF anexado ao evento no bucket "documentos" */
          pdf_url?: string | null
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      /* Tabela 'fotos' - fotos associadas a álbuns */
      fotos: {
        Row: {
          album_id: string | null
          created_at: string
          id: string
          imagem_url: string
          legenda: string | null
          ordem: number
        }
        Insert: {
          album_id?: string | null
          created_at?: string
          id?: string
          imagem_url: string
          legenda?: string | null
          ordem?: number
        }
        Update: {
          album_id?: string | null
          created_at?: string
          id?: string
          imagem_url?: string
          legenda?: string | null
          ordem?: number
        }
        /* Relacionamento com a tabela 'albuns' via album_id -> id */
        Relationships: [
          {
            foreignKeyName: "fotos_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albuns"
            referencedColumns: ["id"]
          },
        ]
      }
      /* Tabela 'biblioteca' - biblioteca interna de fotos usadas no site ("Trocar Imagem"); não aparece na galeria pública */
      biblioteca: {
        Row: {
          created_at: string
          id: string
          imagem_url: string
          legenda: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          imagem_url: string
          legenda?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          imagem_url?: string
          legenda?: string | null
        }
        Relationships: []
      }
      /* Tabela 'patrocinadores' - patrocinadores do evento/site */
      patrocinadores: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string | null
          id: string
          link: string | null
          logo_url: string | null
          nome: string
          ordem: number
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          link?: string | null
          logo_url?: string | null
          nome: string
          ordem?: number
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          link?: string | null
          logo_url?: string | null
          nome?: string
          ordem?: number
          updated_at?: string
        }
        Relationships: []
      }
      /* Tabela 'resultados' - resultados/conquistas dos atletas */
      resultados: {
        Row: {
          atleta: string
          categoria: string | null
          colocacao: string
          competicao: string
          created_at: string
          data_conquista: string
          descricao: string | null
          id: string
          imagem_url: string | null
          modalidade: Database["public"]["Enums"]["modalidade"]
          updated_at: string
        }
        Insert: {
          atleta: string
          categoria?: string | null
          colocacao: string
          competicao: string
          created_at?: string
          data_conquista: string
          descricao?: string | null
          id?: string
          imagem_url?: string | null
          modalidade?: Database["public"]["Enums"]["modalidade"]
          updated_at?: string
        }
        Update: {
          atleta?: string
          categoria?: string | null
          colocacao?: string
          competicao?: string
          created_at?: string
          data_conquista?: string
          descricao?: string | null
          id?: string
          imagem_url?: string | null
          modalidade?: Database["public"]["Enums"]["modalidade"]
          updated_at?: string
        }
        Relationships: []
      }
      /* Tabela 'site_content' - conteúdo dinâmico do site (chave/valor) */
      site_content: {
        Row: {
          key: string
          kind: string
          updated_at: string
          updated_by: string | null
          value: string | null
        }
        Insert: {
          key: string
          kind?: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          key?: string
          kind?: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Relationships: []
      }
      /* Tabela 'site_stats' - estatísticas exibidas no site */
      site_stats: {
        Row: {
          created_at: string
          id: string
          label: string
          ordem: number
          updated_at: string
          valor: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          ordem?: number
          updated_at?: string
          valor: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          ordem?: number
          updated_at?: string
          valor?: string
        }
        Relationships: []
      }
      /* Tabela 'user_roles' - papéis/roles atribuídos aos usuários */
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      /* Tabela 'videos' - vídeos (YouTube) relacionados ao site */
      videos: {
        Row: {
          created_at: string
          data_publicacao: string
          descricao: string | null
          id: string
          modalidade: Database["public"]["Enums"]["modalidade"]
          titulo: string
          updated_at: string
          youtube_id: string
        }
        Insert: {
          created_at?: string
          data_publicacao?: string
          descricao?: string | null
          id?: string
          modalidade?: Database["public"]["Enums"]["modalidade"]
          titulo: string
          updated_at?: string
          youtube_id: string
        }
        Update: {
          created_at?: string
          data_publicacao?: string
          descricao?: string | null
          id?: string
          modalidade?: Database["public"]["Enums"]["modalidade"]
          titulo?: string
          updated_at?: string
          youtube_id?: string
        }
        Relationships: []
      }
      /* Tabela 'novidades' - publicações da área Fique por Dentro das Novidades (v7) */
      novidades: {
        Row: {
          created_at: string
          id: string
          publicado: boolean
          texto: string
          titulo: string
        }
        /* Tipo usado ao inserir um novo registro em 'novidades' */
        Insert: {
          created_at?: string
          id?: string
          publicado?: boolean
          texto: string
          titulo: string
        }
        /* Tipo usado ao atualizar um registro em 'novidades' */
        Update: {
          created_at?: string
          id?: string
          publicado?: boolean
          texto?: string
          titulo?: string
        }
        Relationships: []
      }
      /* Tabela 'inscricao_checkpoints' - controle do último aviso automático enviado (v8) */
      inscricao_checkpoints: {
        Row: {
          id: number
          ultimo_aviso: string | null
        }
        Insert: {
          id: number
          ultimo_aviso?: string | null
        }
        Update: {
          id?: number
          ultimo_aviso?: string | null
        }
        Relationships: []
      }
      /* Tabela 'inscricoes' - assinantes de e-mail das novidades (v7) */
      inscricoes: {
        Row: {
          ativo: boolean
          created_at: string
          email: string
          id: string
        }
        /* Tipo usado ao inserir um novo registro em 'inscricoes' */
        Insert: {
          ativo?: boolean
          created_at?: string
          email: string
          id?: string
        }
        /* Tipo usado ao atualizar um registro em 'inscricoes' */
        Update: {
          ativo?: boolean
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
    }
    /* Views: nenhum view definido no momento (mapeado como never) */
    Views: {
      [_ in never]: never
    }
    /* Funções armazenadas no banco acessíveis via supabase.rpc */
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    /* Enums definidos no schema public (usados para campos tipados) */
    Enums: {
      app_role: "admin"
      modalidade: "jiu-jitsu" | "xadrez" | "geral"
    }
    /* Tipos compostos (nenhum definido aqui) */
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

/* Remove propriedades internas (úteis para tipar o cliente sem metadados internos) */
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

/* Pega o schema "public" do banco, ignorando as internas */
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

/*
  Utility genérico Tables:
  - Quando passado o nome de uma tabela (ou opções com schema), retorna o tipo Row da tabela.
  - Útil para inferir o tipo exato de registros retornados pelo supabase.
  - Explicação curta: aceita "Tabela" ou { schema: 'public' } e resolve para Row.
*/
export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

/*
  Utility genérico TablesInsert:
  - Retorna o tipo necessário para inserir (Insert) em uma tabela.
  - Mantém as regras de campos opcionais conforme definido no esquema.
*/
export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

/*
  Utility genérico TablesUpdate:
  - Retorna o tipo usado para atualizações (Update) em uma tabela.
  - Útil para tipar os objetos passados ao método update do supabase.
*/
export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

/*
  Utility genérico Enums:
  - Resolve para o tipo de um enum do schema (por exemplo 'modalidade' ou 'app_role').
  - Aceita nome do enum ou opções com schema.
*/
export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

/*
  Utility genérico CompositeTypes:
  - Resolve tipos compostos definidos no schema (aqui nenhum definido).
  - Mantido para compatibilidade caso sejam adicionados no futuro.
*/
export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

/* Constantes em tempo de execução que representam os valores permitidos dos enums.
   Útil para validação e para evitar strings mágicas espalhadas pelo código. */
export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
      modalidade: ["jiu-jitsu", "xadrez", "geral"],
    },
  },
} as const
