/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/smart-traders',
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
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'static.alchemyapi.io',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
