import { describe, expect, it } from 'vitest'
import { parseCity, parseDate, parsePage } from './filters'

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

describe('parseDate', () => {
  it.each([
    { raw: '2026-10-21', rule: 'accepts a valid ISO date' },
    { raw: '2028-02-29', rule: 'accepts Feb 29 in a leap year' },
  ])('$rule ($raw)', ({ raw }) => {
    expect(parseDate(raw)).toBe(raw)
  })

  it('trims surrounding whitespace', () => {
    expect(parseDate(' 2026-10-21 ')).toBe('2026-10-21')
  })

  it.each([
    { raw: null, rule: 'treats a missing param as no filter' },
    { raw: '', rule: 'treats an empty param as no filter' },
    { raw: '2026-2-3', rule: 'rejects dates without zero padding' },
    {
      raw: '2026-10-21T00:00',
      rule: 'rejects a date-time, the contract wants a date',
    },
    { raw: 'dün', rule: 'rejects non-date text' },
    { raw: '2026-13-01', rule: 'rejects a month that does not exist' },
    { raw: '2026-00-10', rule: 'rejects month 00 without throwing' },
    { raw: '2026-02-30', rule: 'rejects a day not in the calendar (Feb 30)' },
    { raw: '2026-02-29', rule: 'rejects Feb 29 in a non-leap year' },
  ])('$rule ($raw)', ({ raw }) => {
    expect(parseDate(raw)).toBeUndefined()
  })
})
