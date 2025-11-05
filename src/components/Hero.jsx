import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react'

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Hion-creator', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/andres-salazar-1588b71aa/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:andres.gaviria.salazar@gmail.com', label: 'Email' },
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-primary-400 text-sm sm:text-xl font-mono mb-2 sm:mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hola, soy
            </motion.h2>

            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-gradient glow">Andres Salazar</span>
            </motion.h1>

            <div className="hidden sm:flex text-lg sm:text-2xl lg:text-4xl font-semibold text-gray-300 mb-6 sm:mb-8 min-h-[60px] sm:min-h-[80px] items-center justify-center">
              <TypeAnimation
                sequence={[
                  'Desarrollador Frontend',
                  2000,
                  'Especialista en IA',
                  2000,
                  'Creador de Soluciones Web',
                  2000,
                  'Innovador con LLMs',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            <motion.p
              className="text-gray-400 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto mb-6 sm:mb-12 leading-relaxed px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="hidden sm:inline">
                Estudiante de Ingeniería en Sistemas apasionado por crear soluciones web innovadoras y escalables. 
                Líder del proyecto <span className="text-primary-400 font-semibold">Lia</span>, chatbot inteligente 
                para onboarding empresarial con IA generativa y LLMs.
              </span>
              <span className="sm:hidden">
                Desarrollador Web & IA. Creador de <span className="text-primary-400 font-semibold">Lia</span>, chatbot inteligente con LLMs.
              </span>
            </motion.p>

            <motion.div
              className="flex justify-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.a
                href="#projects"
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg font-semibold text-white text-base shadow-lg shadow-primary-500/50 hover:shadow-primary-500/80 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explorar Proyectos
              </motion.a>
              <motion.a
                href="#contact"
                className="hidden sm:flex px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-primary-500 rounded-lg font-semibold text-primary-400 text-sm sm:text-base hover:bg-primary-500/10 transition-all items-center gap-2 ml-4"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} className="sm:w-5 sm:h-5" />
                Descargar CV
              </motion.a>
            </motion.div>

            <motion.div
              className="flex gap-4 sm:gap-6 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  whileHover={{ y: -4, scale: 1.2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <social.icon size={24} className="sm:w-7 sm:h-7" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="text-primary-400" size={32} />
      </motion.div>
    </section>
  )
}

export default Hero
