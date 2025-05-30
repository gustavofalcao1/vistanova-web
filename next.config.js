/** @type {import('next').NextConfig} */
const withOptimizedImages = require('next-optimized-images');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disable ESLint checks during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checks during build
    ignoreBuildErrors: true,
  },
  images: {
    disableStaticImages: true,
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Disable strict mode for faster builds
  swcMinify: true,
  poweredByHeader: false,
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
