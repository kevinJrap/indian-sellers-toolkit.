/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, crypto: false };
    return config;
  },
};

export default nextConfig;
