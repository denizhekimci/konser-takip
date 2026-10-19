import { useQuery } from '@tanstack/react-query'
import { fetchEvent, fetchEvents } from './api'

export function useEventsQuery() {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  })
}

export function useEventQuery(id: string) {
  return useQuery({
    queryKey: ['events', 'detail', id],
    queryFn: () => fetchEvent(id)
  })
}