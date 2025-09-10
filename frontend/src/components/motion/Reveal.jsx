// src/components/motion/Reveal.jsx
import { motion } from 'framer-motion'

const BASE = {
  initial:    { opacity: 0, y: 12 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true, margin: '0px 0px -20% 0px' },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export default function Reveal({
  children,
  // optionale Overrides
  initial,
  within,          // falls du eine alternative Target-Animation übergeben willst
  whileInView,
  viewport,
  transition,
  delay = 0,
  className,
  ...rest
}) {
  const cfg = {
    initial:    initial     ?? BASE.initial,
    whileInView:whileInView ?? BASE.whileInView,
    viewport:   viewport    ?? BASE.viewport,
    transition: { ...(transition ?? BASE.transition), delay },
  }

  return (
    <motion.div
      initial={cfg.initial}
      whileInView={within || cfg.whileInView}   // ← genau diese eine Zeile
      viewport={cfg.viewport}
      transition={cfg.transition}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
