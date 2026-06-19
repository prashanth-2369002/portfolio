import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Linkedin, Download, Send, Check, MapPin, ExternalLink, Copy } from 'lucide-react'
import { useToast } from '../hooks/useToast'

interface ContactProps {
  isDark: boolean
}

const RESUME_URL = '/resume_prashanth.pdf'
const LINKEDIN   = 'https://www.linkedin.com/in/malla-prashanth-b30a93410'
const GITHUB     = 'https://github.com/prashanth-2369002'
const EMAIL      = 'prashanthmalla920@gmail.com'

// ─── 4 Premium Contact Cards ────────────────────────────────────────────────
const contactCards = [
  {
    icon: Mail,
    title: 'Email',
    subtitle: 'Direct Message',
    value: EMAIL,
    display: 'prashanthmalla920\n@gmail.com',
    cta: 'Send Email',
    ctaHref: `mailto:${EMAIL}`,
    copyable: true,
    external: false,
    color: '#00B4D8',
    bg: 'rgba(0,180,216,0.07)',
    border: 'rgba(0,180,216,0.25)',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    subtitle: 'Professional Profile',
    value: LINKEDIN,
    display: 'malla-prashanth',
    tags: ['Engineering', 'Embedded Systems', 'EV Technology'],
    cta: 'Connect',
    ctaHref: LINKEDIN,
    copyable: false,
    external: true,
    color: '#0A66C2',
    bg: 'rgba(10,102,194,0.07)',
    border: 'rgba(10,102,194,0.25)',
  },
  {
    icon: Github,
    title: 'GitHub',
    subtitle: 'Source Code & Projects',
    value: GITHUB,
    display: 'prashanth-2369002',
    repos: ['AI-Based V2V System', 'Smart Parking System', 'EV Charging System'],
    cta: 'View Profile',
    ctaHref: GITHUB,
    copyable: false,
    external: true,
    color: '#48CAE4',
    bg: 'rgba(72,202,228,0.07)',
    border: 'rgba(72,202,228,0.25)',
  },
  {
    icon: Download,
    title: 'Resume',
    subtitle: 'Full CV · PDF',
    value: RESUME_URL,
    display: 'Resume_Malla_Prashanth',
    highlights: ['B.Tech EEE · CGPA 9.30', 'ITC Ltd Internship', 'TCS NQT · 89.65%'],
    cta: 'Download PDF',
    ctaHref: RESUME_URL,
    download: 'Resume_Malla_Prashanth.pdf',
    copyable: false,
    external: true,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.07)',
    border: 'rgba(16,185,129,0.25)',
  },
]

