import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Phasmoo",
    description: "An interactive journal for filtering Phasmophobia ghosts",
    categories: ["utilities"],
    start_url: "/",
    id: "?phasmoo=1",
    display: "standalone",
    icons: [
      {
        src: "/icon.png",
        sizes: "256x256",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-wide.webp",
        type: "image/webp",
        sizes: "1366x768",
        // @ts-expect-error form_factor is not included in Next's manifest type, but it works.
        form_factor: "wide",
      },
      {
        src: "/screenshot-tall.webp",
        type: "image/webp",
        sizes: "430x932",
        // @ts-expect-error form_factor is not included in Next's manifest type, but it works.
        form_factor: "narrow",
      },
    ],
    theme_color: "#1c1917",
    background_color: "#1c1917",
  };
}
