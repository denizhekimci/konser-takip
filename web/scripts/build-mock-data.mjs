// Regenerates web/src/mocks/data/events.ts and listings.ts from the raw
// Ticketmaster Discovery responses in docs/private/.
//
//   node web/scripts/build-mock-data.mjs      (from the repo root)
//   cd web && npx prettier --write src/mocks/data
//
// To refresh stale dates later, bump SHIFT_DAYS (keep it a multiple of 7).
// Agentic boundary: mock data shaping only.
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'

// Whole weeks so weekdays stay real (a Saturday gig stays on Saturday).
// Europe/Istanbul has no DST, so shifting the UTC instant shifts local time 1:1.
// Raw range 2026-08-19 → 2027-01-22 becomes 2026-10-14 → 2027-03-19.
const SHIFT_DAYS = 56

const RAW_FILES = [
  'docs/private/events.json',
  'docs/private/artists.json',
  // Loaded last: the original seven events came from these, so they win.
  'docs/private/tm-raw/duman-events.json',
  'docs/private/tm-raw/fazil-say.json',
]
const OUT_DIR = 'web/src/mocks/data'

// IDs already in use before this script existed. Their UUIDv5 namespace was
// not recorded, so they are pinned here to keep listings and bookmarks stable.
const PINNED_IDS = {
  // events
  Z2HyzZyMZk595pvve: 'c476b703-e25c-5897-b2ac-047a6c5afa85',
  Z2HyzZyMZkQ801vve: 'bf06a7c5-6354-5f05-80bc-32d80ddedda9',
  Z6HyzZyMZ1kvo0wZv: '915fdf28-d764-5a18-a996-780dc96890fa',
  Z6HyzZyMZ1kvo0gZv: '9b21ddec-3682-50a8-ae65-4c3e4d0d27f1',
  Z2HyzZyMZkCru3vve: '3f7d5ddc-d7f5-549f-b38e-25cca8840037',
  Z6HyzZyMZGkvLYxZv: 'dda6bbd0-7beb-54fb-977e-ccd0612d26fd',
  Z1HyzZyMZkrxafvo: '7554745e-5b26-5e0f-a854-80f1bea68e9e',
}
// Artists and venues of those events, pinned by name (filled from events.ts).
const PINNED_BY_NAME = {
  artist: {
    Duman: '6abe35dc-61ee-5623-a11a-13604a822976',
    'Fazil Say': 'dd894280-1db5-53ea-ac05-27aedc72b6fa',
    'No.1': '1ad0a9ce-9c2f-592c-ad68-5c409fd26010',
    'Sagopa Kajmer': '3ed9d576-a641-58c7-897c-67abe1a2c18f',
    Ozbi: 'f91df1a5-69c1-507c-8535-d066ab5f7524',
    Seksendört: 'dbd8f19a-ec06-5faf-8abf-1a505ec6549d',
    'Hande Yener': '3c14eb35-6ce0-51f6-b2bc-a279e2434f69',
  },
  venue: {
    'Büyükçekmece Kültürpark Kemal Sunal Amfi Tiyatro':
      '51b7d377-abdb-5bba-89dc-9947a55315b8',
    'Bilkent Odeon': '73f2f28c-61dd-5f18-85f1-8a2028fb4c44',
    'Antalya Open Air': '3f2bf012-0ecf-5ba0-a7c4-815a465012c8',
    'ODTÜ MD Vişnelik Çim Amfi': '52214079-ffaf-5dba-80d9-b1d5b4905f76',
    'Harbiye Cemil Topuzlu Açıkhava Tiyatrosu':
      'c730cb63-4ff9-57ab-aa27-7a4de28519b2',
    'JJ Arena Ataşehir': '3591db67-61b4-557a-a038-dae8ddf37667',
  },
}
// Kept deliberately empty to exercise the "no ticket links" UI state.
const EMPTY_LISTINGS = new Set(['Z2HyzZyMZkQ801vve'])

// RFC 4122 UUIDv5, URL namespace, name "tm:<kind>:<ticketmasterId>".
const NS_URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8'
function uuidv5(name) {
  const ns = Buffer.from(NS_URL.replaceAll('-', ''), 'hex')
  const hash = createHash('sha1').update(ns).update(name).digest()
  hash[6] = (hash[6] & 0x0f) | 0x50
  hash[8] = (hash[8] & 0x3f) | 0x80
  const h = hash.subarray(0, 16).toString('hex')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}
const idFor = (kind, tmId, name) =>
  (kind === 'event' ? PINNED_IDS[tmId] : PINNED_BY_NAME[kind][name]) ??
  uuidv5(`tm:${kind}:${tmId}`)

const DAY_MS = 86_400_000
const shiftInstant = (iso) =>
  new Date(Date.parse(iso) + SHIFT_DAYS * DAY_MS)
    .toISOString()
    .replace('.000Z', 'Z')
const shiftDate = (ymd) =>
  new Date(Date.parse(`${ymd}T00:00:00Z`) + SHIFT_DAYS * DAY_MS)
    .toISOString()
    .slice(0, 10)

function pickImage(images) {
  const wide = images.filter((i) => i.ratio === '16_9')
  return (
    (
      wide.find((i) => i.url.includes('RETINA_LANDSCAPE_16_9')) ??
      wide.toSorted((a, b) => b.width - a.width)[0] ??
      images[0]
    )?.url ?? null
  )
}

function toSummary(e) {
  const venue = e._embedded.venues[0]
  const start = e.dates.start
  const price = e.priceRanges?.[0]
  return {
    id: idFor('event', e.id),
    name: e.name,
    status: e.dates.status.code,
    startsAt: shiftInstant(start.dateTime),
    localDate: shiftDate(start.localDate),
    localTime:
      start.noSpecificTime || !start.localTime
        ? null
        : start.localTime.slice(0, 5),
    timezone: e.dates.timezone ?? venue.timezone,
    venue: {
      id: idFor('venue', venue.id, venue.name),
      name: venue.name,
      city: venue.city.name,
      countryCode: venue.country.countryCode,
    },
    artists: (e._embedded.attractions ?? []).map((a) => ({
      id: idFor('artist', a.id, a.name),
      name: a.name,
    })),
    platforms: ['biletix'],
    imageUrl: pickImage(e.images ?? []),
    priceMin: price?.min ?? null,
    priceMax: price?.max ?? null,
    currency: price?.currency ?? null,
  }
}

const raw = new Map()
for (const file of RAW_FILES) {
  for (const e of JSON.parse(readFileSync(file, 'utf8'))._embedded.events) {
    raw.set(e.id, e)
  }
}

const rows = [...raw.values()]
  .map((e) => ({ tmId: e.id, url: e.url, summary: toSummary(e) }))
  .toSorted(
    (a, b) =>
      a.summary.startsAt.localeCompare(b.summary.startsAt) ||
      a.summary.id.localeCompare(b.summary.id),
  )

const js = (v) => JSON.stringify(v, null, 2)

writeFileSync(
  `${OUT_DIR}/events.ts`,
  `// GENERATED by web/scripts/build-mock-data.mjs — do not edit by hand.
// Normalized from real Ticketmaster Discovery API responses (docs/private/).
// Only change to the real data: every date is shifted +${SHIFT_DAYS} days
// (whole weeks, so weekdays stay real). New IDs are UUIDv5 (URL namespace,
// "tm:<kind>:<ticketmasterId>"); the original seven keep their pinned IDs.
import type { components } from '../../shared/api/types.gen'

type EventSummary = components['schemas']['EventSummary']

export const events: EventSummary[] = [
${rows.map((r) => `  // tm:${r.tmId}\n  ${js(r.summary).replaceAll('\n', '\n  ')},`).join('\n')}
]
`,
)

writeFileSync(
  `${OUT_DIR}/listings.ts`,
  `// GENERATED by web/scripts/build-mock-data.mjs — do not edit by hand.
// Ticket listings per event, keyed by EventSummary.id (see events.ts).
// URLs come from the top-level \`url\` field of the raw Ticketmaster events.
// Kept separate from events.ts on purpose: the list endpoint returns
// EventSummary (no listings), only GET /events/{id} returns EventDetail.
import type { components } from '../../shared/api/types.gen'

type Listing = components['schemas']['Listing']

export const listingsByEventId: Record<string, Listing[]> = {
${rows
  .map((r) => {
    const head = `  // tm:${r.tmId}: ${r.summary.name}, ${r.summary.venue.name}`
    if (EMPTY_LISTINGS.has(r.tmId)) {
      return `${head}\n  // Deliberately empty to exercise the "no ticket links" state in the UI.\n  // Real URL: ${r.url}\n  ${js(r.summary.id)}: [],`
    }
    return `${head}\n  ${js(r.summary.id)}: [{ platform: 'biletix', url: ${js(r.url)} }],`
  })
  .join('\n')}
}
`,
)

console.log(`${rows.length} events written (dates shifted +${SHIFT_DAYS} days)`)