function ContactCard({ card, isDark, index }: { card: typeof contactCards[0]; isDark: boolean; index: number }) {
  const { addToast } = useToast()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = card.icon

  const copyValue = async () => {
    await navigator.clipboard.writeText(card.value)
    addToast('Email copied to clipboard', 'success')
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={`relative rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 ${
        isDark
          ? 'bg-[#0E2F44]/70 border-white/8 hover:shadow-xl hover:shadow-black/30'
          : 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/60'
      }`}
    >
      {/* Top accent stripe */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${card.color}, transparent 70%)` }} />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.08 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center border-2"
            style={{ backgroundColor: card.bg, borderColor: card.border }}
          >
            <Icon size={22} style={{ color: card.color }} />
          </motion.div>
          {card.copyable && (
            <motion.button
              onClick={copyValue}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              title="Copy email"
            >
              <Copy size={14} />
            </motion.button>
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className={`font-heading font-bold text-lg ${isDark ? 'text-white' : 'text-foreground'}`}>{card.title}</h3>
          <p className="text-sm font-medium" style={{ color: card.color }}>{card.subtitle}</p>
          <p className={`font-mono text-xs mt-1.5 break-all ${isDark ? 'text-slate-400' : 'text-muted'}`}>{card.display}</p>
        </div>

        {/* Tags / repos / highlights */}
        {'tags' in card && card.tags && (
          <div className="flex flex-wrap gap-1.5">
            {card.tags.map(t => (
              <span key={t} className="px-2 py-0.5 rounded-full text-xs border" style={{ color: card.color, borderColor: card.border, backgroundColor: card.bg }}>
                {t}
              </span>
            ))}
          </div>
        )}
        {'repos' in card && card.repos && (
          <ul className="space-y-1">
            {card.repos.map(r => (
              <li key={r} className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-slate-400' : 'text-muted'}`}>
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: card.color }} />
                {r}
              </li>
            ))}
          </ul>
        )}
        {'highlights' in card && card.highlights && (
          <ul className="space-y-1">
            {card.highlights.map(h => (
              <li key={h} className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-slate-400' : 'text-muted'}`}>
                <Check size={11} style={{ color: card.color }} className="flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <motion.a
          href={card.ctaHref}
          target={card.external ? '_blank' : undefined}
          rel={card.external ? 'noopener noreferrer' : undefined}
          download={'download' in card ? card.download : undefined}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}CC)` }}
        >
          <Icon size={14} />
          {card.cta}
          <ExternalLink size={12} className="opacity-70" />
        </motion.a>
      </div>
    </motion.div>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm({ isDark }: { isDark: boolean }) {
  const { addToast } = useToast()
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    addToast('Message sent! I\'ll get back to you soon.', 'success')
    setTimeout(() => setSent(false), 4000)
  }

  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 ${
    isDark
      ? 'bg-black/20 border-white/8 text-white placeholder-slate-500'
      : 'bg-surface border-slate-200 text-foreground placeholder-slate-400'
  }`

  return (
    <div className={`rounded-2xl border p-6 ${isDark ? 'bg-[#0E2F44]/70 border-white/8' : 'bg-white border-slate-200 shadow-sm'}`}>
      <h3 className={`font-heading font-bold text-lg mb-5 ${isDark ? 'text-white' : 'text-foreground'}`}>Send a Message</h3>

      {sent ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-10 gap-3">
          <div className="w-14 h-14 rounded-full bg-green-400/10 border-2 border-green-400 flex items-center justify-center">
            <Check size={24} className="text-green-400" />
          </div>
          <p className={`font-semibold ${isDark ? 'text-white' : 'text-foreground'}`}>Message Sent!</p>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted'}`}>I'll get back to you as soon as possible.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Full Name</label>
              <input type="text" required placeholder="John Doe" value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Email Address</label>
              <input type="email" required placeholder="john@company.com" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Subject</label>
            <input type="text" required placeholder="Internship opportunity / Project collaboration" value={form.subject}
              onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Message</label>
            <textarea required rows={5} placeholder="Tell me about the opportunity or project..."
              value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              className={`${inputCls} resize-none`} />
          </div>
          <motion.button
            type="submit" disabled={sending}
            whileHover={sending ? {} : { scale: 1.02 }}
            whileTap={sending ? {} : { scale: 0.98 }}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
              sending ? 'bg-accent/50 text-white cursor-not-allowed' : 'bg-accent hover:bg-highlight text-white shadow-lg shadow-accent/20'
            }`}
          >
            {sending ? (
              <>
                <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                Sending...
              </>
            ) : (
              <><Send size={15} /> Send Message</>
            )}
          </motion.button>
        </form>
      )}
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Contact({ isDark }: ContactProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className={`section-padding ${isDark ? 'bg-secondary/20' : 'bg-slate-50'}`}>
      <div className="container-max">

        {/* Header */}
        <div className="text-center mb-14" ref={ref}>
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="font-mono text-xs tracking-[0.25em] uppercase text-accent">
            07. Contact
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className={`font-heading text-3xl sm:text-4xl font-bold mt-2 ${isDark ? 'text-white' : 'text-foreground'}`}>
            Get In Touch
          </motion.h2>
          <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-accent to-highlight mx-auto mt-4 rounded-full" />
          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
            className={`mt-4 text-base max-w-lg mx-auto ${isDark ? 'text-slate-400' : 'text-muted'}`}>
            Interested in collaboration, internships, or full-time opportunities? Let's connect.
          </motion.p>
        </div>

        {/* 4 contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {contactCards.map((card, i) => (
            <ContactCard key={card.title} card={card} isDark={isDark} index={i} />
          ))}
        </div>

        {/* Location + Form row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Location + availability */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className={`lg:col-span-2 flex flex-col gap-4`}
          >
            <div className={`rounded-2xl border p-5 flex items-start gap-3 ${isDark ? 'bg-[#0E2F44]/70 border-white/8' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center flex-shrink-0">
                <MapPin size={16} className="text-accent" />
              </div>
              <div>
                <p className={`text-xs font-mono uppercase tracking-wider mb-0.5 ${isDark ? 'text-slate-500' : 'text-muted'}`}>Location</p>
                <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-foreground'}`}>Vijayawada, Andhra Pradesh</p>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-muted'}`}>India · Open to relocation</p>
              </div>
            </div>

            <div className={`rounded-2xl border p-5 ${isDark ? 'bg-accent/5 border-accent/20' : 'bg-accent/5 border-accent/20'}`}>
              <div className="flex items-center gap-2 mb-3">
                <motion.div className="w-2 h-2 rounded-full bg-green-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="font-mono text-xs text-accent uppercase tracking-widest">Availability</span>
              </div>
              <p className={`font-heading font-semibold text-base mb-1 ${isDark ? 'text-white' : 'text-foreground'}`}>Open to Opportunities</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['Internships', 'Full-time', 'Projects', 'Collaborations'].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-xs border border-accent/25 text-accent bg-accent/5">{t}</span>
                ))}
              </div>
            </div>

            <div className={`rounded-2xl border p-5 ${isDark ? 'bg-[#0E2F44]/70 border-white/8' : 'bg-white border-slate-200 shadow-sm'}`}>
              <p className={`text-xs font-mono uppercase tracking-wider mb-3 ${isDark ? 'text-slate-500' : 'text-muted'}`}>Preferred Contact</p>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-accent hover:text-highlight transition-colors">
                <Mail size={14} />
                <span className="text-sm font-medium">{EMAIL}</span>
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="lg:col-span-3"
          >
            <ContactForm isDark={isDark} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
