const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public/ asset path so it resolves under a GitHub Pages basePath. */
export function asset(path: string): string {
  return `${prefix}${path}`;
}
