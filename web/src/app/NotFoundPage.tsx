import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold">{t('notFound.title')}</h1>
      <Link to="/events" className="mt-4 inline-block underline">
        {t('notFound.backToEvents')}
      </Link>
    </div>
  )
}
