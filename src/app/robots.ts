import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { basePath } from "@/lib/asset";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}${basePath}/sitemap.xml`,
  };
}
