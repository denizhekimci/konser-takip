import { foldText } from '../../shared/utils/text'
import type { EventFilters } from './api'

export function parsePage(raw: string | null): number {
  const page = Number(raw)
  return Number.isInteger(page) && page >= 1 ? page : 1
}

export function parseCity(
  raw: string | null,
  cities: readonly string[],
): string | undefined {
  const value = raw?.trim()
  if (!value) return undefined

  const folded = foldText(value)
  return cities.find((c) => foldText(c) === folded) ?? value
}

export function parseEventFilters(
  params: URLSearchParams,
  cities: readonly string[],
): EventFilters & { page: number } {
  return {
    city: parseCity(params.get('city'), cities),
    page: parsePage(params.get('page')),
  }
}
