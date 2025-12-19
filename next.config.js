/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'mercyhouseatc.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize Sanity Studio packages and jsdom in server builds
      config.externals = config.externals || []
      config.externals.push({
        'sanity': 'commonjs sanity',
        'sanity/desk': 'commonjs sanity/desk',
        'sanity/structure': 'commonjs sanity/structure',
        '@sanity/vision': 'commonjs @sanity/vision',
        'jsdom': 'commonjs jsdom',
        'jsdom-global': 'commonjs jsdom-global',
      })
    }
    return config
  },
  async redirects() {
    return [
      {
        source: '/superthrift',
        destination: '/our-thrift-store',
        permanent: true,
      },
      {
        source: '/thrift-store',
        destination: '/our-thrift-store',
        permanent: true,
      },
      {
        source: '/vehicle-donate',
        destination: '/donate-a-car',
        permanent: true,
      },
      {
        source: '/donations',
        destination: '/donate',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig