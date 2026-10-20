import { useParams } from 'react-router'
import { useEventQuery } from '../queries'

export function EventDetailPage() {
  const { eventId } = useParams()
  if (!eventId) {
    throw new Error('EventDetailPage: route must define :eventId')
  }
  const { data, isPending, isError } = useEventQuery(eventId)

  if (isPending) {
    return <h1>Loading</h1>
  }

  if (isError) {
    return <h1>Error loading event</h1>
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>
        {data.venue.name}, {data.venue.city}
      </p>
      <p>{data.listings.length} listing</p>
    </div>
  )
}
