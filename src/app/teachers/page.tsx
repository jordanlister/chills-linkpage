'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import ClientGalaxy from '@/components/ClientGalaxy'

const teacherLinks = [
  { day: 1, class: "CHILLS-TAISHA MONIQUE-DIVINE FEMME", link: "https://f.io/F-WdWfk1" },
  { day: 1, class: "CHILLS-VEE-VIBEZ", link: "https://f.io/b1rHinEX" },
  { day: 1, class: "CHILLS-ADISON BRIANA-FLOORPLAY", link: "https://f.io/p1UXoVQD" },
  { day: 1, class: "HECTOR KRAMER-HEELS FEELS", link: "https://f.io/OZ0ouNBx" },
  { day: 2, class: "CHILLS-KIIRA HARPER-HEELS", link: "https://f.io/_S8n-GcF" },
  { day: 2, class: "CHILLS-NIKA CHILL-TWERK", link: "https://f.io/XOs4h0BR" },
  { day: 2, class: "CHILLS-BRINN NICOLE-STAGE CONFIDENCE", link: "https://f.io/WuWufHFw" },
  { day: 2, class: "CHILLS-NICOLE KIRKLAND X ZONTA-STREET HEELS", link: "https://f.io/uhN8-X5i" },
  { day: 3, class: "CHILLS-DEANNA LEGGETT-HIP HOP", link: "https://f.io/BhoxCtLf" },
  { day: 3, class: "CHILLS-SKYLER HOSTETLER-STREET HEELS", link: "https://f.io/P0XmQiL3" },
  { day: 3, class: "CHILLS-POLINA GLEN-VOUGE FEMME", link: "https://f.io/V0FBrRYA" },
  { day: 3, class: "CHILLS-MARISSA HEART-HEARTBREAK HEELS", link: "https://f.io/43fIEoFk" }
]

export default function Teachers() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'Chills2025') {
      setIsAuthenticated(true)
      setShowError(false)
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }

  const groupedByDay = teacherLinks.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = []
    acc[item.day].push(item)
    return acc
  }, {} as Record<number, typeof teacherLinks>)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative flex items-center justify-center px-4">
        <ClientGalaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={0.8}
          glowIntensity={0.5}
          saturation={0.5}
          hueShift={200}
          className="absolute inset-0"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full"
        >
          <Link href="/" className="inline-block mb-6">
            <motion.button
              className="text-white/70 hover:text-white flex items-center gap-2 transition-colors"
              whileHover={{ x: -5 }}
            >
              ← Back to Home
            </motion.button>
          </Link>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Teacher Access</h1>
            <p className="text-gray-300">Enter password to access teacher links</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                autoFocus
              />
              {showError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2"
                >
                  Incorrect password. Please try again.
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Access Teacher Links
            </motion.button>
          </form>

        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative py-12 px-4">
      <ClientGalaxy 
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.0}
        glowIntensity={0.4}
        saturation={0.6}
        hueShift={200}
        className="absolute inset-0"
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <motion.button
                className="text-white/70 hover:text-white flex items-center gap-2 transition-colors"
                whileHover={{ x: -5 }}
              >
                ← Back to Home
              </motion.button>
            </Link>
            
            <motion.button
              onClick={() => setIsAuthenticated(false)}
              className="text-white/70 hover:text-white text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Logout
            </motion.button>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Teacher Links
          </h1>
          <p className="text-xl text-gray-300">
            Access your dance camp teaching videos by day
          </p>
        </motion.div>

        {Object.entries(groupedByDay).map(([day, classes]) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: parseInt(day) * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Day {day}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              {classes.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group w-48 flex-shrink-0"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (parseInt(day) - 1) * 0.1 + index * 0.05 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {day}
                    </div>
                    <motion.div
                      className="text-white/60 group-hover:text-white transition-colors"
                      whileHover={{ rotate: 45 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </motion.div>
                  </div>
                  
                  <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-blue-300 transition-colors leading-tight">
                    {item.class.split('-').map(part => part.trim()).join(' • ')}
                  </h3>
                  
                  <p className="text-gray-400 text-xs">
                    Click to watch video
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  )
}