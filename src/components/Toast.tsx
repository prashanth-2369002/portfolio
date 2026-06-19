import { AnimatePresence, motion } from 'framer-motion'
import { Check, Info } from 'lucide-react'
import { useToast } from '../hooks/useToast'

export default function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md pointer-events-auto"
            style={{
              backgroundColor: 'rgba(7, 26, 46, 0.92)',
              borderColor: 'rgba(0, 180, 216, 0.35)',
              minWidth: 220,
            }}
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: toast.type === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(0,180,216,0.15)' }}
            >
              {toast.type === 'success'
                ? <Check size={14} className="text-green-400" />
                : <Info size={14} className="text-accent" />
              }
            </div>
            <span className="text-sm text-white font-medium">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
