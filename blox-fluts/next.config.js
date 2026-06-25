/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Para garantir que as imagens estáticas sejam servidas corretamente
  assetPrefix: '',
};

module.exports = nextConfig;