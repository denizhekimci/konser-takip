import { apiGet } from '../../shared/api/client'
import type { components, operations } from '../../shared/api/types.gen'

type EventPage = components['schemas']['EventPage']
type EventDetail = components['schemas']['EventDetail']
export type EventFilters = NonNullable<
  operations['listEvents']['parameters']['query']
>
type CityList = components['schemas']['CityList']

export function fetchEvents(filters: EventFilters = {}): Promise<EventPage> {
  return apiGet<EventPage>('/events', filters)
}

export function fetchEvent(id: string): Promise<EventDetail> {
  return apiGet<EventDetail>(`/events/${encodeURIComponent(id)}`)
}

export function fetchCities(): Promise<CityList> {
  return apiGet<CityList>('/cities')
}