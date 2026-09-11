"use server";

import { leadSchema, type LeadInput } from "@/lib/validation/lead";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SubmitLeadResult = { ok: true } | { ok: false; error: string };

export async function submitLead(input: LeadInput): Promise<SubmitLeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Formda eksik veya hatalı bir alan var." };
  }

  const data = parsed.data;

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("leads").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      email: data.email,
      preferred_contact: data.preferredContact,
      stage: data.stage,
      education_status: data.educationStatus,
      interest_area: data.interestArea,
      language_level: data.languageLevel,
      target: data.target,
      timeline: data.timeline,
      message: data.message || null,
      note: data.note || null,
    });

    if (error) {
      console.error("[submitLead] supabase insert error", error);
      return { ok: false, error: "Kaydedilirken bir sorun oluştu. Lütfen tekrar dene." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[submitLead] unexpected error", err);
    return {
      ok: false,
      error:
        err instanceof Error && err.message.startsWith("Supabase yapılandırılmamış")
          ? "Bağlantı henüz kurulmadı. Lütfen doğrudan WhatsApp'tan yaz."
          : "Beklenmedik bir hata oluştu. Lütfen tekrar dene.",
    };
  }
}
