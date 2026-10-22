import { foldText } from '../../shared/utils/text'
import type { EventFilters } from './api'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

export function parsePage(raw: string | null): number {
  const page = Number(raw)
  return Number.isInteger(page) && page >= 1 ? page : 1
}

export function parseDate(raw: string | null): string | undefined {
  const value = raw?.trim()
  if (!value || !ISO_DATE.test(value)) return undefined

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined

  return date.toISOString().slice(0, 10) === value ? value : undefined
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
    dateFrom: parseDate(params.get('dateFrom')),
    dateTo: parseDate(params.get('dateTo')),
  }
}
