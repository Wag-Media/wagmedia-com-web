/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.discordapp.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.discordapp.net",
        port: "",
      },
    ],
  },
}

export default nextConfig
