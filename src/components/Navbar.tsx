'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#about',     label: 'Về tôi' },
  { href: '#services',  label: 'Dịch vụ' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#blog',      label: 'Blog' },
  { href: '#contact',   label: 'Liên hệ' },
]

export function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [hidden, setHidden]           = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [lastY, setLastY]             = useState(0)
  const [mounted, setMounted]         = useState(false)
  const { theme, setTheme }           = useTheme()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setHidden(y > lastY && y > 200)
      setLastY(y)

      // Active section tracking
      const sections = document.querySelectorAll<HTMLElement>('section[id]')
      sections.forEach(sec => {
        if (y + 100 >= sec.offsetTop && y + 100 < sec.offsetTop + sec.offsetHeight) {
          setActiveSection(sec.id)
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  // Close mobile menu on link click
  const handleNavClick = () => setMobileOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 h-[68px]"
        style={{
          background: scrolled ? 'color-mix(in srgb, var(--bg-primary) 88%, transparent)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          transition: 'background .3s, box-shadow .3s, border-color .3s',
        }}
        role="navigation"
        aria-label="Điều hướng chính"
      >
        <div
          className="flex items-center justify-between h-full mx-auto px-6"
          style={{ maxWidth: 1160 }}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="font-display text-xl font-black gradient-text"
            style={{ fontFamily: 'Syne, sans-serif' }}
            aria-label="Về trang chủ"
          >
            DDV.
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium px-4 py-2 rounded-lg transition-all"
                  style={{
                    color: activeSection === link.href.slice(1) ? 'var(--accent)' : 'var(--text-secondary)',
                    background: activeSection === link.href.slice(1) ? 'var(--gradient-soft)' : 'transparent',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                style={{
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                }}
                aria-label="Chuyển đổi sáng/tối"
              >
                {theme === 'dark' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
              </button>
            )}

            {/* Hamburger */}
            <button
              className="flex md:hidden flex-col gap-[5px] p-2 w-9"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Mở menu"
              aria-expanded={mobileOpen}
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block h-[2px] rounded transition-all"
                  style={{
                    background: 'var(--text-primary)',
                    width: i === 1 ? (mobileOpen ? '100%' : '66%') : '100%',
                    transform: mobileOpen
                      ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                      : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                      : 'scaleX(0)'
                      : 'none',
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 z-40 flex flex-col gap-2 p-6"
            style={{
              top: 68,
              bottom: 0,
              background: 'var(--bg-primary)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={handleNavClick}
                className="text-lg font-semibold px-4 py-3 rounded-xl transition-all"
                style={{
                  color: 'var(--text-primary)',
                  background: 'var(--bg-secondary)',
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
