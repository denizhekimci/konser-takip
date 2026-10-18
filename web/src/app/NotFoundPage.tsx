import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold">Sayfa bulunamadı</h1>
      <Link to="/events" className="mt-4 inline-block underline">
        Konserlere dön
      </Link>
    </div>
  )
}
