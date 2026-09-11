/**
 * Hand-written to match supabase/migrations/0001_init.sql through
 * 0004_social_links.sql. Once a real Supabase project is connected,
 * regenerate with:
 *   npx supabase gen types typescript --project-id <ref> > lib/supabase/types.ts
 * (or the `generate_typescript_types` Supabase MCP tool) and keep this
 * header removed.
 */

export type LeadStatus = "new" | "contacted" | "meeting" | "in_progress" | "converted" | "closed";
export type ProfileRole = "admin" | "mentor" | "student" | "visitor";
export type MentorApplicationStatus = "new" | "reviewing" | "contacted" | "accepted" | "declined";

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
      site_settings: {
        Row: {
          id: string;
          singleton: boolean;
          whatsapp_number: string | null;
          contact_email: string | null;
          company_name: string | null;
          company_address: string | null;
          tax_office: string | null;
          tax_number: string | null;
          mersis_no: string | null;
          production_domain: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          singleton?: boolean;
          whatsapp_number?: string | null;
          contact_email?: string | null;
          company_name?: string | null;
          company_address?: string | null;
          tax_office?: string | null;
          tax_number?: string | null;
          mersis_no?: string | null;
          production_domain?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
        Relationships: [];
      };
      mentor_applications: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          first_name: string;
          last_name: string;
          phone: string;
          email: string;
          germany_experience: string;
          motivation: string;
          message: string | null;
          status: MentorApplicationStatus;
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
          germany_experience: string;
          motivation: string;
          message?: string | null;
          status?: MentorApplicationStatus;
          admin_notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["mentor_applications"]["Insert"]>;
        Relationships: [];
      };
      social_links: {
        Row: {
          id: string;
          singleton: boolean;
          linkedin_url: string | null;
          instagram_url: string | null;
          x_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          singleton?: boolean;
          linkedin_url?: string | null;
          instagram_url?: string | null;
          x_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["social_links"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
