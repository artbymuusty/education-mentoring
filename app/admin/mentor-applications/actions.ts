"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type { MentorApplicationStatus } from "@/lib/supabase/types";

const validStatuses: MentorApplicationStatus[] = ["new", "reviewing", "contacted", "accepted", "declined"];

export async function updateMentorApplicationStatus(applicationId: string, formData: FormData) {
  const status = formData.get("status");
  if (typeof status !== "string" || !validStatuses.includes(status as MentorApplicationStatus)) {
    return;
  }

  const { supabase } = await requireAdmin();
  await supabase
    .from("mentor_applications")
    .update({ status: status as MentorApplicationStatus })
    .eq("id", applicationId);

  revalidatePath("/admin/mentor-applications");
}
