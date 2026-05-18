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
          slug: string;
          name: string;
          segment: string;
          description: string;
          passengers: number;
          luggage: number;
          status: "available" | "maintenance" | "hidden";
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          segment: string;
          description: string;
          passengers?: number;
          luggage?: number;
          status?: "available" | "maintenance" | "hidden";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["fleet"]["Insert"]>;
        Relationships: [];
      };
      booking_requests: {
        Row: {
          id: string;
          client_name: string;
          service_slug: string;
          pickup_date: string;
          status: "new" | "confirmed" | "completed" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          service_slug: string;
          pickup_date: string;
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
      vehicle_status: "available" | "maintenance" | "hidden";
      booking_status: "new" | "confirmed" | "completed" | "cancelled";
    };
    CompositeTypes: Record<string, never>;
  };
};
