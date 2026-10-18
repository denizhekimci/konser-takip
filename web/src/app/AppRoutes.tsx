import { Navigate, Route, Routes } from 'react-router'
import { EventsPage } from '../features/events/pages/EventsPage'
import { RootLayout } from './layout/RootLayout'
import { NotFoundPage } from './NotFoundPage'
import { EventDetailPage } from '../features/events/pages/EventDetailPage'
import { ArtistDetailPage } from '../features/artists/pages/ArtistDetailPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Navigate to="/events" replace />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:eventId" element={<EventDetailPage />} />
        <Route path="artists/:artistId" element={<ArtistDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
