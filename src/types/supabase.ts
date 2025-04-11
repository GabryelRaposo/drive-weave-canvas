
export type Database = {
  public: {
    Tables: {
      stores: {
        Row: {
          id: string;
          name: string;
          owner_name: string;
          logo_url: string | null;
          created_at: string | null;
          user_id: string | null;
          plan_type: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          owner_name: string;
          logo_url?: string | null;
          created_at?: string | null;
          user_id?: string | null;
          plan_type?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          owner_name?: string;
          logo_url?: string | null;
          created_at?: string | null;
          user_id?: string | null;
          plan_type?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
