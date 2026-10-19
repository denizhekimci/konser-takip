import { useSearchParams } from 'react-router'
import { EventCard } from '../components/EventCard'
import { useEventsQuery } from '../queries'

const CITIES = ['Ankara', 'Antalya', 'İstanbul']

export function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const city = searchParams.get('city') ?? undefined
  const { data, isPending, isError, isPlaceholderData } = useEventsQuery({city})

  function handleCityChange(value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) next.set('city', value)
      else next.delete('city')
      return next
    })
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <select
        value={city ?? ''}
        onChange={(e) => handleCityChange(e.target.value)}
        className='mb-4 rounded bg-neutral-900 p-2'
      >
        <option value="">Tüm şehirler</option>
        {CITIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {isPending ? (
        <p>Loading</p>
      ) : isError ? (
        <p>Error loading events</p>
      ) : data.items.length === 0 ? (
        <p>No events to display.</p>
      ) : (
        <ul className={`space-y-3 transition-opacity ${isPlaceholderData ? 'opacity-50' : ''}`}>
          {data.items.map((e) => (
            <li key={e.id}>
              <EventCard event={e}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
