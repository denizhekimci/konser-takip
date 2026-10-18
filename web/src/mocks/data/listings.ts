// Ticket listings per event, keyed by EventSummary.id (see events.ts).
// URLs come from the top-level `url` field of the raw Ticketmaster events
// (docs/private/tm-raw/). Kept separate from events.ts on purpose: the list
// endpoint returns EventSummary (no listings), only GET /events/{id} returns
// EventDetail with listings.
import type { components } from '../../shared/api/types.gen'

type Listing = components['schemas']['Listing']

export const listingsByEventId: Record<string, Listing[]> = {
  // tm:Z2HyzZyMZk595pvve: Duman, Büyükçekmece
  'c476b703-e25c-5897-b2ac-047a6c5afa85': [
    {
      platform: 'biletix',
      url: 'https://www.biletix.com/performance/5AMAL/001/TURKIYE/tr',
    },
  ],
  // tm:Z2HyzZyMZkQ801vve: Fazıl Say Jazz Quintet, Bilkent Odeon
  // Deliberately empty to exercise the "no ticket links" state in the UI.
  // Real URL: https://www.biletix.com/performance/5PFZ9/001/TURKIYE/tr
  'bf06a7c5-6354-5f05-80bc-32d80ddedda9': [],
  // tm:Z6HyzZyMZ1kvo0wZv: Oktoberfest X Antalya, Kombine
  '915fdf28-d764-5a18-a996-780dc96890fa': [
    {
      platform: 'biletix',
      url: 'https://www.biletix.com/performance/51932/001/TURKIYE/tr',
    },
  ],
  // tm:Z6HyzZyMZ1kvo0gZv: Oktoberfest X Antalya, 3. Gün
  '9b21ddec-3682-50a8-ae65-4c3e4d0d27f1': [
    {
      platform: 'biletix',
      url: 'https://www.biletix.com/performance/51935/001/TURKIYE/tr',
    },
  ],
  // tm:Z2HyzZyMZkCru3vve: Duman, ODTÜ Vişnelik
  '3f7d5ddc-d7f5-549f-b38e-25cca8840037': [
    {
      platform: 'biletix',
      url: 'https://www.biletix.com/performance/5DTCH/001/TURKIYE/tr',
    },
  ],
  // tm:Z6HyzZyMZGkvLYxZv: Duman, Harbiye
  'dda6bbd0-7beb-54fb-977e-ccd0612d26fd': [
    {
      platform: 'biletix',
      url: 'https://www.biletix.com/performance/5FC22/001/TURKIYE/tr',
    },
  ],
  // tm:Z1HyzZyMZkrxafvo: Duman, JJ Arena
  '7554745e-5b26-5e0f-a854-80f1bea68e9e': [
    {
      platform: 'biletix',
      url: 'https://www.biletix.com/performance/5TX82/001/TURKIYE/tr',
    },
  ],
}
