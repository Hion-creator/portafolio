import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary-400 font-mono text-lg">Cargando portafolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <main>
        <Hero3D />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="bg-dark-900 py-8 text-center border-t border-dark-800">
        <p className="text-gray-400">
          © {new Date().getFullYear()} - Desarrollado con React, Tailwind CSS y mucho ☕
        </p>
      </footer>
    </div>
  )
}

export default App
