'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ClientGalaxy from '@/components/ClientGalaxy'

const studentLinks = [
  { day: 1, class: "CHILLS-TAISHA MONIQUE-DIVINE FEMME", link: "https://f.io/fAS6wLZn" },
  { day: 1, class: "CHILLS-VEE-VIBEZ", link: "https://f.io/XR6aIelo" },
  { day: 1, class: "CHILLS-ADISON BRIANA-FLOORPLAY", link: "https://f.io/zVtHuMC8" },
  { day: 1, class: "HECTOR KRAMER-HEELS FEELS", link: "https://f.io/Md9bGBT3" },
  { day: 2, class: "CHILLS-KIIRA HARPER-HEELS", link: "https://f.io/jvDMV1tG" },
  { day: 2, class: "CHILLS-NIKA CHILL-TWERK", link: "https://f.io/br_S8fw0" },
  { day: 2, class: "CHILLS-BRINN NICOLE-STAGE CONFIDENCE", link: "https://f.io/XYOZat2g" },
  { day: 2, class: "CHILLS-NICOLE KIRKLAND X ZONTA-STREET HEELS", link: "https://f.io/jdQtvKtF" },
  { day: 3, class: "CHILLS-DEANNA LEGGETT-HIP HOP", link: "https://f.io/zzFW0ueH" },
  { day: 3, class: "CHILLS-SKYLER HOSTETLER-STREET HEELS", link: "https://f.io/G9QgfOrL" },
  { day: 3, class: "CHILLS-POLINA GLEN-VOUGE FEMME", link: "https://f.io/evoIFnGK" },
  { day: 3, class: "CHILLS-MARISSA HEART-HEARTBREAK HEELS", link: "https://f.io/HX-XzPiW" }
]

export default function Students() {

  const groupedByDay = studentLinks.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = []
    acc[item.day].push(item)
    return acc
  }, {} as Record<number, typeof studentLinks>)

  return (
    <div className="min-h-screen relative py-12 px-4">
      <ClientGalaxy 
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.0}
        glowIntensity={0.3}
        saturation={0.7}
        hueShift={320}
        className="absolute inset-0"
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-block mb-8">
            <motion.button
              className="text-white/70 hover:text-white flex items-center gap-2 transition-colors"
              whileHover={{ x: -5 }}
            >
              ← Back to Home
            </motion.button>
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            Student Links
          </h1>
          <p className="text-xl text-gray-300">
            Access your dance camp videos by day
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
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
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
                  
                  <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-pink-300 transition-colors leading-tight">
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