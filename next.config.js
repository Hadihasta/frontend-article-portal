/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://articles.zeabur.app',
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY || '',
  },
}

module.exports = nextConfig
