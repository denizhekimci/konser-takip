import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useEventQuery } from '../queries'

export function EventDetailPage() {
  const { t } = useTranslation()
  const { eventId } = useParams()
  if (!eventId) {
    throw new Error('EventDetailPage: route must define :eventId')
  }
  const { data, isPending, isError } = useEventQuery(eventId)

  if (isPending) {
    return <h1>{t('common.loading')}</h1>
  }

  if (isError) {
    return <h1>{t('eventDetail.loadError')}</h1>
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>
        {data.venue.name}, {data.venue.city}
      </p>
      <p>{t('eventDetail.listingCount', { count: data.listings.length })}</p>
    </div>
  )
}
