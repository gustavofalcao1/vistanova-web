/** @type {import('next').NextConfig} */
const withOptimizedImages = require('next-optimized-images');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Desabilita as verificações de ESLint durante o build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Desabilita as verificações de TypeScript durante o build
    ignoreBuildErrors: true,
  },
  images: {
    disableStaticImages: true,
  },
  // Otimização de imagens
  optimizeImages: true,
  optimizeImagesInDev: false,
  handleImages: ['jpeg', 'png', 'webp', 'gif'],
  // Configurações específicas para next-optimized-images
  responsive: {
    adapter: require('responsive-loader/sharp'),
    sizes: [320, 640, 768, 1024, 1600],
    placeholder: true,
    placeholderSize: 20,
  },
  webp: {
    quality: 85,
  },
  pngquant: {
    quality: [0.7, 0.9],
  },
  mozjpeg: {
    quality: 85,
  },
};

module.exports = withOptimizedImages(nextConfig);
