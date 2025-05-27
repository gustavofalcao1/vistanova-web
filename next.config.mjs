/** @type {import('next').NextConfig} */
const createConfig = async () => ({
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week
    dangerouslyAllowSVG: true, // Allow SVG optimization
    contentDispositionType: 'attachment', // Security enhancement
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['localhost'],
  },
  experimental: {
    // Enable new script loader
    optimizePackageImports: [
      '@radix-ui/react-*',
      'lucide-react',
      'framer-motion',
      'date-fns',
      'tailwind-merge',
    ],
    // Performance optimizations
    optimizeCss: true,
    scrollRestoration: true,
    optimizeServerReact: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'INP'], // Track all Web Vitals
  },
  // Compiler optimizations
  compiler: {
    // Enable styled-components SWC transform
    styledComponents: true,
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Security headers configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/img/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ];
  },
  // Redirects and rewrites configuration (example)
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },
  // Static assets cache headers configuration
  // NOTE: Static cache configuration should be done in the web server (e.g., Nginx, Apache)
  // or in the hosting platform (Vercel, Netlify, etc.)
  // Example for Vercel: add a vercel.json file in the project root
  // Example for Nginx: configure directly in the web server
  // {
  //   "headers": [
  //     {
  //       "source": "/_next/static/(.*)",
  //       "headers": [
  //         {
  //           "key": "Cache-Control",
  //           "value": "public, max-age=31536000, immutable"
  //         }
  //       ]
  //     }
  //   ]
  // }
});

// Export the configuration with bundle analyzer if needed
export default (async () => {
  const config = await createConfig();
  
  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({ enabled: true });
    return withBundleAnalyzer(config);
  }
  
  return config;
})();
