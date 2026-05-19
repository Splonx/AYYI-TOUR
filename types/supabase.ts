export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          slug: string;
          name: string;
          category: string;
          description: string;
          highlights: string[];
          status: "draft" | "published" | "archived";
          starting_price: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          category: string;
          description: string;
          highlights?: string[];
          status?: "draft" | "published" | "archived";
          starting_price?: number | null;
          created_at?: string;
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
      booking_requests: {
        Row: {
          id: string;
          client_name: string;
          phone: string;
          service_slug: string;
          pickup_date: string;
          pickup_place: string;
          destination: string;
          passengers: number;
          message: string | null;
          status: "new" | "confirmed" | "completed" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          phone: string;
          service_slug: string;
          pickup_date: string;
          pickup_place: string;
          destination: string;
          passengers?: number;
          message?: string | null;
          status?: "new" | "confirmed" | "completed" | "cancelled";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["booking_requests"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "booking_requests_service_slug_fkey";
            columns: ["service_slug"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["slug"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      service_status: "draft" | "published" | "archived";
      booking_status: "new" | "confirmed" | "completed" | "cancelled";
    };
    CompositeTypes: Record<string, never>;
  };
};
