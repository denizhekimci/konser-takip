export const SUPPORTED_LANGUAGES = ['en', 'tr'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]
export const DEFAULT_LANGUAGE: Language = 'en'

export function isLanguage(value: unknown): value is Language {
  return (
    typeof value === 'string' &&
    (SUPPORTED_LANGUAGES as readonly string[]).includes(value)
  )
}

function toLanguage(value: string | null): Language | null {
  if (value === null) return null
  const lowered = value.toLowerCase()
  return isLanguage(lowered) ? lowered : null
}

export function languageFromSearch(search: string): Language | null {
  return toLanguage(new URLSearchParams(search).get('lang'))
}

export function resolveInitialLanguage(
  search: string,
  stored: string | null,
): Language {
  return languageFromSearch(search) ?? toLanguage(stored) ?? DEFAULT_LANGUAGE
}
