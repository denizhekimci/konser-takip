import { http, HttpResponse } from 'msw'
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
  http.get(`${API}/events`, ({ request }) => {
    const url = new URL(request.url)
    const city = url.searchParams.get('city')

    const filtered = city
      ? events.filter((e) => foldCity(e.venue.city) === foldCity(city))
      : events

    return HttpResponse.json<EventPage>({
      items: filtered,
      page: 1,
      size: 20,
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
