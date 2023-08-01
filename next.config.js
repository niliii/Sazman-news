/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env :{
    SERVER_URL : "https://newsapi.deltagroup.ir",
    LOCAL_URL : "http://localhost:3000"
  },
  experimental: {
    images: {
      allowFutureImage: true
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'newsapi.deltagroup.ir',
        port: '',
        pathname: '/images/**',
      },
    ],
  },

}

module.exports = nextConfig
