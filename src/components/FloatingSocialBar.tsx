import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Download, ArrowUp } from 'lucide-react'
import { useToast } from '../hooks/useToast'

interface FloatingSocialBarProps {
  isDark: boolean
}

const RESUME_URL  = '/resume_prashanth.pdf'
const LINKEDIN    = 'https://www.linkedin.com/in/malla-prashanth-b30a93410'
const GITHUB      = 'https://github.com/prashanth-2369002'
const EMAIL       = 'prashanthmalla920@gmail.com'

export default function FloatingSocialBar({ isDark }: FloatingSocialBarProps) {
  const { addToast } = useToast()
  const [showTop, setShowTop] = useState(false)

  // show back-to-top after 400px scroll
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => setShowTop(window.scrollY > 400), { passive: true })
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL)
    addToast('Email copied to clipboard', 'success')
  }

  const trackDownload = () => {
    addToast('Resume downloading…', 'info')
  }

  const links = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: LINKEDIN,
      action: () => {},
      external: true,
    },
    {
      icon: Github,
      label: 'GitHub',
      href: GITHUB,
      action: () => {},
      external: true,
    },
    {
      icon: Mail,
      label: 'Copy Email',
      href: null,
      action: copyEmail,
      external: false,
    },
    {
      icon: Download,
      label: 'Resume',
      href: RESUME_URL,
      action: trackDownload,
      external: true,
      download: true,
    },
  ]

  return (
    <>
      {/* Left floating bar — desktop only */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="hidden lg:flex fixed left-5 bottom-8 z-40 flex-col items-center gap-2"
      >
        {links.map(({ icon: Icon, label, href, action, external, download }) => (
          <div key={label} className="relative group">
            {href ? (
              <motion.a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                download={download ? true : undefined}
                onClick={action}
                whileHover={{ scale: 1.15, x: 4 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                  isDark
                    ? 'bg-primary/80 border-accent/20 text-slate-400 hover:text-accent hover:border-accent/50 hover:bg-accent/5 backdrop-blur-sm'
                    : 'bg-white/90 border-slate-200 text-slate-500 hover:text-accent hover:border-accent/40 shadow-sm backdrop-blur-sm'
                }`}
              >
                <Icon size={15} />
              </motion.a>
            ) : (
              <motion.button
                onClick={action}
                whileHover={{ scale: 1.15, x: 4 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                  isDark
                    ? 'bg-primary/80 border-accent/20 text-slate-400 hover:text-accent hover:border-accent/50 hover:bg-accent/5 backdrop-blur-sm'
                    : 'bg-white/90 border-slate-200 text-slate-500 hover:text-accent hover:border-accent/40 shadow-sm backdrop-blur-sm'
                }`}
              >
                <Icon size={15} />
              </motion.button>
            )}
            {/* Tooltip */}
            <div className={`absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity border ${
              isDark ? 'bg-primary border-accent/20 text-slate-200' : 'bg-white border-slate-200 text-slate-700 shadow-md'
            }`}>
              {label}
            </div>
          </div>
        ))}

        {/* Vertical line */}
        <div className={`w-px h-12 mt-1 ${isDark ? 'bg-accent/20' : 'bg-slate-300'}`} />
      </motion.div>

      {/* Back to top — appears after scroll */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`fixed bottom-8 right-5 z-40 w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg transition-all ${
              isDark
                ? 'bg-primary border-accent/30 text-accent hover:bg-accent/10'
                : 'bg-white border-slate-200 text-accent hover:bg-accent/5'
            }`}
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
