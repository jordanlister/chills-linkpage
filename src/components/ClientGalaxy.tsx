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
    
    // Ensure Galaxy covers full document height
    const updateGalaxyHeight = () => {
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
        htmlElement.style.height = Math.max(documentHeight, window.innerHeight * 5) + 'px'
        htmlElement.style.minHeight = Math.max(documentHeight, window.innerHeight * 5) + 'px'
      })
    }
    
    // Update on mount and resize
    updateGalaxyHeight()
    window.addEventListener('resize', updateGalaxyHeight)
    
    // Update when content changes
    const observer = new MutationObserver(updateGalaxyHeight)
    observer.observe(document.body, { childList: true, subtree: true })
    
    return () => {
      window.removeEventListener('resize', updateGalaxyHeight)
      observer.disconnect()
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