export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      estabelecimentos_esportivos: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          criado_em: string | null
          descricao: string | null
          email: string | null
          estado: string | null
          estrutura: string[] | null
          horario_funcionamento: string | null
          id: string
          imagem_url: string | null
          latitude: number | null
          longitude: number | null
          modalidades: string[] | null
          nome: string
          numero: string | null
          rua: string | null
          site: string | null
          telefone: string | null
          user_id: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          criado_em?: string | null
          descricao?: string | null
          email?: string | null
          estado?: string | null
          estrutura?: string[] | null
          horario_funcionamento?: string | null
          id?: string
          imagem_url?: string | null
          latitude?: number | null
          longitude?: number | null
          modalidades?: string[] | null
          nome: string
          numero?: string | null
          rua?: string | null
          site?: string | null
          telefone?: string | null
          user_id?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          criado_em?: string | null
          descricao?: string | null
          email?: string | null
          estado?: string | null
          estrutura?: string[] | null
          horario_funcionamento?: string | null
          id?: string
          imagem_url?: string | null
          latitude?: number | null
          longitude?: number | null
          modalidades?: string[] | null
          nome?: string
          numero?: string | null
          rua?: string | null
          site?: string | null
          telefone?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estabelecimentos_esportivos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      eventos_esportivos: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          criado_em: string | null
          data: string | null
          descricao: string | null
          estado: string | null
          evento_privado: boolean | null
          hora: string | null
          id: string
          imagem_url: string | null
          ingressos_disponiveis: number | null
          latitude: number | null
          link_compra: string | null
          longitude: number | null
          modalidade: string | null
          numero: string | null
          organizador_id: string | null
          rua: string | null
          tipo_organizador: string | null
          titulo: string
          valor_ingresso: number | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          criado_em?: string | null
          data?: string | null
          descricao?: string | null
          estado?: string | null
          evento_privado?: boolean | null
          hora?: string | null
          id?: string
          imagem_url?: string | null
          ingressos_disponiveis?: number | null
          latitude?: number | null
          link_compra?: string | null
          longitude?: number | null
          modalidade?: string | null
          numero?: string | null
          organizador_id?: string | null
          rua?: string | null
          tipo_organizador?: string | null
          titulo: string
          valor_ingresso?: number | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          criado_em?: string | null
          data?: string | null
          descricao?: string | null
          estado?: string | null
          evento_privado?: boolean | null
          hora?: string | null
          id?: string
          imagem_url?: string | null
          ingressos_disponiveis?: number | null
          latitude?: number | null
          link_compra?: string | null
          longitude?: number | null
          modalidade?: string | null
          numero?: string | null
          organizador_id?: string | null
          rua?: string | null
          tipo_organizador?: string | null
          titulo?: string
          valor_ingresso?: number | null
        }
        Relationships: []
      }
      grupos_esportivos: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          criado_em: string | null
          descricao: string | null
          dias_semana: string[] | null
          estado: string | null
          horario: string | null
          id: string
          latitude: number | null
          longitude: number | null
          modalidade: string | null
          nome: string
          numero: string | null
          publico_alvo: string | null
          rua: string | null
          tem_local_fisico: boolean | null
          user_id: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          criado_em?: string | null
          descricao?: string | null
          dias_semana?: string[] | null
          estado?: string | null
          horario?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          modalidade?: string | null
          nome: string
          numero?: string | null
          publico_alvo?: string | null
          rua?: string | null
          tem_local_fisico?: boolean | null
          user_id?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          criado_em?: string | null
          descricao?: string | null
          dias_semana?: string[] | null
          estado?: string | null
          horario?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          modalidade?: string | null
          nome?: string
          numero?: string | null
          publico_alvo?: string | null
          rua?: string | null
          tem_local_fisico?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grupos_esportivos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      profissionais_esportivos: {
        Row: {
          atende_em_estabelecimento: boolean | null
          bairro: string | null
          bio: string | null
          cep: string | null
          cidade: string | null
          criado_em: string | null
          email: string | null
          especialidade: string | null
          estabelecimentos_ids: string[] | null
          estado: string | null
          horarios_disponiveis: string | null
          id: string
          imagem_url: string | null
          instagram: string | null
          latitude: number | null
          longitude: number | null
          modalidades: string[] | null
          nome: string
          numero: string | null
          rua: string | null
          site: string | null
          telefone: string | null
          user_id: string | null
        }
        Insert: {
          atende_em_estabelecimento?: boolean | null
          bairro?: string | null
          bio?: string | null
          cep?: string | null
          cidade?: string | null
          criado_em?: string | null
          email?: string | null
          especialidade?: string | null
          estabelecimentos_ids?: string[] | null
          estado?: string | null
          horarios_disponiveis?: string | null
          id?: string
          imagem_url?: string | null
          instagram?: string | null
          latitude?: number | null
          longitude?: number | null
          modalidades?: string[] | null
          nome: string
          numero?: string | null
          rua?: string | null
          site?: string | null
          telefone?: string | null
          user_id?: string | null
        }
        Update: {
          atende_em_estabelecimento?: boolean | null
          bairro?: string | null
          bio?: string | null
          cep?: string | null
          cidade?: string | null
          criado_em?: string | null
          email?: string | null
          especialidade?: string | null
          estabelecimentos_ids?: string[] | null
          estado?: string | null
          horarios_disponiveis?: string | null
          id?: string
          imagem_url?: string | null
          instagram?: string | null
          latitude?: number | null
          longitude?: number | null
          modalidades?: string[] | null
          nome?: string
          numero?: string | null
          rua?: string | null
          site?: string | null
          telefone?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profissionais_esportivos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          cpf: string | null
          criado_em: string | null
          data_nascimento: string | null
          email: string | null
          esportes_favoritos: string[] | null
          esportes_interesse: string[] | null
          esportes_praticados: string[] | null
          estado: string | null
          id: string
          nome: string | null
          numero: string | null
          papel: string
          rua: string | null
          squad_code: string | null
          telefone: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cpf?: string | null
          criado_em?: string | null
          data_nascimento?: string | null
          email?: string | null
          esportes_favoritos?: string[] | null
          esportes_interesse?: string[] | null
          esportes_praticados?: string[] | null
          estado?: string | null
          id?: string
          nome?: string | null
          numero?: string | null
          papel?: string
          rua?: string | null
          squad_code?: string | null
          telefone?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cpf?: string | null
          criado_em?: string | null
          data_nascimento?: string | null
          email?: string | null
          esportes_favoritos?: string[] | null
          esportes_interesse?: string[] | null
          esportes_praticados?: string[] | null
          estado?: string | null
          id?: string
          nome?: string | null
          numero?: string | null
          papel?: string
          rua?: string | null
          squad_code?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      contagem_squad300: {
        Row: {
          total_usuarios_squad300: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      apply_promo_code: {
        Args: { promo_code_input: string }
        Returns: Json
      }
      check_login_attempts: {
        Args: { user_email: string; user_ip?: unknown }
        Returns: Json
      }
      check_registration_rate_limit: {
        Args: { user_email: string; user_ip?: unknown }
        Returns: Json
      }
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_user_sessions: {
        Args: { user_id_param: string }
        Returns: undefined
      }
      delete_all_users: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_referral_code: {
        Args: { user_id_param: string; type_param: string }
        Returns: string
      }
      get_promo_stats: {
        Args: { promo_code_input: string }
        Returns: Json
      }
      log_login_attempt: {
        Args: { user_email: string; was_successful: boolean; user_ip?: unknown }
        Returns: undefined
      }
      log_registration_attempt: {
        Args: { user_email: string; was_successful: boolean; user_ip?: unknown }
        Returns: undefined
      }
      update_establishment_stats: {
        Args: { est_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

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

export const Constants = {
  public: {
    Enums: {},
  },
} as const
