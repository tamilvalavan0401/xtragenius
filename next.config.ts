import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix: Tell Next.js this is the project root (prevents it from picking up
  // D:\custom\package-lock.json as the workspace root)
  outputFileTracingRoot: path.join(__dirname),

  images: {
    // Allow SVG images (our placeholders are SVGs with image extensions)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
