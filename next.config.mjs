/**
 * GitHub Pages deployment config.
 *
 * Set REPO_NAME to your actual repository name (used for basePath/assetPrefix)
 * unless you're deploying to a root user/org page (username.github.io), in
 * which case set it to an empty string.
 */
const REPO_NAME = process.env.REPO_NAME ?? "portfolio";
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd && REPO_NAME ? `/${REPO_NAME}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  devIndicators: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
