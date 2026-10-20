import { useSearchParams } from 'react-router'
import { EventCard } from '../components/EventCard'
import { useEventsQuery } from '../queries'
import { parseEventFilters } from '../filters'

const CITIES = ['Ankara', 'Antalya', 'İstanbul']
const PAGE_SIZE = 2

export function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = parseEventFilters(searchParams, CITIES)
  const { data, isPending, isError, isPlaceholderData } = useEventsQuery({
    ...filters,
    size: PAGE_SIZE,
  })

  function handleCityChange(value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) next.set('city', value)
      else next.delete('city')
      next.delete('page')
      return next
    })
  }

  function goToPage(page: number) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (page === 1) next.delete('page')
      else next.set('page', String(page))
      return next
    })
  }

  const totalPages = data ? Math.ceil(data.totalElements / data.size) : 0

  return (
    <div className="mx-auto max-w-3xl p-4">
      <select
        value={filters.city ?? ''}
        onChange={(e) => handleCityChange(e.target.value)}
        className="mb-4 rounded bg-neutral-900 p-2"
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
      ) : data.totalElements === 0 ? (
        <p>No events to match these filters.</p>
      ) : data.items.length === 0 ? (
        <div>
          <p>This page is empty.</p>
          <button onClick={() => goToPage(1)}>Go to first page</button>
        </div>
      ) : (
        <>
          <ul
            className={`space-y-3 transition-opacity ${isPlaceholderData ? 'opacity-50' : ''}`}
          >
            {data.items.map((e) => (
              <li key={e.id}>
                <EventCard event={e} />
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => goToPage(filters.page - 1)}
              disabled={filters.page === 1}
            >
              Önceki
            </button>
            <span>
              Sayfa {filters.page} / {totalPages}
            </span>
            <button
              onClick={() => goToPage(filters.page + 1)}
              disabled={filters.page >= totalPages}
            >
              Sonraki
            </button>
          </div>
        </>
      )}
    </div>
  )
}
