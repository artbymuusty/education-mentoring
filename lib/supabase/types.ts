/**
 * Hand-written to match supabase/migrations/0001_init.sql. Once a real
 * Supabase project is connected, regenerate with:
 *   npx supabase gen types typescript --project-id <ref> > lib/supabase/types.ts
 * (or the `generate_typescript_types` Supabase MCP tool) and keep this
 * header removed.
 */

export type LeadStatus = "new" | "contacted" | "meeting" | "in_progress" | "converted" | "closed";
export type ProfileRole = "admin" | "mentor" | "student" | "visitor";

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          first_name: string;
          last_name: string;
          phone: string;
          email: string;
          preferred_contact: string | null;
          stage: string | null;
          education_status: string | null;
          interest_area: string | null;
          language_level: string | null;
          target: string | null;
          timeline: string | null;
          message: string | null;
          note: string | null;
          status: LeadStatus;
          admin_notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          first_name: string;
          last_name: string;
          phone: string;
          email: string;
          preferred_contact?: string | null;
          stage?: string | null;
          education_status?: string | null;
          interest_area?: string | null;
          language_level?: string | null;
          target?: string | null;
          timeline?: string | null;
          message?: string | null;
          note?: string | null;
          status?: LeadStatus;
          admin_notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          role: ProfileRole;
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          role?: ProfileRole;
          full_name?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
