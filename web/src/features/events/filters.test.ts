import { describe, expect, it } from 'vitest'
import { parseCity, parsePage } from './filters'

const CITIES = ['Ankara', 'Antalya', 'İstanbul', 'Eskişehir']

describe('parsePage', () => {
  it('defaults to 1 when the param is missing', () => {
    expect(parsePage(null)).toBe(1)
  })

  it('parses a valid page number when the param is 3', () => {
    expect(parsePage('3')).toBe(3)
  })
  it.each(['', 'abc', '0', '-2', '2.5', '3abc'])(
    'falls back to 1 for invalid input %j',
    (raw) => {
      expect(parsePage(raw)).toBe(1)
    },
  )
})

describe('parseCity', () => {
  it.each([null, '   '])(
    'falls back to undefined for invalid input %j',
    (raw) => {
      expect(parseCity(raw, CITIES)).toBeUndefined()
    },
  )
  it.each(['istanbul', 'Istanbul', 'ISTANBUL'])(
    'parses to İstanbul for %j',
    (raw) => {
      expect(parseCity(raw, CITIES)).toBe('İstanbul')
    },
  )

  it('folds Turkish diacritics', () => {
    expect(parseCity('Eskisehir', CITIES)).toBe('Eskişehir')
  })

  it('trims whitespace and matches case-insensitively', () => {
    expect(parseCity('  ankara   ', CITIES)).toBe('Ankara')
  })

  it('keeps an unknown city as-is', () => {
    expect(parseCity('Kars', CITIES)).toBe('Kars')
  })
})
