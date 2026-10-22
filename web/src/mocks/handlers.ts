import { delay, http, HttpResponse } from 'msw'
import type { components } from '../shared/api/types.gen'
import { events } from './data/events'
import { listingsByEventId } from './data/listings'

type EventPage = components['schemas']['EventPage']
type EventDetail = components['schemas']['EventDetail']
type City = components['schemas']['City']
type CityList = components['schemas']['CityList']

const API = import.meta.env.VITE_API_BASE_URL

// Mirrors the contract rule for ?city=: Turkish case folding,
// with dotless ı folded to i so "Istanbul" matches "İstanbul".
function foldCity(value: string): string {
  return value.toLocaleLowerCase('tr-TR').replaceAll('ı', 'i')
}

const MOCK_NOW = new Date('2026-10-21T00:00:00Z')

const trCollator = new Intl.Collator('tr')

const compareCode = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

function listCities(): CityList {
  // Key is country + name: Paris/FR and Paris/US are different cities.
  const byKey = new Map<string, City>()

  for (const event of events) {
    if (event.status === 'cancelled') continue
    if (new Date(event.startsAt) <= MOCK_NOW) continue

    const { city: name, countryCode } = event.venue
    byKey.set(`${countryCode}|${name}`, { name, countryCode })
  }

  const items = [...byKey.values()].toSorted(
    (a, b) =>
      compareCode(a.countryCode, b.countryCode) ||
      trCollator.compare(a.name, b.name),
  )

  return { items }
}

export const handlers = [
  http.get(`${API}/events`, async ({ request }) => {
    await delay()
    const url = new URL(request.url)
    const city = url.searchParams.get('city')
    const page = Number(url.searchParams.get('page') || '1')
    const size = Number(url.searchParams.get('size') || '20')

    const dateFrom = url.searchParams.get('dateFrom')
    const dateTo = url.searchParams.get('dateTo')

    // ISO dates compare correctly as strings.
    if (dateFrom && dateTo && dateFrom > dateTo) {
      return new HttpResponse(null, { status: 400 })
    }

    const filtered = events.filter((e) => {
      if (city && foldCity(e.venue.city) !== foldCity(city)) return false
      // Contract default: no date params → upcoming only (instant, not date).
      if (!dateFrom && !dateTo) return new Date(e.startsAt) > MOCK_NOW
      if (dateFrom && e.localDate < dateFrom) return false
      if (dateTo && e.localDate > dateTo) return false
      return true
    })

    const sorted = filtered.toSorted(
      (a, b) =>
        a.startsAt.localeCompare(b.startsAt) || a.id.localeCompare(b.id),
    )
    const offset = (page - 1) * size

    const paginated = sorted.slice(offset, offset + size)

    return HttpResponse.json<EventPage>({
      items: paginated,
      page: page,
      size: size,
      totalElements: filtered.length,
    })
  }),
  http.get(`${API}/cities`, async () => {
    await delay()
    return HttpResponse.json<CityList>(listCities())
  }),
  http.get(`${API}/events/:id`, ({ params }) => {
    const event = events.find((e) => e.id === params.id)

    if (!event) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json<EventDetail>({
      ...event,
      listings: listingsByEventId[event.id] ?? [],
    })
  }),
]
