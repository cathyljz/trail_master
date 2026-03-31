'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Mountain, BookOpen, Users, ShoppingBag, User, Menu, X, ShoppingCart } from 'lucide-react'

const navLinks = [
  { href: '/', label: '首页', icon: Mountain },
  { href: '/content', label: '内容', icon: BookOpen },
  { href: '/community', label: '约跑·赛事', icon: Users },
  { href: '/store', label: '商城', icon: ShoppingBag },
  { href: '/about', label: '关于我', icon: User },
]

export default function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#091409]/98 backdrop-blur-xl shadow-[0_1px_0_rgba(74,222,128,0.08)] border-b border-[#1e3820]'
          : 'bg-[#091409]/80 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4ade80] to-[#16a34a] flex items-center justify-center shadow-[0_0_12px_rgba(74,222,128,0.25)] group-hover:shadow-[0_0_20px_rgba(74,222,128,0.45)] transition-shadow duration-300">
            <Mountain className="text-[#091409]" size={17} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none gap-0.5">
            <span className="text-[#f0ece4] font-bold text-sm tracking-tight">越野巅峰</span>
            <span className="text-[#4ade80] text-[9px] font-semibold tracking-[0.15em] uppercase hidden sm:block">Trail Master</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'text-[#4ade80]'
                    : 'text-[#7a9b83] hover:text-[#f0ece4] hover:bg-[#192b1a]/60'
                }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#4ade80] shadow-[0_0_6px_2px_rgba(74,222,128,0.5)]" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Cart + Mobile menu */}
        <div className="flex items-center gap-1">
          <Link
            href="/store"
            className="relative p-2.5 rounded-lg text-[#7a9b83] hover:text-[#f0ece4] hover:bg-[#192b1a] transition-all duration-200"
          >
            <ShoppingCart size={19} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#f97316] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2.5 rounded-lg text-[#7a9b83] hover:text-[#f0ece4] hover:bg-[#192b1a] transition-all duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#091409]/98 backdrop-blur-xl border-t border-[#1e3820] px-4 py-3 flex flex-col gap-1 animate-fade-in">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/20'
                    : 'text-[#7a9b83] hover:text-[#f0ece4] hover:bg-[#192b1a]'
                }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
