export const publicPathsConfig = {
  // Exact paths that should be publicly accessible
  exactPaths: ["/", "/about", "/contact"],

  // Path prefixes - any path starting with these will be public
  prefixes: ["/auth/", "/api/auth/"],
}

export function isPublicPath(pathname: string): boolean {
  // Check exact path matches
  if (publicPathsConfig.exactPaths.includes(pathname)) {
    return true
  }

  // Check prefix matches
  for (const prefix of publicPathsConfig.prefixes) {
    if (pathname.startsWith(prefix)) {
      return true
    }
  }

  return false
}
