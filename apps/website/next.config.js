/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@sugarstudio/ui", "@sugarstudio/foundation"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
