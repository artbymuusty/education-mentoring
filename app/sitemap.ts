import type { MetadataRoute } from "next";
import { getSiteSettings, resolveSiteUrl } from "@/lib/site-settings";

const routes = [
  "",
  "/nasil-yardimci-oluyoruz",
  "/mentorluk",
  "/hakkimizda",
  "/sss",
  "/iletisim",
  "/basvuru",
  "/gizlilik",
  "/kvkk",
  "/kullanim-sartlari",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const baseUrl = resolveSiteUrl(settings);

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
