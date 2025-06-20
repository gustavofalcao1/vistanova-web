// next-sitemap.config.mjs

/** @type {import('next-sitemap').IConfig} */
const config = {
  // The base URL of your site. Used to generate absolute URLs for sitemap entries.
  // It's good practice to use an environment variable for this.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://vistanova.pt',

  // Whether to generate a robots.txt file.
  generateRobotsTxt: true,

  // Options for the generated robots.txt file.
  robotsTxtOptions: {
    // Defines access policies for web crawlers.
    policies: [
      {
        userAgent: '*', // Applies to all user agents (crawlers).
        allow: '/',     // Allows access to all paths.
      },
      // You can add more specific policies here if needed, e.g., to disallow certain paths:
      // { userAgent: '*', disallow: '/admin' },
    ],
    // next-sitemap automatically adds the sitemap URL to robots.txt.
    // If you had additional sitemaps, you could list them here:
    // additionalSitemaps: [
    //   'https://example.com/my-custom-sitemap.xml',
    // ],
  },

  // An array of glob patterns to exclude from the sitemap.
  exclude: [
    '/404', // Exclude the 404 error page.
    '/500', // Exclude the 500 error page.
    // Add any other paths you want to exclude, e.g., '/admin/*', '/private-page'.
  ],

  // Whether to generate a sitemap index file (for very large sites).
  // False is appropriate for most sites.
  generateIndexSitemap: false,

  // The directory where the sitemap and robots.txt files will be generated.
  // 'public' is the standard for Next.js.
  outDir: 'public',

  // Optional: Default priority for sitemap entries (0.0 to 1.0).
  // priority: 0.7,

  // Optional: Default change frequency for sitemap entries.
  // changefreq: 'daily',

  // Optional: A transform function to customize each sitemap entry.
  // Useful for setting priority/changefreq per-page or for dynamic routes.
  // transform: async (config, path) => {
  //   return {
  //     loc: path, // Required
  //     changefreq: config.changefreq, // Optional
  //     priority: config.priority, // Optional
  //     lastmod: config.autoLastmod ? new Date().toISOString() : undefined, // Optional
  //     alternateRefs: config.alternateRefs ?? [], // Optional
  //   }
  // },
};

export default config;
