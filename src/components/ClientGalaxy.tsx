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
  className?: string;
}

export default function ClientGalaxy(props: ClientGalaxyProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
    
    if (isMobile) {
      // For mobile, use simpler static approach to avoid performance issues
      return
    }
    
    // Desktop: Throttled height updates to prevent performance issues
    let timeoutId: NodeJS.Timeout | null = null
    
    const updateGalaxyHeight = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      
      timeoutId = setTimeout(() => {
        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        )
        
        const galaxyElements = document.querySelectorAll('.galaxy-container, .galaxy-container canvas')
        galaxyElements.forEach((element) => {
          const htmlElement = element as HTMLElement
          const targetHeight = Math.max(documentHeight, window.innerHeight * 3)
          htmlElement.style.height = targetHeight + 'px'
          htmlElement.style.minHeight = targetHeight + 'px'
        })
        timeoutId = null
      }, 150) // 150ms debounce
    }
    
    // Initial update only
    updateGalaxyHeight()
    
    // Only listen to resize, not mutation observer (too heavy)
    let resizeTimeout: NodeJS.Timeout | null = null
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      resizeTimeout = setTimeout(updateGalaxyHeight, 300)
    }
    
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (resizeTimeout) clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
    }
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