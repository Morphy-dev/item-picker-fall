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
      adjuntos: {
        Row: {
          created_at: string
          grupo_id: string | null
          id: string
          nombre: string
          tipo: string
          url: string | null
        }
        Insert: {
          created_at?: string
          grupo_id?: string | null
          id?: string
          nombre?: string
          tipo: string
          url?: string | null
        }
        Update: {
          created_at?: string
          grupo_id?: string | null
          id?: string
          nombre?: string
          tipo?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "adjuntos_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "grupos"
            referencedColumns: ["id"]
          },
        ]
      }
      another_weather_game: {
        Row: {
          created_at: string
          hits: number
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          hits?: number
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          hits?: number
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      avance_estudiante: {
        Row: {
          actividad_id: string | null
          completada: boolean | null
          created_at: string | null
          estudiante_id: string
          fecha_completado: string | null
          grupo_id: string | null
          id: string
          nombre_actividad: string | null
          tiempo_en_pantalla: unknown | null
          tipo_actividad: string | null
          updated_at: string | null
        }
        Insert: {
          actividad_id?: string | null
          completada?: boolean | null
          created_at?: string | null
          estudiante_id: string
          fecha_completado?: string | null
          grupo_id?: string | null
          id?: string
          nombre_actividad?: string | null
          tiempo_en_pantalla?: unknown | null
          tipo_actividad?: string | null
          updated_at?: string | null
        }
        Update: {
          actividad_id?: string | null
          completada?: boolean | null
          created_at?: string | null
          estudiante_id?: string
          fecha_completado?: string | null
          grupo_id?: string | null
          id?: string
          nombre_actividad?: string | null
          tiempo_en_pantalla?: unknown | null
          tipo_actividad?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "avance_estudiante_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "estudiantes"
            referencedColumns: ["id"]
          },
        ]
      }
      cohorts: {
        Row: {
          created_at: string | null
          fecha: string
          grupo_id: string | null
          id: string
          title: string | null
        }
        Insert: {
          created_at?: string | null
          fecha: string
          grupo_id?: string | null
          id?: string
          title?: string | null
        }
        Update: {
          created_at?: string | null
          fecha?: string
          grupo_id?: string | null
          id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cohorts_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "grupos"
            referencedColumns: ["id"]
          },
        ]
      }
      estudiantes: {
        Row: {
          created_at: string | null
          edad: number | null
          foto_url: string | null
          genero: string
          grupo_id: string | null
          id: string
          institucion_id: string | null
          nombre_completo: string
          status: boolean | null
          ultima_leccion: string | null
        }
        Insert: {
          created_at?: string | null
          edad?: number | null
          foto_url?: string | null
          genero?: string
          grupo_id?: string | null
          id?: string
          institucion_id?: string | null
          nombre_completo: string
          status?: boolean | null
          ultima_leccion?: string | null
        }
        Update: {
          created_at?: string | null
          edad?: number | null
          foto_url?: string | null
          genero?: string
          grupo_id?: string | null
          id?: string
          institucion_id?: string | null
          nombre_completo?: string
          status?: boolean | null
          ultima_leccion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estudiantes_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "grupos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estudiantes_institucion_id_fkey"
            columns: ["institucion_id"]
            isOneToOne: false
            referencedRelation: "instituciones"
            referencedColumns: ["id"]
          },
        ]
      }
      grupos: {
        Row: {
          cantidad_estudiantes: number | null
          codigo: string | null
          id: string
          institucion_id: string | null
          nombre: string
          profesor_id: string | null
        }
        Insert: {
          cantidad_estudiantes?: number | null
          codigo?: string | null
          id?: string
          institucion_id?: string | null
          nombre: string
          profesor_id?: string | null
        }
        Update: {
          cantidad_estudiantes?: number | null
          codigo?: string | null
          id?: string
          institucion_id?: string | null
          nombre?: string
          profesor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grupos_institucion_id_fkey"
            columns: ["institucion_id"]
            isOneToOne: false
            referencedRelation: "instituciones"
            referencedColumns: ["id"]
          },
        ]
      }
      instituciones: {
        Row: {
          cantidad_estudiantes: number | null
          ciudad: string
          estatus: string | null
          id: string
          nombre: string
        }
        Insert: {
          cantidad_estudiantes?: number | null
          ciudad: string
          estatus?: string | null
          id?: string
          nombre: string
        }
        Update: {
          cantidad_estudiantes?: number | null
          ciudad?: string
          estatus?: string | null
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      juego_clothes: {
        Row: {
          aciertos: number | null
          created_at: string | null
          desaciertos: number | null
          estudiante_id: string
          grupo_id: string | null
          id: string
          nombre_actividad: string
          puntuacion: number | null
          semana: number
          updated_at: string | null
        }
        Insert: {
          aciertos?: number | null
          created_at?: string | null
          desaciertos?: number | null
          estudiante_id: string
          grupo_id?: string | null
          id?: string
          nombre_actividad: string
          puntuacion?: number | null
          semana: number
          updated_at?: string | null
        }
        Update: {
          aciertos?: number | null
          created_at?: string | null
          desaciertos?: number | null
          estudiante_id?: string
          grupo_id?: string | null
          id?: string
          nombre_actividad?: string
          puntuacion?: number | null
          semana?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "juego_clothes_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "estudiantes"
            referencedColumns: ["id"]
          },
        ]
      }
      juego_colors: {
        Row: {
          aciertos: number | null
          created_at: string | null
          desaciertos: number | null
          estudiante_id: string
          grupo_id: string | null
          id: string
          nombre_actividad: string
          puntuacion: number | null
          semana: number
          updated_at: string | null
        }
        Insert: {
          aciertos?: number | null
          created_at?: string | null
          desaciertos?: number | null
          estudiante_id: string
          grupo_id?: string | null
          id?: string
          nombre_actividad: string
          puntuacion?: number | null
          semana: number
          updated_at?: string | null
        }
        Update: {
          aciertos?: number | null
          created_at?: string | null
          desaciertos?: number | null
          estudiante_id?: string
          grupo_id?: string | null
          id?: string
          nombre_actividad?: string
          puntuacion?: number | null
          semana?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "juego_colors_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "estudiantes"
            referencedColumns: ["id"]
          },
        ]
      }
      juego_emotions: {
        Row: {
          aciertos: number | null
          created_at: string | null
          desaciertos: number | null
          estudiante_id: string
          grupo_id: string | null
          id: string
          nombre_actividad: string
          puntuacion: number | null
          semana: number
          updated_at: string | null
        }
        Insert: {
          aciertos?: number | null
          created_at?: string | null
          desaciertos?: number | null
          estudiante_id: string
          grupo_id?: string | null
          id?: string
          nombre_actividad: string
          puntuacion?: number | null
          semana: number
          updated_at?: string | null
        }
        Update: {
          aciertos?: number | null
          created_at?: string | null
          desaciertos?: number | null
          estudiante_id?: string
          grupo_id?: string | null
          id?: string
          nombre_actividad?: string
          puntuacion?: number | null
          semana?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "juego_emotions_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "estudiantes"
            referencedColumns: ["id"]
          },
        ]
      }
      juego_weather: {
        Row: {
          aciertos: number | null
          created_at: string | null
          desaciertos: number | null
          estudiante_id: string
          grupo_id: string | null
          id: string
          nombre_actividad: string
          puntuacion: number | null
          semana: number
          updated_at: string | null
        }
        Insert: {
          aciertos?: number | null
          created_at?: string | null
          desaciertos?: number | null
          estudiante_id: string
          grupo_id?: string | null
          id?: string
          nombre_actividad: string
          puntuacion?: number | null
          semana: number
          updated_at?: string | null
        }
        Update: {
          aciertos?: number | null
          created_at?: string | null
          desaciertos?: number | null
          estudiante_id?: string
          grupo_id?: string | null
          id?: string
          nombre_actividad?: string
          puntuacion?: number | null
          semana?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "juego_weather_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "estudiantes"
            referencedColumns: ["id"]
          },
        ]
      }
      profesores: {
        Row: {
          apellido: string
          ciudad: string | null
          created_at: string | null
          email: string
          id: string
          institucion_id: string | null
          nombre: string
        }
        Insert: {
          apellido: string
          ciudad?: string | null
          created_at?: string | null
          email: string
          id: string
          institucion_id?: string | null
          nombre: string
        }
        Update: {
          apellido?: string
          ciudad?: string | null
          created_at?: string | null
          email?: string
          id?: string
          institucion_id?: string | null
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "profesores_institucion_id_fkey"
            columns: ["institucion_id"]
            isOneToOne: false
            referencedRelation: "instituciones"
            referencedColumns: ["id"]
          },
        ]
      }
      section_visits: {
        Row: {
          id: string
          professor_id: string | null
          section_name: string
          user_id: string | null
          visited_at: string | null
        }
        Insert: {
          id?: string
          professor_id?: string | null
          section_name: string
          user_id?: string | null
          visited_at?: string | null
        }
        Update: {
          id?: string
          professor_id?: string | null
          section_name?: string
          user_id?: string | null
          visited_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "section_visits_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "profesores"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          created_at: string | null
          estudiante_id: string
          grupo_id: string | null
          id: string
          nombre_actividad: string
          repetido: boolean | null
          semana: number
          updated_at: string | null
          video_visto: boolean | null
        }
        Insert: {
          created_at?: string | null
          estudiante_id: string
          grupo_id?: string | null
          id?: string
          nombre_actividad: string
          repetido?: boolean | null
          semana: number
          updated_at?: string | null
          video_visto?: boolean | null
        }
        Update: {
          created_at?: string | null
          estudiante_id?: string
          grupo_id?: string | null
          id?: string
          nombre_actividad?: string
          repetido?: boolean | null
          semana?: number
          updated_at?: string | null
          video_visto?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "videos_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "estudiantes"
            referencedColumns: ["id"]
          },
        ]
      }
      watched_videos: {
        Row: {
          id: string
          professor_id: string
          video_id: string
          watched_at: string | null
        }
        Insert: {
          id?: string
          professor_id: string
          video_id: string
          watched_at?: string | null
        }
        Update: {
          id?: string
          professor_id?: string
          video_id?: string
          watched_at?: string | null
        }
        Relationships: []
      }
      weather_play: {
        Row: {
          attempt_number: number
          attempt_timestamp: string
          id: string
          is_correct: boolean
          session_id: string
        }
        Insert: {
          attempt_number: number
          attempt_timestamp?: string
          id?: string
          is_correct: boolean
          session_id: string
        }
        Update: {
          attempt_number?: number
          attempt_timestamp?: string
          id?: string
          is_correct?: boolean
          session_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      estudiante_en_grupo: {
        Args: { estudiante_id: string; grupo_id: string }
        Returns: boolean
      }
      get_cohorts_for_group: {
        Args: { p_grupo_id: string }
        Returns: {
          id: string
          title: string
          fecha: string
        }[]
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
