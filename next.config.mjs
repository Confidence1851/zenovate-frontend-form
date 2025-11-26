// import obfuscationConfig from './src/utils/nextConfig/obfuscationConfig.js';
// import cssHashingConfig from './src/utils/nextConfig/cssHashingConfig.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Required for Docker standalone builds

  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    swcMinify: true,
  },
  compiler: {
    removeConsole: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9802',
        pathname: '/api/get-file/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/api/get-file/**',
      },
    ],
  },
  webpack: (config, ctx) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    })

    // config = obfuscationConfig(config, ctx);
    // config = cssHashingConfig(config, ctx);
    return config
  },
};

export default nextConfig