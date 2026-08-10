/**
 * GitHub Pages deployment config.
 *
 * basePath is required for a PROJECT page (served from
 * username.github.io/repo-name) and must be EMPTY for a USER/ORG page
 * (served from username.github.io, which comes from a repo literally named
 * `username.github.io`).
 *
 * Getting this backwards is the classic Pages failure: index.html still
 * loads, so you see unstyled text, but every /_next/* asset 404s because it
 * is requested one directory too deep. The build stays green — nothing in it
 * verifies that the baked-in URLs resolve.
 *
 * A repo whose name ends in `.github.io` is always a user/org page, so that
 * case is detected here rather than left to be configured by hand.
 */
const REPO_NAME = process.env.REPO_NAME ?? "portfolio";
const isUserOrOrgPage = REPO_NAME.toLowerCase().endsWith(".github.io");
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd && REPO_NAME && !isUserOrOrgPage ? `/${REPO_NAME}` : "";

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
