'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Mountain, BookOpen, Users, ShoppingBag, User, Menu, X, ShoppingCart } from 'lucide-react'

const navLinks = [
  { href: '/', label: '首页', icon: Mountain },
  { href: '/content', label: '内容中心', icon: BookOpen },
  { href: '/community', label: '社区', icon: Users },
  { href: '/store', label: '商城', icon: ShoppingBag },
  { href: '/about', label: '关于我', icon: User },
]

export default function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('trail-cart') || '[]')
        setCartCount(cart.reduce((sum: number, item: { qty: number }) => sum + item.qty, 0))
      } catch {
        setCartCount(0)
      }
    }
    updateCart()
    window.addEventListener('storage', updateCart)
    window.addEventListener('cart-updated', updateCart)
    return () => {
      window.removeEventListener('storage', updateCart)
      window.removeEventListener('cart-updated', updateCart)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-[#0d1a0e]/95 backdrop-blur border-b border-[#2d4a30]">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Mountain className="text-[#5c9e6e]" size={24} />
          <span className="text-[#e8e4dc]">越野巅峰</span>
          <span className="text-[#5c9e6e] text-sm font-normal hidden sm:block">Trail Master</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-[#2d4a30] text-[#7dba8e] font-medium'
                    : 'text-[#8fa898] hover:text-[#e8e4dc] hover:bg-[#1e3022]'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Cart + Mobile menu */}
        <div className="flex items-center gap-2">
          <Link
            href="/store"
            className="relative p-2 rounded-lg text-[#8fa898] hover:text-[#e8e4dc] hover:bg-[#1e3022] transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d4622a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2 rounded-lg text-[#8fa898] hover:text-[#e8e4dc] hover:bg-[#1e3022] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d1a0e] border-t border-[#2d4a30] px-4 py-3 flex flex-col gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-[#2d4a30] text-[#7dba8e] font-medium'
                    : 'text-[#8fa898] hover:text-[#e8e4dc] hover:bg-[#1e3022]'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
