import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchEvent, fetchEvents, type EventFilters } from './api'

export function useEventsQuery(filters: EventFilters) {
  return useQuery({
    queryKey: ['events', 'list', filters],
    queryFn: () => fetchEvents(filters),
    placeholderData: keepPreviousData,
  })
}

export function useEventQuery(id: string) {
  return useQuery({
    queryKey: ['events', 'detail', id],
    queryFn: () => fetchEvent(id)
  })
}