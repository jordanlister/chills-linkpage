'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Galaxy from './Galaxy'

interface ClientGalaxyProps {
  mouseRepulsion?: boolean;
  mouseInteraction?: boolean;
  density?: number;
  glowIntensity?: number;
  saturation?: number;
  hueShift?: number;
  repulsionStrength?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  className?: string;
}

export default function ClientGalaxy(props: ClientGalaxyProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <motion.div 
        className={`${props.className} bg-black`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={props.className}
    >
      <Galaxy {...props} transparent={false} />
    </motion.div>
  )
}