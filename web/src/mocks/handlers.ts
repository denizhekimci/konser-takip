import { http, HttpResponse } from 'msw'
import type { components } from '../shared/api/types.gen'
import { events } from './data/events'
import { listingsByEventId } from './data/listings'

type EventPage = components['schemas']['EventPage']
type EventDetail = components['schemas']['EventDetail']

const API = import.meta.env.VITE_API_BASE_URL

export const handlers = [
  http.get(`${API}/events`, () => {
    return HttpResponse.json<EventPage>({
      items: events,
      page: 1,
      size: 20,
      totalElements: events.length,
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
