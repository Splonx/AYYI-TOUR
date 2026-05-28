export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          slug?: string | null;
          name?: string | null;
          category?: string | null;
          highlights?: string[] | null;
          status?: "draft" | "published" | "archived" | null;
          starting_price?: number | null;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          slug?: string | null;
          name?: string | null;
          category?: string | null;
          highlights?: string[] | null;
          status?: "draft" | "published" | "archived" | null;
          starting_price?: number | null;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
        Relationships: [];
      };
      fleet: {
        Row: {
          id: string;
          name: string;
          short_description: string | null;
          long_description: string | null;
          description: string;
          image_url: string | null;
          seats: number;
          luggage: number;
          price_note: string | null;
          category: string | null;
          is_featured: boolean;
          is_active: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          short_description?: string | null;
          long_description?: string | null;
          description?: string;
          image_url?: string | null;
          seats?: number;
          luggage?: number;
          price_note?: string | null;
          category?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["fleet"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
