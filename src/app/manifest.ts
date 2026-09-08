import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "mediguide4u - Physician-Reviewed Healthcare Guides",
    short_name: "mediguide4u",
    description: "Clear, doctor-reviewed health guides covering symptoms, conditions, clinical nutrition, and preventive wellness strategies.",
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
