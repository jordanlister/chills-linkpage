'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const ClientGalaxy = dynamic(() => import('@/components/ClientGalaxy'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black" />
})

const studentLinks = [
  { day: 1, class: "TAISHA MONIQUE-DIVINE FEMME", link: "https://f.io/fAS6wLZn" },
  { day: 1, class: "VEE-VIBEZ", link: "https://f.io/XR6aIelo" },
  { day: 1, class: "ADISON BRIANA-FLOORPLAY", link: "https://f.io/zVtHuMC8" },
  { day: 1, class: "HECTOR KRAMER-HEELS FEELS", link: "https://f.io/Md9bGBT3" },
  { day: 2, class: "KIIRA HARPER-HEELS", link: "https://f.io/jvDMV1tG" },
  { day: 2, class: "NIKA CHILL-TWERK", link: "https://f.io/br_S8fw0" },
  { day: 2, class: "BRINN NICOLE-STAGE CONFIDENCE", link: "https://f.io/XYOZat2g" },
  { day: 2, class: "NICOLE KIRKLAND X ZONTA-STREET HEELS", link: "https://f.io/jdQtvKtF" },
  { day: 3, class: "DEANNA LEGGETT-HIP HOP", link: "https://f.io/zzFW0ueH" },
  { day: 3, class: "SKYLER HOSTETLER-STREET HEELS", link: "https://f.io/G9QgfOrL" },
  { day: 3, class: "POLINA GLEN-VOUGE FEMME", link: "https://f.io/evoIFnGK" },
  { day: 3, class: "MARISSA HEART-HEARTBREAK HEELS", link: "https://f.io/HX-XzPiW" }
]

const teacherLinks = [
  { day: 1, class: "TAISHA MONIQUE-DIVINE FEMME", link: "https://f.io/F-WdWfk1" },
  { day: 1, class: "VEE-VIBEZ", link: "https://f.io/b1rHinEX" },
  { day: 1, class: "ADISON BRIANA-FLOORPLAY", link: "https://f.io/p1UXoVQD" },
  { day: 1, class: "HECTOR KRAMER-HEELS FEELS", link: "https://f.io/OZ0ouNBx" },
  { day: 2, class: "KIIRA HARPER-HEELS", link: "https://f.io/_S8n-GcF" },
  { day: 2, class: "NIKA CHILL-TWERK", link: "https://f.io/XOs4h0BR" },
  { day: 2, class: "BRINN NICOLE-STAGE CONFIDENCE", link: "https://f.io/WuWufHFw" },
  { day: 2, class: "NICOLE KIRKLAND X ZONTA-STREET HEELS", link: "https://f.io/uhN8-X5i" },
  { day: 3, class: "DEANNA LEGGETT-HIP HOP", link: "https://f.io/BhoxCtLf" },
  { day: 3, class: "SKYLER HOSTETLER-STREET HEELS", link: "https://f.io/P0XmQiL3" },
  { day: 3, class: "POLINA GLEN-VOUGE FEMME", link: "https://f.io/V0FBrRYA" },
  { day: 3, class: "MARISSA HEART-HEARTBREAK HEELS", link: "https://f.io/43fIEoFk" }
]

type ViewType = 'home' | 'students' | 'teachers' | 'teacher-auth'

