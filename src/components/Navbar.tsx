import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Zap, Download, Github, Linkedin, Mail } from 'lucide-react'

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
}

const RESUME_URL = '/resume_prashanth.pdf'
const LINKEDIN   = 'https://www.linkedin.com/in/malla-prashanth-b30a93410'
const GITHUB     = 'https://github.com/prashanth-2369002'
const EMAIL      = 'mailto:prashanthmalla920@gmail.com'

const navLinks = [
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
]

const iconLinks = [
  { icon: Github,   href: GITHUB,  label: 'GitHub',   external: true  },
  { icon: Linkedin, href: LINKEDIN, label: 'LinkedIn', external: true  },
  { icon: Mail,     href: EMAIL,   label: 'Email',    external: false },
]

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [scrolled,       setScrolled]       = useState(false)
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [activeSection,  setActiveSection]  = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { threshold: 0.3 }
    )
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const goto = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'bg-primary/90 backdrop-blur-md border-b border-accent/10 shadow-lg shadow-black/20'
            : 'bg-white/90 backdrop-blur-md border-b border-accent/20 shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={e => { e.preventDefault(); goto('#hero') }}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-highlight flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-heading font-semibold text-sm tracking-wide text-accent">MP</span>
          </motion.a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => {
              const id = link.href.replace('#', '')
              const active = activeSection === id
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); goto(link.href) }}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    active
                      ? 'text-accent'
                      : isDark ? 'text-slate-300 hover:text-accent' : 'text-slate-600 hover:text-accent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {active && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-accent/10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              )
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Icon links — desktop */}
            <div className="hidden md:flex items-center gap-1">
              {iconLinks.map(({ icon: Icon, href, label, external }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  title={label}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark
                      ? 'text-slate-400 hover:text-accent hover:bg-accent/5'
                      : 'text-slate-500 hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-slate-400 hover:text-accent hover:bg-white/5'
                  : 'text-slate-500 hover:text-accent hover:bg-slate-100'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </motion.button>

            {/* Resume button — desktop */}
            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Download Resume"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-highlight transition-colors"
            >
              <Download size={13} />
              Resume
            </motion.a>

            {/* Mobile menu */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className={`md:hidden p-2 rounded-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t backdrop-blur-md ${
              isDark ? 'bg-primary/95 border-accent/10' : 'bg-white/95 border-slate-200'
            }`}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); goto(link.href) }}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isDark
                      ? 'text-slate-300 hover:text-accent hover:bg-white/5'
                      : 'text-slate-600 hover:text-accent hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile social row */}
              <div className="flex gap-2 mt-2 px-2">
                {iconLinks.map(({ icon: Icon, href, label, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border text-sm transition-colors ${
                      isDark
                        ? 'border-white/10 text-slate-300 hover:text-accent hover:border-accent/30'
                        : 'border-slate-200 text-slate-600 hover:text-accent'
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                ))}
              </div>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white text-sm font-medium rounded-lg"
              >
                <Download size={14} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
