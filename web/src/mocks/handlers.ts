import { delay, http, HttpResponse } from 'msw'
import type { components } from '../shared/api/types.gen'
import { events } from './data/events'
import { listingsByEventId } from './data/listings'

type EventPage = components['schemas']['EventPage']
type EventDetail = components['schemas']['EventDetail']

const API = import.meta.env.VITE_API_BASE_URL

// Mirrors the contract rule for ?city=: Turkish case folding,
// with dotless ı folded to i so "Istanbul" matches "İstanbul".
function foldCity(value: string): string {
  return value.toLocaleLowerCase('tr-TR').replaceAll('ı', 'i')
}

export const handlers = [
  http.get(`${API}/events`, async ({ request }) => {
    await delay()
    const url = new URL(request.url)
    const city = url.searchParams.get('city')
    const page = Number(url.searchParams.get('page') || '1')
    const size = Number(url.searchParams.get('size') || '20')

    const filtered = city
      ? events.filter((e) => foldCity(e.venue.city) === foldCity(city))
      : events

    const sorted = filtered.toSorted((a, b) =>
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
