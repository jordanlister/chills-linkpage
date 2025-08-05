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
  className?: string;
}

export default function ClientGalaxy(props: ClientGalaxyProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={props.className} />
  }

  return <Galaxy {...props} transparent={false} />
}