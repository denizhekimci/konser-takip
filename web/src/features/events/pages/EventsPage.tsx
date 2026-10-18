import { EventCard } from '../components/EventCard'
import { useEventsQuery } from '../queries'

export function EventsPage() {
  const { data, isPending, isError } = useEventsQuery()

  if (isPending) {
    return <h1>Loading</h1>
  }

  if (isError) {
    return <h1>Error loading Events</h1>
  }

  if (data.items.length === 0) {
    return <h1>No events to display.</h1>
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <ul className="space-y-3">
        {data.items.map((e) => (
          <li key={e.id}>
            <EventCard event={e} />
          </li>
        ))}
      </ul>
    </div>
  )
}
