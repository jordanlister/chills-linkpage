'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ClientGalaxy = dynamic(() => import('@/components/ClientGalaxy'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black" />
})

export default function Home() {
  return (
    <div className="min-h-screen relative flex items-center justify-center pb-24">
      <ClientGalaxy 
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.2}
        glowIntensity={0.4}
        saturation={0.6}
        hueShift={280}
        className="absolute inset-0"
      />
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            CHILLS
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Access your dance camp videos
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link href="/students">
              <motion.button
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Student Links
              </motion.button>
            </Link>

            <Link href="/teachers">
              <motion.button
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Teacher Links
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}
