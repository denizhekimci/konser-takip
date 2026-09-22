// Normalized from real Ticketmaster Discovery API responses (Duman, Fazil Say).
// Raw source: docs/private/tm-raw/. IDs are deterministic UUIDv5 derived from
// Ticketmaster IDs, so the same artist/venue keeps the same id across events.
import type { components } from '../../shared/api/types.gen'

type EventSummary = components['schemas']['EventSummary']

export const events: EventSummary[] = [
  // tm:Z2HyzZyMZk595pvve
  {
    id: 'c476b703-e25c-5897-b2ac-047a6c5afa85',
    name: 'Duman',
    status: 'onsale',
    startsAt: '2026-09-27T18:00:00Z',
    localDate: '2026-09-27',
    localTime: '21:00',
    timezone: 'Europe/Istanbul',
    venue: {
      id: '51b7d377-abdb-5bba-89dc-9947a55315b8',
      name: 'Büyükçekmece Kültürpark Kemal Sunal Amfi Tiyatro',
      city: 'İstanbul',
      countryCode: 'TR',
    },
    artists: [
      {
        id: '6abe35dc-61ee-5623-a11a-13604a822976',
        name: 'Duman',
      },
    ],
    platforms: [
      'biletix',
    ],
    imageUrl: 'https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_RETINA_LANDSCAPE_16_9.jpg',
    priceMin: null,
    priceMax: null,
    currency: null,
  },
  // tm:Z2HyzZyMZkQ801vve
  {
    id: 'bf06a7c5-6354-5f05-80bc-32d80ddedda9',
    name: 'Fazıl Say Jazz Quintet',
    status: 'onsale',
    startsAt: '2026-09-27T18:00:00Z',
    localDate: '2026-09-27',
    localTime: '21:00',
    timezone: 'Europe/Istanbul',
    venue: {
      id: '73f2f28c-61dd-5f18-85f1-8a2028fb4c44',
      name: 'Bilkent Odeon',
      city: 'Ankara',
      countryCode: 'TR',
    },
    artists: [
      {
        id: 'dd894280-1db5-53ea-ac05-27aedc72b6fa',
        name: 'Fazil Say',
      },
    ],
    platforms: [
      'biletix',
    ],
    imageUrl: 'https://s1.ticketm.net/dam/c/919/10ad0c9c-6b83-4e29-a814-52a9e5913919_105641_RETINA_LANDSCAPE_16_9.jpg',
    priceMin: null,
    priceMax: null,
    currency: null,
  },
  // tm:Z6HyzZyMZ1kvo0wZv
  {
    id: '915fdf28-d764-5a18-a996-780dc96890fa',
    name: 'Oktoberfest X Antalya Müzik Festivali - Kombine',
    status: 'onsale',
    startsAt: '2026-10-16T12:00:00Z',
    localDate: '2026-10-16',
    localTime: '15:00',
    timezone: 'Europe/Istanbul',
    venue: {
      id: '3f2bf012-0ecf-5ba0-a7c4-815a465012c8',
      name: 'Antalya Open Air',
      city: 'Antalya',
      countryCode: 'TR',
    },
    artists: [
      {
        id: '1ad0a9ce-9c2f-592c-ad68-5c409fd26010',
        name: 'No.1',
      },
      {
        id: '3ed9d576-a641-58c7-897c-67abe1a2c18f',
        name: 'Sagopa Kajmer',
      },
      {
        id: 'f91df1a5-69c1-507c-8535-d066ab5f7524',
        name: 'Ozbi',
      },
      {
        id: '6abe35dc-61ee-5623-a11a-13604a822976',
        name: 'Duman',
      },
      {
        id: 'dbd8f19a-ec06-5faf-8abf-1a505ec6549d',
        name: 'Seksendört',
      },
      {
        id: '3c14eb35-6ce0-51f6-b2bc-a279e2434f69',
        name: 'Hande Yener',
      },
    ],
    platforms: [
      'biletix',
    ],
    imageUrl: 'https://s1.ticketm.net/dam/c/80b/f3cd8d24-c3ae-4fa0-b4bc-1ba99f9b380b_106091_RETINA_LANDSCAPE_16_9.jpg',
    priceMin: null,
    priceMax: null,
    currency: null,
  },
  // tm:Z6HyzZyMZ1kvo0gZv
  {
    id: '9b21ddec-3682-50a8-ae65-4c3e4d0d27f1',
    name: 'Oktoberfest X Antalya Müzik Festivali - 3.Gün (Duman - Seksendört)',
    status: 'onsale',
    startsAt: '2026-10-18T12:00:00Z',
    localDate: '2026-10-18',
    localTime: '15:00',
    timezone: 'Europe/Istanbul',
    venue: {
      id: '3f2bf012-0ecf-5ba0-a7c4-815a465012c8',
      name: 'Antalya Open Air',
      city: 'Antalya',
      countryCode: 'TR',
    },
    artists: [
      {
        id: '6abe35dc-61ee-5623-a11a-13604a822976',
        name: 'Duman',
      },
      {
        id: 'dbd8f19a-ec06-5faf-8abf-1a505ec6549d',
        name: 'Seksendört',
      },
    ],
    platforms: [
      'biletix',
    ],
    imageUrl: 'https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_RETINA_LANDSCAPE_16_9.jpg',
    priceMin: null,
    priceMax: null,
    currency: null,
  },
  // tm:Z2HyzZyMZkCru3vve
  {
    id: '3f7d5ddc-d7f5-549f-b38e-25cca8840037',
    name: 'Duman',
    status: 'onsale',
    startsAt: '2026-10-25T18:00:00Z',
    localDate: '2026-10-25',
    localTime: '21:00',
    timezone: 'Europe/Istanbul',
    venue: {
      id: '52214079-ffaf-5dba-80d9-b1d5b4905f76',
      name: 'ODTÜ MD Vişnelik Çim Amfi',
      city: 'Ankara',
      countryCode: 'TR',
    },
    artists: [
      {
        id: '6abe35dc-61ee-5623-a11a-13604a822976',
        name: 'Duman',
      },
    ],
    platforms: [
      'biletix',
    ],
    imageUrl: 'https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_RETINA_LANDSCAPE_16_9.jpg',
    priceMin: null,
    priceMax: null,
    currency: null,
  },
  // tm:Z6HyzZyMZGkvLYxZv
  {
    id: 'dda6bbd0-7beb-54fb-977e-ccd0612d26fd',
    name: 'Duman',
    status: 'onsale',
    startsAt: '2026-10-28T18:00:00Z',
    localDate: '2026-10-28',
    localTime: '21:00',
    timezone: 'Europe/Istanbul',
    venue: {
      id: 'c730cb63-4ff9-57ab-aa27-7a4de28519b2',
      name: 'Harbiye Cemil Topuzlu Açıkhava Tiyatrosu',
      city: 'İstanbul',
      countryCode: 'TR',
    },
    artists: [
      {
        id: '6abe35dc-61ee-5623-a11a-13604a822976',
        name: 'Duman',
      },
    ],
    platforms: [
      'biletix',
    ],
    imageUrl: 'https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_RETINA_LANDSCAPE_16_9.jpg',
    priceMin: null,
    priceMax: null,
    currency: null,
  },
  // tm:Z1HyzZyMZkrxafvo
  {
    id: '7554745e-5b26-5e0f-a854-80f1bea68e9e',
    name: 'Duman',
    status: 'onsale',
    startsAt: '2026-11-28T18:00:00Z',
    localDate: '2026-11-28',
    localTime: '21:00',
    timezone: 'Europe/Istanbul',
    venue: {
      id: '3591db67-61b4-557a-a038-dae8ddf37667',
      name: 'JJ Arena Ataşehir',
      city: 'İstanbul',
      countryCode: 'TR',
    },
    artists: [
      {
        id: '6abe35dc-61ee-5623-a11a-13604a822976',
        name: 'Duman',
      },
    ],
    platforms: [
      'biletix',
    ],
    imageUrl: 'https://s1.ticketm.net/dam/c/fbc/b293c0ad-c904-4215-bc59-8d7f2414dfbc_106141_RETINA_LANDSCAPE_16_9.jpg',
    priceMin: null,
    priceMax: null,
    currency: null,
  },
]
