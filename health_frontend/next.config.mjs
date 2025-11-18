/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <- enable static export
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig