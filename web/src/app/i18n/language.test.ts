import { describe, expect, it } from 'vitest'
import { resolveInitialLanguage } from './language'

describe('resolveInitialLanguage', () => {
  it.each([
    {
      name: 'defaults to en when nothing is set',
      search: '',
      stored: null,
      expected: 'en',
    },
    {
      name: 'uses lang from the URL',
      search: '?lang=tr',
      stored: null,
      expected: 'tr',
    },
    {
      name: 'URL wins over stored preference',
      search: '?lang=en',
      stored: 'tr',
      expected: 'en',
    },
    {
      name: 'uses stored preference when URL has no lang',
      search: '?city=Ankara',
      stored: 'tr',
      expected: 'tr',
    },
    {
      name: 'accepts uppercase (language codes are case-insensitive)',
      search: '?lang=TR',
      stored: null,
      expected: 'tr',
    },
    {
      name: 'unsupported URL value does not override stored',
      search: '?lang=de',
      stored: 'tr',
      expected: 'tr',
    },
    {
      name: 'empty URL value is ignored',
      search: '?lang=',
      stored: 'tr',
      expected: 'tr',
    },
    {
      name: 'corrupted stored value falls back to default',
      search: '',
      stored: 'xx',
      expected: 'en',
    },
    {
      name: 'finds lang among other params',
      search: '?city=Ankara&lang=tr&page=2',
      stored: null,
      expected: 'tr',
    },
  ])('$name', ({ search, stored, expected }) => {
    expect(resolveInitialLanguage(search, stored)).toBe(expected)
  })
})
