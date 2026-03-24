/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Same-origin `/api/portfolio/*` → FastAPI so the browser never hits CORS in dev.
   * - Dev default: http://127.0.0.1:8000
   * - Production: set BACKEND_REWRITE_TARGET=https://your-api.example.com at build time
   */
  async rewrites() {
    const target =
      process.env.BACKEND_REWRITE_TARGET ||
      (process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000" : "");
    if (!target) return [];
    const base = String(target).replace(/\/$/, "");
    return [{ source: "/api/portfolio/:path*", destination: `${base}/:path*` }];
  },
};

export default nextConfig;
