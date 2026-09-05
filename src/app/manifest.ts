import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "mediguide4u - Evidence-Based Healthcare Guides",
    short_name: "mediguide4u",
    description: "Evidence-based health guides, preventive wellness strategies, and healthcare resources from reputable public health research.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFBF7",
    theme_color: "#113F48",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192 512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["health", "medical", "education", "lifestyle"],
  };
}
