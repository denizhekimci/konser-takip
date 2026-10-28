import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchCities, fetchEvent, fetchEvents, type EventFilters } from './api'

export function useEventsQuery(
  filters: EventFilters,
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: ['events', 'list', filters],
    queryFn: () => fetchEvents(filters),
    placeholderData: keepPreviousData,
    enabled: options.enabled,
  })
}

export function useEventQuery(id: string) {
  return useQuery({
    queryKey: ['events', 'detail', id],
    queryFn: () => fetchEvent(id),
  })
}

export function useCitiesQuery() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
    staleTime: 60 * 60 * 1000,
  })
}
