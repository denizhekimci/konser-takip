import { useQuery } from '@tanstack/react-query'
import { fetchEvents } from './api'

export function useEventsQuery() {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  })
}
