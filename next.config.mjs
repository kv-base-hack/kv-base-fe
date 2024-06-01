/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    reactCompiler: true,
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/smartmoney-onchain/leaderboard',
        permanent: true,
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin360.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'dd.dexscreener.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'assets.geckoterminal.com',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
