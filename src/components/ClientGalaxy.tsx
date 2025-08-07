'use client'

import { useEffect, useState } from 'react'
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
      <div 
        className={`${props.className} bg-black`}
        style={{ opacity: 1 }}
      />
    )
  }

  return (
    <div className={props.className} style={{ opacity: 1 }}>
      <Galaxy {...props} transparent={false} />
    </div>
  )
}