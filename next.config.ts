import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,

  // for self hosting
  output: "standalone",
  partialPrefetching: true,
  reactCompiler: true,
  typedRoutes: true,
}

export default nextConfig
