import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import shop from '../config/shop'

export default function Navbar({links: customeLinks}) {
  const { totalItems } = useCart()
  const [open, setOpen] = useState(false)

  const links = customeLinks ?? [
    { label: 'Home', to: '/', isRoute: true },
    { label: 'Shop', to: '#shop' },
    { label: 'socials', to: '#socials' },
    { label: 'Location', to: '#location' },
    { label: 'Gallery', to: '#gallery' },
  ]

  return (
    <nav className="relative flex items-center justify-between px-6 py-5 md:px-16">

      {/* Logo */}
      <Link to="/" className="z-50 text-xl font-semibold">
        {shop.name} <span className="text-pink-400">{shop.nameAccent}</span>
      </Link>

      {/* Desktop links */}
      <ul className="items-center hidden gap-10 text-sm text-gray-500 md:flex">
        {links.map(l => (
          <li key={l.label}>
            {l.isRoute
              ? <Link to={l.to} className="text-pink-400">{l.label}</Link>
              : <a href={l.to} className="transition-colors hover:text-pink-400">{l.label}</a>
            }
          </li>
        ))}
        <li>
          <Link to="/cart" className="relative transition-colors hover:text-pink-400">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </li>
      </ul>

      {/* Mobile right: cart + burger */}
      <div className="z-50 flex items-center gap-4 md:hidden">
        <Link to="/cart" className="relative text-gray-600">
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
        <button onClick={() => setOpen(!open)} className="flex flex-col gap-1.5">
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#FDF6EF] border-t border-pink-100 shadow-md z-40 flex flex-col px-6 py-6 gap-5 md:hidden">
          {links.map(l => (
            <a
              key={l.label}
              href={l.to}
              onClick={() => setOpen(false)}
              className="text-sm text-gray-600 transition-colors hover:text-pink-400"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}