const LANGS = ["de", "en", "fr"] as const;
export type Lang = typeof LANGS[number];

export function detectLangFromPath(pathname: string): { lang: Lang; baseIndex: number } {
  const parts = pathname.split("/").filter(Boolean);
  const hasLanguagePrefix = parts[0] === "language";
  const idx = hasLanguagePrefix ? 1 : 0;
  const lang = (LANGS as readonly string[]).includes(parts[idx] as any) ? (parts[idx] as Lang) : "de";
  return { lang, baseIndex: idx };
}

export function switchLangPath(pathname: string, to: Lang): string {
  const parts = pathname.split("/").filter(Boolean);
  const hasLanguagePrefix = parts[0] === "language";
  const idx = hasLanguagePrefix ? 1 : 0;
  if ((["de","en","fr"] as string[]).includes(parts[idx])) parts[idx] = to;
  else parts.splice(idx, 0, to);
  return "/" + parts.join("/") + "/";
}
