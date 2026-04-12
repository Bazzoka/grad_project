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
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          created_at: string | null
          doctor_id: string
          id: string
          notes: string | null
          patient_id: string
          specialty: string
          status: string | null
        }
        Insert: {
          appointment_date: string
          created_at?: string | null
          doctor_id: string
          id?: string
          notes?: string | null
          patient_id: string
          specialty: string
          status?: string | null
        }
        Update: {
          appointment_date?: string
          created_at?: string | null
          doctor_id?: string
          id?: string
          notes?: string | null
          patient_id?: string
          specialty?: string
          status?: string | null
        }
        Relationships: []
      }
      medical_records: {
        Row: {
          created_at: string | null
          diagnosis: string | null
          doctor_id: string
          id: string
          notes: string | null
          patient_id: string
          prescription: string | null
        }
        Insert: {
          created_at?: string | null
          diagnosis?: string | null
          doctor_id: string
          id?: string
          notes?: string | null
          patient_id: string
          prescription?: string | null
        }
        Update: {
          created_at?: string | null
          diagnosis?: string | null
          doctor_id?: string
          id?: string
          notes?: string | null
          patient_id?: string
          prescription?: string | null
        }
        Relationships: []
      }
      medicines: {
        Row: {
          category: string
          category_ar: string
          created_at: string | null
          description: string | null
          description_ar: string | null
          id: string
          image_url: string | null
          name: string
          name_ar: string
          price: number
          requires_prescription: boolean | null
          stock: number
        }
        Insert: {
          category: string
          category_ar: string
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          image_url?: string | null
          name: string
          name_ar: string
          price: number
          requires_prescription?: boolean | null
          stock?: number
        }
        Update: {
          category?: string
          category_ar?: string
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          image_url?: string | null
          name?: string
          name_ar?: string
          price?: number
          requires_prescription?: boolean | null
          stock?: number
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          medicine_id: string | null
          order_id: string | null
          price: number
          quantity: number
        }
        Insert: {
          id?: string
          medicine_id?: string | null
          order_id?: string | null
          price: number
          quantity?: number
        }
        Update: {
          id?: string
          medicine_id?: string | null
          order_id?: string | null
          price?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_medicine_id_fkey"
            columns: ["medicine_id"]
            isOneToOne: false
            referencedRelation: "medicines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "pharmacy_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacy_orders: {
        Row: {
          created_at: string | null
          delivery_address: string | null
          id: string
          patient_id: string
          phone: string | null
          prescription_code_id: string | null
          status: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_address?: string | null
          id?: string
          patient_id: string
          phone?: string | null
          prescription_code_id?: string | null
          status?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_address?: string | null
          id?: string
          patient_id?: string
          phone?: string | null
          prescription_code_id?: string | null
          status?: string | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pharmacy_orders_prescription_code_id_fkey"
            columns: ["prescription_code_id"]
            isOneToOne: false
            referencedRelation: "prescription_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      prescription_codes: {
        Row: {
          code: string
          created_at: string | null
          doctor_id: string
          expires_at: string
          id: string
          is_used: boolean | null
          patient_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          doctor_id: string
          expires_at: string
          id?: string
          is_used?: boolean | null
          patient_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          doctor_id?: string
          expires_at?: string
          id?: string
          is_used?: boolean | null
          patient_id?: string
        }
        Relationships: []
      }
      prescription_items: {
        Row: {
          id: string
          instructions: string | null
          instructions_ar: string | null
          medicine_id: string | null
          prescription_code_id: string | null
          quantity: number
        }
        Insert: {
          id?: string
          instructions?: string | null
          instructions_ar?: string | null
          medicine_id?: string | null
          prescription_code_id?: string | null
          quantity?: number
        }
        Update: {
          id?: string
          instructions?: string | null
          instructions_ar?: string | null
          medicine_id?: string | null
          prescription_code_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "prescription_items_medicine_id_fkey"
            columns: ["medicine_id"]
            isOneToOne: false
            referencedRelation: "medicines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescription_items_prescription_code_id_fkey"
            columns: ["prescription_code_id"]
            isOneToOne: false
            referencedRelation: "prescription_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "doctor" | "patient"
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
    Enums: {
      app_role: ["doctor", "patient"],
    },
  },
} as const
