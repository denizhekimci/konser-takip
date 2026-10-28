import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import tr from './locales/tr.json'
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  languageFromSearch,
  resolveInitialLanguage,
  type Language,
} from './language'

const STORAGE_KEY = 'konser-takip:lang'

function readStoredLanguage(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function storeLanguage(lang: Language) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // storage blocked (private mode etc.) — language still works for this session
  }
}

function removeLangParam() {
  const url = new URL(window.location.href)
  if (!url.searchParams.has('lang')) return
  url.searchParams.delete('lang')
  window.history.replaceState(window.history.state, '', url)
}

const search = window.location.search
const fromUrl = languageFromSearch(search)
if (fromUrl) storeLanguage(fromUrl)
removeLangParam()

const initial = resolveInitialLanguage(search, readStoredLanguage())
document.documentElement.lang = initial

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
  lng: initial,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: [...SUPPORTED_LANGUAGES],
  interpolation: { escapeValue: false },
})

export function setLanguage(lang: Language) {
  storeLanguage(lang)
  document.documentElement.lang = lang
  void i18n.changeLanguage(lang)
}
