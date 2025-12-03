export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
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
  public: {
    Tables: {
      about: {
        Row: {
          footer_description: string | null
          id: number
          mission: string
          philosophy: string
          values: Json
          vision: string
          who_we_are: string
          who_we_are_video_link: string | null
        }
        Insert: {
          footer_description?: string | null
          id?: never
          mission: string
          philosophy: string
          values: Json
          vision: string
          who_we_are: string
          who_we_are_video_link?: string | null
        }
        Update: {
          footer_description?: string | null
          id?: never
          mission?: string
          philosophy?: string
          values?: Json
          vision?: string
          who_we_are?: string
          who_we_are_video_link?: string | null
        }
        Relationships: []
      }
      awards_certifications: {
        Row: {
          id: number
          image_url: string | null
          subtitle: string | null
          title: string
          type: string | null
          year: number
        }
        Insert: {
          id?: never
          image_url?: string | null
          subtitle?: string | null
          title: string
          type?: string | null
          year: number
        }
        Update: {
          id?: never
          image_url?: string | null
          subtitle?: string | null
          title?: string
          type?: string | null
          year?: number
        }
        Relationships: []
      }
      blogs: {
        Row: {
          body: string | null
          created_at: string | null
          featured: boolean | null
          id: number
          main_image_url: string | null
          meta_description: string | null
          meta_keywords: Json | null
          published: boolean | null
          short_description: string | null
          tags: Json | null
          title: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: never
          main_image_url?: string | null
          meta_description?: string | null
          meta_keywords?: Json | null
          published?: boolean | null
          short_description?: string | null
          tags?: Json | null
          title: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: never
          main_image_url?: string | null
          meta_description?: string | null
          meta_keywords?: Json | null
          published?: boolean | null
          short_description?: string | null
          tags?: Json | null
          title?: string
        }
        Relationships: []
      }
      branches: {
        Row: {
          address: string
          country_id: number | null
          head_quarter: boolean | null
          id: number
          phone_number: string | null
        }
        Insert: {
          address: string
          country_id?: number | null
          head_quarter?: boolean | null
          id?: never
          phone_number?: string | null
        }
        Update: {
          address?: string
          country_id?: number | null
          head_quarter?: boolean | null
          id?: never
          phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "branches_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      career_applications: {
        Row: {
          career_id: number | null
          created_at: string | null
          cv_url: string
          email: string | null
          full_name: string
          id: number
          message: string | null
          phone_number: string | null
        }
        Insert: {
          career_id?: number | null
          created_at?: string | null
          cv_url: string
          email?: string | null
          full_name: string
          id?: never
          message?: string | null
          phone_number?: string | null
        }
        Update: {
          career_id?: number | null
          created_at?: string | null
          cv_url?: string
          email?: string | null
          full_name?: string
          id?: never
          message?: string | null
          phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recruitment_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
        ]
      }
      careers: {
        Row: {
          created_at: string | null
          description: string
          id: number
          job_title: string
          sector_id: number | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: never
          job_title: string
          sector_id?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: never
          job_title?: string
          sector_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "careers_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          id: number
          name: string
          sector_id: number | null
        }
        Insert: {
          id?: never
          name: string
          sector_id?: number | null
        }
        Update: {
          id?: never
          name?: string
          sector_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          display_order: number | null
          id: number
          logo_link: string
          name: string
        }
        Insert: {
          display_order?: number | null
          id?: never
          logo_link: string
          name: string
        }
        Update: {
          display_order?: number | null
          id?: never
          logo_link?: string
          name?: string
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          business_email: string | null
          careers_email: string | null
          company_name: string | null
          facebook: string | null
          general_email: string | null
          id: number
          instagram: string | null
          linkedin: string | null
          logo_url: string | null
          map_link: string | null
          office_hours: Json | null
          phone: string | null
          x: string | null
        }
        Insert: {
          business_email?: string | null
          careers_email?: string | null
          company_name?: string | null
          facebook?: string | null
          general_email?: string | null
          id?: never
          instagram?: string | null
          linkedin?: string | null
          logo_url?: string | null
          map_link?: string | null
          office_hours?: Json | null
          phone?: string | null
          x?: string | null
        }
        Update: {
          business_email?: string | null
          careers_email?: string | null
          company_name?: string | null
          facebook?: string | null
          general_email?: string | null
          id?: never
          instagram?: string | null
          linkedin?: string | null
          logo_url?: string | null
          map_link?: string | null
          office_hours?: Json | null
          phone?: string | null
          x?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          contacted: boolean | null
          created_at: string
          description: string | null
          email: string
          id: number
          name: string
        }
        Insert: {
          contacted?: boolean | null
          created_at?: string
          description?: string | null
          email: string
          id?: never
          name: string
        }
        Update: {
          contacted?: boolean | null
          created_at?: string
          description?: string | null
          email?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          id: number
          image_url: string | null
          name: string
          region_name: string | null
        }
        Insert: {
          id?: never
          image_url?: string | null
          name: string
          region_name?: string | null
        }
        Update: {
          id?: never
          image_url?: string | null
          name?: string
          region_name?: string | null
        }
        Relationships: []
      }
      expertise: {
        Row: {
          icon_url: string | null
          id: number
          name: string
        }
        Insert: {
          icon_url?: string | null
          id?: never
          name: string
        }
        Update: {
          icon_url?: string | null
          id?: never
          name?: string
        }
        Relationships: []
      }
      group_data: {
        Row: {
          description: string | null
          holding: boolean | null
          id: number
          logo_url: string | null
          name: string
          website_link: string | null
        }
        Insert: {
          description?: string | null
          holding?: boolean | null
          id?: never
          logo_url?: string | null
          name: string
          website_link?: string | null
        }
        Update: {
          description?: string | null
          holding?: boolean | null
          id?: never
          logo_url?: string | null
          name?: string
          website_link?: string | null
        }
        Relationships: []
      }
      hero: {
        Row: {
          cta_link: string | null
          cta_name: string
          description: string
          id: number
          image_url: string | null
          title: string
        }
        Insert: {
          cta_link?: string | null
          cta_name: string
          description: string
          id?: never
          image_url?: string | null
          title: string
        }
        Update: {
          cta_link?: string | null
          cta_name?: string
          description?: string
          id?: never
          image_url?: string | null
          title?: string
        }
        Relationships: []
      }
      leadership_team: {
        Row: {
          avatar_url: string | null
          description: string | null
          experience_years: number | null
          full_name: string
          id: number
          position: string | null
          projects_count: number | null
          sector_id: number | null
          title: string
          type: string | null
        }
        Insert: {
          avatar_url?: string | null
          description?: string | null
          experience_years?: number | null
          full_name: string
          id?: never
          position?: string | null
          projects_count?: number | null
          sector_id?: number | null
          title: string
          type?: string | null
        }
        Update: {
          avatar_url?: string | null
          description?: string | null
          experience_years?: number | null
          full_name?: string
          id?: never
          position?: string | null
          projects_count?: number | null
          sector_id?: number | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leadership_team_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          body: string | null
          id: number
          main_image_url: string | null
          meta_description: string | null
          meta_keywords: Json | null
          published: boolean | null
          tags: Json | null
          title: string
          top_story: boolean | null
        }
        Insert: {
          body?: string | null
          id?: never
          main_image_url?: string | null
          meta_description?: string | null
          meta_keywords?: Json | null
          published?: boolean | null
          tags?: Json | null
          title: string
          top_story?: boolean | null
        }
        Update: {
          body?: string | null
          id?: never
          main_image_url?: string | null
          meta_description?: string | null
          meta_keywords?: Json | null
          published?: boolean | null
          tags?: Json | null
          title?: string
          top_story?: boolean | null
        }
        Relationships: []
      }
      newsletter: {
        Row: {
          created_at: string
          email: string
          id: number
        }
        Insert: {
          created_at?: string
          email: string
          id?: never
        }
        Update: {
          created_at?: string
          email?: string
          id?: never
        }
        Relationships: []
      }
      pages: {
        Row: {
          body: string | null
          id: number
          title: string
        }
        Insert: {
          body?: string | null
          id?: never
          title: string
        }
        Update: {
          body?: string | null
          id?: never
          title?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string | null
          email: string | null
          name: string | null
          role_id: string | null
          status: string | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          email?: string | null
          name?: string | null
          role_id?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          email?: string | null
          name?: string | null
          role_id?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_gallery: {
        Row: {
          id: number
          image_url: string | null
          project_id: number | null
        }
        Insert: {
          id?: never
          image_url?: string | null
          project_id?: number | null
        }
        Update: {
          id?: never
          image_url?: string | null
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_gallery_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_team: {
        Row: {
          id: number
          leader_id: number | null
          project_id: number | null
        }
        Insert: {
          id?: never
          leader_id?: number | null
          project_id?: number | null
        }
        Update: {
          id?: never
          leader_id?: number | null
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_team_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "leadership_team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_team_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          country_id: number | null
          date: string | null
          end_date: string | null
          id: number
          location: string | null
          main_image_url: string | null
          name: string
          overview: string | null
          service_id: number | null
          start_date: string | null
          status: string | null
        }
        Insert: {
          country_id?: number | null
          date?: string | null
          end_date?: string | null
          id?: never
          location?: string | null
          main_image_url?: string | null
          name: string
          overview?: string | null
          service_id?: number | null
          start_date?: string | null
          status?: string | null
        }
        Update: {
          country_id?: number | null
          date?: string | null
          end_date?: string | null
          id?: never
          location?: string | null
          main_image_url?: string | null
          name?: string
          overview?: string | null
          service_id?: number | null
          start_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      projects_categories: {
        Row: {
          category_id: number | null
          id: number
          project_id: number | null
        }
        Insert: {
          category_id?: number | null
          id?: never
          project_id?: number | null
        }
        Update: {
          category_id?: number | null
          id?: never
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_categories_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects_sectors: {
        Row: {
          id: number
          project_id: number | null
          sector_id: number | null
        }
        Insert: {
          id?: never
          project_id?: number | null
          sector_id?: number | null
        }
        Update: {
          id?: never
          project_id?: number | null
          sector_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_sectors_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_sectors_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          permission_id: string
          role_id: string
        }
        Insert: {
          permission_id: string
          role_id: string
        }
        Update: {
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      sector_section_titles: {
        Row: {
          id: number
          order: number | null
          sector_id: number | null
          title: string
        }
        Insert: {
          id?: never
          order?: number | null
          sector_id?: number | null
          title: string
        }
        Update: {
          id?: never
          order?: number | null
          sector_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "sector_section_titles_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      sector_sections: {
        Row: {
          id: number
          points: Json
          section_title_id: number | null
          title: string
        }
        Insert: {
          id?: never
          points: Json
          section_title_id?: number | null
          title: string
        }
        Update: {
          id?: never
          points?: Json
          section_title_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "sector_sections_section_title_id_fkey"
            columns: ["section_title_id"]
            isOneToOne: false
            referencedRelation: "sector_section_titles"
            referencedColumns: ["id"]
          },
        ]
      }
      sectors: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          brief: string | null
          cta_subtitle: string | null
          icon_url: string | null
          id: number
          image_brief: string | null
          image_url: string | null
          name: string
          short_description: string | null
        }
        Insert: {
          brief?: string | null
          cta_subtitle?: string | null
          icon_url?: string | null
          id?: never
          image_brief?: string | null
          image_url?: string | null
          name: string
          short_description?: string | null
        }
        Update: {
          brief?: string | null
          cta_subtitle?: string | null
          icon_url?: string | null
          id?: never
          image_brief?: string | null
          image_url?: string | null
          name?: string
          short_description?: string | null
        }
        Relationships: []
      }
      statistics: {
        Row: {
          id: number
          stat: string | null
          title: string
        }
        Insert: {
          id?: never
          stat?: string | null
          title: string
        }
        Update: {
          id?: never
          stat?: string | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_permissions: {
        Args: never
        Returns: {
          permission_name: string
        }[]
      }
      get_current_user_role: { Args: never; Returns: string }
      get_user_permissions: {
        Args: { user_id: string }
        Returns: {
          permission_name: string
        }[]
      }
      has_any_permission: {
        Args: { permission_names: string[] }
        Returns: boolean
      }
      has_permission: { Args: { permission_name: string }; Returns: boolean }
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
