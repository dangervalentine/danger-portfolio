import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** The case studies moved from /projects to /products after they had been
   * linked from elsewhere. A permanent redirect keeps every old link working. */
  redirects() {
    return [
      {
        source: "/projects/:slug",
        destination: "/products/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
