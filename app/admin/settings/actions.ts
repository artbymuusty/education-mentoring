"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { SITE_SETTINGS_TAG, SOCIAL_LINKS_TAG } from "@/lib/site-settings";

const fieldSchema = z.object({
  whatsapp_number: z.string().trim(),
  contact_email: z.string().trim(),
  company_name: z.string().trim(),
  company_address: z.string().trim(),
  tax_office: z.string().trim(),
  tax_number: z.string().trim(),
  mersis_no: z.string().trim(),
  production_domain: z.string().trim(),
  linkedin_url: z.string().trim(),
  instagram_url: z.string().trim(),
  x_url: z.string().trim(),
});

function toNull(value: string): string | null {
  return value.length > 0 ? value : null;
}

function normalizeDomain(value: string): string {
  return value.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

function normalizeUrl(value: string): string {
  if (!value) return value;
  return value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;
}

export async function updateSiteSettings(formData: FormData) {
  const { supabase } = await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = fieldSchema.safeParse(raw);
  if (!parsed.success) {
    redirect("/admin/settings?error=1");
  }

  const f = parsed.data;

  if (f.contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.contact_email)) {
    redirect("/admin/settings?error=email");
  }

  if (f.whatsapp_number && f.whatsapp_number.replace(/[^\d]/g, "").length < 7) {
    redirect("/admin/settings?error=whatsapp");
  }

  const [settingsResult, socialResult] = await Promise.all([
    supabase
      .from("site_settings")
      .update({
        whatsapp_number: toNull(f.whatsapp_number),
        contact_email: toNull(f.contact_email),
        company_name: toNull(f.company_name),
        company_address: toNull(f.company_address),
        tax_office: toNull(f.tax_office),
        tax_number: toNull(f.tax_number),
        mersis_no: toNull(f.mersis_no),
        production_domain: toNull(normalizeDomain(f.production_domain)),
      })
      .eq("singleton", true),
    supabase
      .from("social_links")
      .update({
        linkedin_url: toNull(normalizeUrl(f.linkedin_url)),
        instagram_url: toNull(normalizeUrl(f.instagram_url)),
        x_url: toNull(normalizeUrl(f.x_url)),
      })
      .eq("singleton", true),
  ]);

  if (settingsResult.error || socialResult.error) {
    redirect("/admin/settings?error=1");
  }

  // { expire: 0 }: no stale content served — the next request blocks on a
  // fresh read, so the admin (and everyone else) sees the change right away.
  revalidateTag(SITE_SETTINGS_TAG, { expire: 0 });
  revalidateTag(SOCIAL_LINKS_TAG, { expire: 0 });
  redirect("/admin/settings?saved=1");
}
