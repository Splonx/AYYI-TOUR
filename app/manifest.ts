import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: "AYYI TOUR",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070707",
    theme_color: "#070707",
    icons: [
      {
        src: "/logo/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logo/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
