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
    theme_color: "#1c1917",
    background_color: "#1c1917",
  };
}
