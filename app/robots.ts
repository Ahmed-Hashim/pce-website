import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const BASE_URL = SITE_URL;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/dashboard/",
                    "/admin/",
                    "/_next/",
                    "/private/",
                ],
            },
            {
                userAgent: "GPTBot",
                allow: ["/"],
            },
            {
                userAgent: "ChatGPT-User",
                allow: ["/"],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}
