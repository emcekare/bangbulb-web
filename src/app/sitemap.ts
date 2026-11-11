import type { MetadataRoute } from "next";
import { siteBase } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteBase, changeFrequency: "monthly", priority: 1 }];
}
