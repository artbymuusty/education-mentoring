"use server";

import { mentorApplicationSchema, type MentorApplicationInput } from "@/lib/validation/mentor-application";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SubmitMentorApplicationResult = { ok: true } | { ok: false; error: string };

export async function submitMentorApplication(
  input: MentorApplicationInput,
): Promise<SubmitMentorApplicationResult> {
  const parsed = mentorApplicationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Formda eksik veya hatalı bir alan var." };
  }

  const data = parsed.data;

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("mentor_applications").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      email: data.email,
      germany_experience: data.germanyExperience,
      motivation: data.motivation,
      message: data.message || null,
    });

    if (error) {
      console.error("[submitMentorApplication] supabase insert error", error);
      return { ok: false, error: "Kaydedilirken bir sorun oluştu. Lütfen tekrar dene." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[submitMentorApplication] unexpected error", err);
    return {
      ok: false,
      error:
        err instanceof Error && err.message.startsWith("Supabase yapılandırılmamış")
          ? "Bağlantı henüz kurulmadı. Lütfen İletişim sayfasındaki kanallardan bize ulaş."
          : "Beklenmedik bir hata oluştu. Lütfen tekrar dene.",
    };
  }
}
