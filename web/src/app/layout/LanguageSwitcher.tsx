import { useTranslation } from 'react-i18next'
import { isLanguage, SUPPORTED_LANGUAGES } from '../i18n/language'
import { setLanguage } from '../i18n'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  return (
    <select
      value={i18n.resolvedLanguage}
      aria-label={t('nav.language')}
      onChange={(e) => {
        if (isLanguage(e.target.value)) setLanguage(e.target.value)
      }}
      className="ml-auto"
    >
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  )
}
