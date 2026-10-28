import { Link, NavLink, Outlet, type NavLinkRenderProps } from 'react-router'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'

const navLinkClass = ({ isActive }: NavLinkRenderProps) =>
  isActive ? 'font-semibold text-white' : 'text-neutral-400 hover:text-white'

export function RootLayout() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
          <Link to="/events" className="text-lg font-bold">
            konser-takip
          </Link>
          <NavLink to="/events" className={navLinkClass}>
            {t('nav.events')}
          </NavLink>
          <LanguageSwitcher />
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
