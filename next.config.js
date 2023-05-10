/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src * 'self' data: 'unsafe-inline' 'unsafe-hashes' 'unsafe-eval'; script-src * data: 'unsafe-inline' 'unsafe-hashes' 'unsafe-eval' blob:; style-src * data: 'unsafe-inline' 'unsafe-hashes'; img-src * data:; media-src *  blob:",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "browsing-topics=()",
  },
];
const sentryWebpackPluginOptions = {
  silent: true,
};
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
