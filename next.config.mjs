import nextBuildId from "next-build-id";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  generateBuildId: () => nextBuildId({ dir: import.meta.dirname }),
  env: {
    buildID: await nextBuildId({ dir: import.meta.dirname }),
  },
};

export default nextConfig;
