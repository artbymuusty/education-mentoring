"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type { LeadStatus } from "@/lib/supabase/types";

const validStatuses: LeadStatus[] = ["new", "contacted", "meeting", "in_progress", "converted", "closed"];

export async function updateLeadStatus(leadId: string, formData: FormData) {
  const status = formData.get("status");
  if (typeof status !== "string" || !validStatuses.includes(status as LeadStatus)) {
    return;
  }

  const { supabase } = await requireAdmin();
  await supabase.from("leads").update({ status: status as LeadStatus }).eq("id", leadId);

  revalidatePath("/admin/leads");
}
