import { apiGet } from '../../shared/api/client'
import type { components } from '../../shared/api/types.gen'

type EventPage = components['schemas']['EventPage']
type EventDetail = components['schemas']['EventDetail']

export function fetchEvents(): Promise<EventPage> {
  return apiGet<EventPage>('/events')
}

export function fetchEvent(id: string): Promise<EventDetail> {
  return apiGet<EventDetail>(`/events/${encodeURIComponent(id)}`)
}