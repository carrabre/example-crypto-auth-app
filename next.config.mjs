/** @type {import('next').NextConfig} */
const nextConfig = {
  // fixes wallet connect dependency issue https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
