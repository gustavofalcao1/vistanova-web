import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const createConfig = async () => ({
  // Disable ESLint during build
  eslint: {
    // Only run ESLint during development, not during build
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
  images: {
    // Disable all image optimization except for the following patterns
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [
      // Local development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      // Production domains
      {
        protocol: 'https',
        hostname: 'vistanova.pt',
      },
      // Allow any subdomains of vistanova.pt
      {
        protocol: 'https',
        hostname: '**.vistanova.pt',
      },
    ],
    // Disable image optimization for all other domains
    unoptimized: true,
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
  // Security and Cache headers configuration
  async headers() {
    return [
      {
        source: '/(.*)', // Global headers for all routes
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
            // Updated to include interest-cohort=() from vercel.json
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Document-Policy',
            value: 'js-profiling',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // Default Cache-Control for most pages/assets not covered by more specific rules
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      {
        source: '/api/(.*)', // Specific headers for API routes
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // Adjust as needed for production
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
          // API routes should generally not be cached by browsers/CDNs unless explicitly intended
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
        ],
      },
      {
        source: '/_next/static/(.*)', // Next.js static assets (JS, CSS chunks)
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Long-term cache for versioned assets
          },
        ],
      },
      {
        source: '/fonts/(.*)', // Cache policy for fonts (migrated from vercel.json)
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Fonts are generally static
          },
        ],
      },
      {
        source: '/optimized-assets/(.*)', // Your optimized images
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate', // Cache for 1 day, then revalidate
          },
        ],
      },
      // Add other specific path-based header configurations here if needed
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
});

// Export the configuration with bundle analyzer if needed
export default (async () => {
  const config = await createConfig();
  
  // Wrap the config with Sentry
  const sentryConfig = withSentryConfig(
    config,
    {
      // For all available options, see:
      // https://www.npmjs.com/package/@sentry/webpack-plugin#options

      org: "vista-nova",
      project: "vistanova-web",

      // Only print logs for uploading source maps in CI
      silent: !process.env.CI,

      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases b
      // uild time)
      widenClientFileUpload: true,

      // Route browser requests to Sentry through a Next.js rewrite to circumvent
      // ad-blockers.
      // This can increase your server load as well as your hosting bill.
      // Note: Check that the configured route will not match with your Next.js mi
      // ddleware, other
      // wise reporting of client-
      // side errors will fail.
      tunnelRoute: "/monitoring",

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,

      // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet
      // work with App R
      // outer route handlers.)
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
    }
  );

  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({ enabled: true });
    return withBundleAnalyzer(sentryConfig);
  }
  
  return sentryConfig;
})();
