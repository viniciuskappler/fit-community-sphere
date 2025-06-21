export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Cadastros: {
        Row: {
          column_name: string | null
          created_at: string
          id: number
        }
        Insert: {
          column_name?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          column_name?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      cities: {
        Row: {
          created_at: string | null
          ibge_code: string
          id: number
          name: string
          state_code: string
        }
        Insert: {
          created_at?: string | null
          ibge_code: string
          id?: number
          name: string
          state_code: string
        }
        Update: {
          created_at?: string | null
          ibge_code?: string
          id?: number
          name?: string
          state_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_state_code_fkey"
            columns: ["state_code"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["code"]
          },
        ]
      }
      establishment_photos: {
        Row: {
          caption: string | null
          created_at: string
          establishment_id: string
          id: string
          is_main: boolean | null
          photo_url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          establishment_id: string
          id?: string
          is_main?: boolean | null
          photo_url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          establishment_id?: string
          id?: string
          is_main?: boolean | null
          photo_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "establishment_photos_establishment_id_fkey"
            columns: ["establishment_id"]
            isOneToOne: false
            referencedRelation: "establishments"
            referencedColumns: ["id"]
          },
        ]
      }
      establishment_sports: {
        Row: {
          created_at: string
          establishment_id: string
          id: string
          sport_name: string
          sport_type: string
        }
        Insert: {
          created_at?: string
          establishment_id: string
          id?: string
          sport_name: string
          sport_type: string
        }
        Update: {
          created_at?: string
          establishment_id?: string
          id?: string
          sport_name?: string
          sport_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "establishment_sports_establishment_id_fkey"
            columns: ["establishment_id"]
            isOneToOne: false
            referencedRelation: "establishments"
            referencedColumns: ["id"]
          },
        ]
      }
      establishments: {
        Row: {
          address: string
          cep: string
          city: string
          cnpj: string | null
          corporate_name: string
          created_at: string
          description: string | null
          email: string
          establishment_name: string
          id: string
          latitude: number | null
          longitude: number | null
          phone: string
          state: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          cep: string
          city: string
          cnpj?: string | null
          corporate_name: string
          created_at?: string
          description?: string | null
          email: string
          establishment_name: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          phone: string
          state: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          cep?: string
          city?: string
          cnpj?: string | null
          corporate_name?: string
          created_at?: string
          description?: string | null
          email?: string
          establishment_name?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          phone?: string
          state?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      group_photos: {
        Row: {
          caption: string | null
          created_at: string
          group_id: string
          id: string
          is_main: boolean | null
          photo_url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          group_id: string
          id?: string
          is_main?: boolean | null
          photo_url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          group_id?: string
          id?: string
          is_main?: boolean | null
          photo_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_photos_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "sports_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_sports: {
        Row: {
          created_at: string
          group_id: string
          id: string
          sport_name: string
          sport_type: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          sport_name: string
          sport_type: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          sport_name?: string
          sport_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_sports_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "sports_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      promotional_codes: {
        Row: {
          active: boolean
          code: string
          created_at: string | null
          current_uses: number
          discount_percent: number
          expires_at: string | null
          max_uses: number
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string | null
          current_uses?: number
          discount_percent?: number
          expires_at?: string | null
          max_uses?: number
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string | null
          current_uses?: number
          discount_percent?: number
          expires_at?: string | null
          max_uses?: number
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string
          id: string
          is_active: boolean | null
          type: string
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          type: string
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_conversions: {
        Row: {
          commission_amount: number | null
          commission_status: string | null
          conversion_type: string
          created_at: string
          id: string
          paid_at: string | null
          referral_code_id: string
          referred_user_id: string
        }
        Insert: {
          commission_amount?: number | null
          commission_status?: string | null
          conversion_type: string
          created_at?: string
          id?: string
          paid_at?: string | null
          referral_code_id: string
          referred_user_id: string
        }
        Update: {
          commission_amount?: number | null
          commission_status?: string | null
          conversion_type?: string
          created_at?: string
          id?: string
          paid_at?: string | null
          referral_code_id?: string
          referred_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_conversions_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          establishment_id: string | null
          group_id: string | null
          id: string
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          establishment_id?: string | null
          group_id?: string | null
          id?: string
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          establishment_id?: string | null
          group_id?: string | null
          id?: string
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_establishment_id_fkey"
            columns: ["establishment_id"]
            isOneToOne: false
            referencedRelation: "establishments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "sports_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      sports_groups: {
        Row: {
          cities: string[]
          corporate_name: string
          created_at: string
          description: string | null
          email: string
          group_name: string
          id: string
          latitude: number | null
          longitude: number | null
          meeting_point: string | null
          phone: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cities: string[]
          corporate_name: string
          created_at?: string
          description?: string | null
          email: string
          group_name: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          meeting_point?: string | null
          phone: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cities?: string[]
          corporate_name?: string
          created_at?: string
          description?: string | null
          email?: string
          group_name?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          meeting_point?: string | null
          phone?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      states: {
        Row: {
          code: string
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string
          establishment_id: string | null
          group_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          establishment_id?: string | null
          group_id?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          establishment_id?: string | null
          group_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_establishment_id_fkey"
            columns: ["establishment_id"]
            isOneToOne: false
            referencedRelation: "establishments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "sports_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          beta_selected_at: string | null
          birth_date: string | null
          cep: string | null
          city: string | null
          city_ibge_code: string | null
          cpf: string | null
          created_at: string
          full_name: string
          id: string
          is_beta_tester: boolean | null
          neighborhood: string | null
          number: string | null
          phone: string | null
          promo_code: string | null
          state: string | null
          street: string | null
          updated_at: string
        }
        Insert: {
          beta_selected_at?: string | null
          birth_date?: string | null
          cep?: string | null
          city?: string | null
          city_ibge_code?: string | null
          cpf?: string | null
          created_at?: string
          full_name: string
          id: string
          is_beta_tester?: boolean | null
          neighborhood?: string | null
          number?: string | null
          phone?: string | null
          promo_code?: string | null
          state?: string | null
          street?: string | null
          updated_at?: string
        }
        Update: {
          beta_selected_at?: string | null
          birth_date?: string | null
          cep?: string | null
          city?: string | null
          city_ibge_code?: string | null
          cpf?: string | null
          created_at?: string
          full_name?: string
          id?: string
          is_beta_tester?: boolean | null
          neighborhood?: string | null
          number?: string | null
          phone?: string | null
          promo_code?: string | null
          state?: string | null
          street?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_sports: {
        Row: {
          created_at: string
          id: string
          sport_name: string
          sport_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          sport_name: string
          sport_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          sport_name?: string
          sport_type?: string
          user_id?: string
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      apply_promo_code: {
        Args: { promo_code_input: string }
        Returns: Json
      }
      generate_referral_code: {
        Args:
          | Record<PropertyKey, never>
          | { user_id_param: string; type_param: string }
        Returns: string
      }
      get_promo_stats: {
        Args: { promo_code_input: string }
        Returns: Json
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
