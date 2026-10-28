import { useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { EventCard } from '../components/EventCard'
import { useCitiesQuery, useEventsQuery } from '../queries'
import { parseEventFilters } from '../filters'
import { DateRangeFilter } from '../DateRangeFilter'

const PAGE_SIZE = 20

export function EventsPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: cityList } = useCitiesQuery()
  const cityNames = cityList?.items.map((c) => c.name) ?? []

  const filters = parseEventFilters(searchParams, cityNames)
  const cityOptions =
    filters.city && !cityNames.includes(filters.city)
      ? [filters.city, ...cityNames]
      : cityNames

  const rangeInvalid =
    !!filters.dateFrom && !!filters.dateTo && filters.dateFrom > filters.dateTo

  const { data, isPending, isError, isPlaceholderData } = useEventsQuery(
    {
      ...filters,
      size: PAGE_SIZE,
    },
    { enabled: !rangeInvalid },
  )

  function handleCityChange(value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) next.set('city', value)
      else next.delete('city')
      next.delete('page')
      return next
    })
  }

  function handleDateRangeChange(range: { from?: string; to?: string }) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (range.from) next.set('dateFrom', range.from)
      else next.delete('dateFrom')
      if (range.to) next.set('dateTo', range.to)
      else next.delete('dateTo')
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
        {cityOptions.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <DateRangeFilter
        from={filters.dateFrom}
        to={filters.dateTo}
        onChange={handleDateRangeChange}
      />

      {rangeInvalid ? (
        <div>
          <p>Başlangıç tarihi bitiş tarihinden sonra.</p>
          <button onClick={() => handleDateRangeChange({})}>
            Tarihleri temizle
          </button>
        </div>
      ) : isPending ? (
        <p>{t('common.loading')}</p>
      ) : isError ? (
        <p>{t('events.loadError')}</p>
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
