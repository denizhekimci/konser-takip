import { apiGet } from '../../shared/api/client'
import type { components } from '../../shared/api/types.gen'

type EventPage = components['schemas']['EventPage']

export function fetchEvents(): Promise<EventPage> {
  return apiGet<EventPage>('/events')
}
