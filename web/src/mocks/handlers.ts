import { http, HttpResponse } from 'msw'
import type { components } from '../shared/api/types.gen'
import { events } from './data/events'

type EventPage = components['schemas']['EventPage']

const API = import.meta.env.VITE_API_BASE_URL

export const handlers = [
    http.get(`${API}/events`, () => {
    return HttpResponse.json<EventPage>({
      items: events,
      page: 1,
      size: 20,
      totalElements: events.length,
    })
  })
];