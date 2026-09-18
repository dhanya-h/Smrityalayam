'use client'

import { useApp } from './AppContext'
import {
  TRANSLATIONS,
  LANGUAGES_META,
  SupportedLanguage,
  TranslationSchema,
} from './i18n'

/**
 * Helper function to retrieve a translated string with safe fallbacks.
 */
export function getTranslationString(
  lang: string,
  key: keyof TranslationSchema
): string {
  const targetLang = (lang in TRANSLATIONS ? lang : 'en') as SupportedLanguage
  const primaryDict = TRANSLATIONS[targetLang]

  if (primaryDict && key in primaryDict) {
    return primaryDict[key]
  }

  // Fallback to English
  const englishDict = TRANSLATIONS['en']
  if (englishDict && key in englishDict) {
    return englishDict[key]
  }

  return String(key)
}

/**
 * React hook to get dictionary translations for the currently active language.
 */
export function useT(): TranslationSchema {
  const { settings } = useApp()
  const lang = (settings?.language || 'en') as SupportedLanguage

  const currentDict = TRANSLATIONS[lang] || TRANSLATIONS['en']

  // Create a Proxy around the active translation object for robust fallback protection
  return new Proxy(currentDict, {
    get(target, prop: string) {
      const key = prop as keyof TranslationSchema
      if (key in target) {
        return target[key]
      }
      if (key in TRANSLATIONS['en']) {
        return TRANSLATIONS['en'][key]
      }
      return prop
    },
  })
}

/**
 * Hook to retrieve active language metadata and language code.
 */
export function useLang(): SupportedLanguage {
  const { settings } = useApp()
  return (settings?.language || 'en') as SupportedLanguage
}

export function getLanguageMeta(lang: string) {
  const code = (lang in LANGUAGES_META ? lang : 'en') as SupportedLanguage
  return LANGUAGES_META[code]
}