export default function MainApp() {
  const [currentView, setCurrentView] = useState<ViewType>('home')
  const [password, setPassword] = useState('')
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  const handleTeacherSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    requestAnimationFrame(() => {
      if (password === 'Chills2025') {
        setIsTeacherAuthenticated(true)
        setCurrentView('teachers')
        setShowError(false)
      } else {
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
      }
    })
  }, [password])

  const handleStudentClick = useCallback(() => {
    // Batch state update to prevent multiple renders
    requestAnimationFrame(() => {
      setCurrentView('students')
    })
  }, [])

  const handleTeacherClick = useCallback(() => {
    requestAnimationFrame(() => {
      if (isTeacherAuthenticated) {
        setCurrentView('teachers')
      } else {
        setCurrentView('teacher-auth')
      }
    })
  }, [isTeacherAuthenticated])

  const handleBackToHome = useCallback(() => {
    requestAnimationFrame(() => {
      setCurrentView('home')
    })
  }, [])

  const handleLogout = useCallback(() => {
    setIsTeacherAuthenticated(false)
    setPassword('')
    setCurrentView('home')
  }, [])

  // Detect mobile device and set loaded state
  useEffect(() => {
    const detectMobile = () => {
      const userAgentMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const screenSizeMobile = window.innerWidth <= 768
      setIsMobile(userAgentMobile || screenSizeMobile)
    }
    
    detectMobile()
    window.addEventListener('resize', detectMobile)
    
    // Set loaded after a brief delay to prevent initial render flash
    setTimeout(() => setIsLoaded(true), 100)
    
    return () => window.removeEventListener('resize', detectMobile)
  }, [])


  // Stable Galaxy component to prevent flickering re-renders
  const galaxyComponent = useMemo(() => (
    <div className="absolute inset-0" style={{ willChange: 'auto', transform: 'translateZ(0)' }}>
      <ClientGalaxy 
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.0}
        glowIntensity={0.3}
        saturation={0.7}
        hueShift={280}
        repulsionStrength={3}
        twinkleIntensity={0.3}
        rotationSpeed={0.01}
        className="absolute inset-0"
      />
    </div>
  ), [])

  const studentGroupedByDay = useMemo(() => studentLinks.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = []
    acc[item.day].push(item)
    return acc
  }, {} as Record<number, typeof studentLinks>), [])

  const teacherGroupedByDay = useMemo(() => teacherLinks.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = []
    acc[item.day].push(item)
    return acc
  }, {} as Record<number, typeof teacherLinks>), [])

  return (
    <div className="min-h-screen relative bg-black" style={{ backgroundColor: '#000000' }}>
      <div className="fixed inset-0 z-0 bg-black" style={{ isolation: 'isolate', backgroundColor: '#000000' }}>
        {galaxyComponent}
      </div>
      
      <div className="relative z-20 motion-container" style={{ pointerEvents: 'none', contain: 'layout style' }}>
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              className="min-h-screen flex items-center justify-center pb-24"
              initial={isLoaded ? (isMobile ? { opacity: 0 } : { opacity: 0, y: 0, scale: 0.9 }) : { opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={isMobile ? { opacity: 0 } : { opacity: 0, y: 0, scale: 0.9 }}
              transition={{ duration: isLoaded ? (isMobile ? 0.15 : 0.6) : 0, ease: 'easeOut' }}
              style={{ willChange: isMobile ? 'opacity' : 'transform, opacity' }}
            >
              <div className="text-center px-4">
                <motion.div
                  className="flex flex-col items-center justify-center gap-3 mb-8 opacity-95"
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 0.95, y: 0 }}
                  transition={{ delay: isMobile ? 0.05 : 0.05, duration: isMobile ? 0.15 : 0.6 }}
                  style={{ willChange: isMobile ? 'opacity' : 'transform, opacity' }}
                >
                  <Image 
                    src="/A LIST LOGO.png" 
                    alt="A List Creative" 
                    width={96}
                    height={96}
                    priority
                    className="w-20 h-20 md:w-24 md:h-24"
                    style={{ 
                      pointerEvents: 'none', 
                      objectFit: 'contain',
                      transform: 'translate3d(0, 0, 0)',
                      willChange: 'transform'
                    }}
                  />
                  <span className="text-white text-4xl md:text-5xl font-bold tracking-wider uppercase">
                    A List Creative
                  </span>
                </motion.div>
                
                <motion.div
                  className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6"
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, scaleX: 0 }}
                  animate={isMobile ? { opacity: 1 } : { opacity: 1, scaleX: 1 }}
                  transition={{ delay: isMobile ? 0.1 : 0.15, duration: isMobile ? 0.15 : 0.8 }}
                  style={{ willChange: isMobile ? 'opacity' : 'transform, opacity' }}
                />
                
                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0.15 : 0.1, duration: isMobile ? 0.15 : 0.6 }}
                  style={{ willChange: isMobile ? 'opacity' : 'transform, opacity' }}
                >
                  CHILLS
                </motion.h1>
                
                <motion.p
                  className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0.1 : 0.2, duration: isMobile ? 0.3 : 0.6 }}
                >
                  Access your dance camp videos
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0.15 : 0.3, duration: isMobile ? 0.3 : 0.6 }}
                >
                  <motion.button
                    onClick={handleStudentClick}
                    className={`px-8 py-4 rounded-full text-white font-semibold text-lg ${isMobile ? 'bg-white/15 hover-disabled mobile-optimized' : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-200'}`}
                    style={{ pointerEvents: 'auto' }}
                    whileHover={isMobile ? {} : { scale: 1.05, y: -2 }}
                    whileTap={isMobile ? {} : { scale: 0.98 }}
                  >
                    Student Links
                  </motion.button>

                  <motion.button
                    onClick={handleTeacherClick}
                    className={`px-8 py-4 rounded-full text-white font-semibold text-lg ${isMobile ? 'bg-white/15 hover-disabled mobile-optimized' : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-200'}`}
                    style={{ pointerEvents: 'auto' }}
                    whileHover={isMobile ? {} : { scale: 1.05, y: -2 }}
                    whileTap={isMobile ? {} : { scale: 0.98 }}
                  >
                    Teacher Links
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentView === 'students' && (
            <motion.div
              key="students"
              className="min-h-screen py-12 px-4 pb-24"
              initial={{ opacity: 0, y: isMobile ? 10 : 0, scale: isMobile ? 1 : 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: isMobile ? -10 : 0, scale: isMobile ? 1 : 0.9 }}
              transition={{ duration: isMobile ? 0.3 : 0.6 }}
            >
              <div className="max-w-6xl mx-auto">
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0.05 : 0.1, duration: isMobile ? 0.3 : 0.6 }}
                >
                  <motion.button
                    onClick={handleBackToHome}
                    className={`text-white/70 flex items-center gap-2 transition-colors mb-8 mx-auto ${isMobile ? 'hover-disabled' : 'hover:text-white'}`}
                    style={{ pointerEvents: 'auto' }}
                    whileHover={isMobile ? {} : { x: -5 }}
                  >
                    ← Back to Home
                  </motion.button>
                  
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                    Student Links
                  </h1>
                  <p className="text-xl text-gray-300">
                    Access your dance camp videos by day
                  </p>
                </motion.div>

                {Object.entries(studentGroupedByDay).map(([day, classes]) => (
                  <motion.div
                    key={day}
                    className="mb-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 + parseInt(day) * 0.1 }}
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
                          className={`block bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-colors duration-200 group w-48 flex-shrink-0 ${isMobile ? 'hover-disabled' : 'hover:bg-white/20'}`}
                          style={{ pointerEvents: 'auto' }}
                          whileHover={isMobile ? {} : { scale: 1.02, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + (parseInt(day) - 1) * 0.1 + index * 0.05, duration: 0.6 }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {day}
                            </div>
                            <motion.div
                              className={`text-white/60 transition-colors ${isMobile ? 'hover-disabled' : 'group-hover:text-white'}`}
                              whileHover={isMobile ? {} : { rotate: 45 }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17L17 7M17 7H7M17 7V17"/>
                              </svg>
                            </motion.div>
                          </div>
                          
                          <h3 className={`text-white font-semibold text-sm mb-2 transition-colors leading-tight ${isMobile ? 'hover-disabled' : 'group-hover:text-pink-300'}`}>
                            {item.class.split('-').map(part => part.trim()).join(' • ')}
                          </h3>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'teacher-auth' && (
            <motion.div
              key="teacher-auth"
              className="min-h-screen flex items-center justify-center px-4 pb-24"
              initial={{ opacity: 0, y: isMobile ? 10 : 0, scale: isMobile ? 1 : 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: isMobile ? -10 : 0, scale: isMobile ? 1 : 0.9 }}
              transition={{ duration: isMobile ? 0.3 : 0.6 }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <motion.button
                  onClick={handleBackToHome}
                  className={`text-white/70 flex items-center gap-2 transition-colors mb-6 ${isMobile ? 'hover-disabled' : 'hover:text-white'}`}
                  style={{ pointerEvents: 'auto' }}
                  whileHover={isMobile ? {} : { x: -5 }}
                >
                  ← Back to Home
                </motion.button>

                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">Teacher Access</h1>
                  <p className="text-gray-300">Enter password to access teacher links</p>
                </div>

                <form onSubmit={handleTeacherSubmit} className="space-y-6">
                  <div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter password"
                        className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        style={{ pointerEvents: 'auto' }}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                        style={{ pointerEvents: 'auto' }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
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
                    className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-200 ${isMobile ? 'hover-disabled' : 'hover:from-blue-600 hover:to-indigo-700'}`}
                    style={{ pointerEvents: 'auto' }}
                    whileHover={isMobile ? {} : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Access Teacher Links
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}

          {currentView === 'teachers' && (
            <motion.div
              key="teachers"
              className="min-h-screen py-12 px-4 pb-24"
              initial={{ opacity: 0, y: isMobile ? 10 : 0, scale: isMobile ? 1 : 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: isMobile ? -10 : 0, scale: isMobile ? 1 : 0.9 }}
              transition={{ duration: isMobile ? 0.3 : 0.6 }}
            >
              <div className="max-w-6xl mx-auto">
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0.05 : 0.1, duration: isMobile ? 0.3 : 0.6 }}
                >
                  <div className="flex justify-between items-center mb-8">
                    <motion.button
                      onClick={handleBackToHome}
                      className={`text-white/70 flex items-center gap-2 transition-colors ${isMobile ? 'hover-disabled' : 'hover:text-white'}`}
                      style={{ pointerEvents: 'auto' }}
                      whileHover={isMobile ? {} : { x: -5 }}
                    >
                      ← Back to Home
                    </motion.button>
                    
                    <motion.button
                      onClick={handleLogout}
                      className={`text-white/70 text-sm transition-colors ${isMobile ? 'hover-disabled' : 'hover:text-white'}`}
                      style={{ pointerEvents: 'auto' }}
                      whileHover={isMobile ? {} : { scale: 1.05 }}
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

                {Object.entries(teacherGroupedByDay).map(([day, classes]) => (
                  <motion.div
                    key={day}
                    className="mb-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 + parseInt(day) * 0.1 }}
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
                          className={`block bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-colors duration-200 group w-48 flex-shrink-0 ${isMobile ? 'hover-disabled' : 'hover:bg-white/20'}`}
                          style={{ pointerEvents: 'auto' }}
                          whileHover={isMobile ? {} : { scale: 1.02, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + (parseInt(day) - 1) * 0.1 + index * 0.05, duration: 0.6 }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {day}
                            </div>
                            <motion.div
                              className={`text-white/60 transition-colors ${isMobile ? 'hover-disabled' : 'group-hover:text-white'}`}
                              whileHover={isMobile ? {} : { rotate: 45 }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17L17 7M17 7H7M17 7V17"/>
                              </svg>
                            </motion.div>
                          </div>
                          
                          <h3 className={`text-white font-semibold text-sm mb-2 transition-colors leading-tight ${isMobile ? 'hover-disabled' : 'group-hover:text-blue-300'}`}>
                            {item.class.split('-').map(part => part.trim()).join(' • ')}
                          </h3>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}