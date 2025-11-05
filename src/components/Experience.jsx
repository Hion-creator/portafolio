import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Award } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      type: 'work',
      icon: Briefcase,
      title: 'Ingeniero de Sistemas',
      company: 'EMCALI EICE ESP',
      period: 'Mayo 2025 - Presente',
      description: 'Prácticas profesionales aplicando conocimientos en desarrollo de software y sistemas empresariales en empresa de servicios públicos.',
      achievements: [
        'Desarrollo de soluciones tecnológicas con JavaScript',
        'Mejora de sistemas existentes y procesos digitales',
        'Colaboración en proyectos de transformación digital'
      ]
    },
    {
      type: 'work',
      icon: Briefcase,
      title: 'Desarrollador Web Jr',
      company: 'Rocketfy',
      period: 'Junio 2023 - Mayo 2025 · 2 años',
      description: 'Desarrollo web full-time remoto. Experiencia en UX, seguridad, eficiencia del código y colaboración en equipos ágiles.',
      achievements: [
        'Desarrollo con React, Angular, HTML, CSS y JavaScript',
        'Mejora de experiencia de usuario y rendimiento web',
        'Trabajo colaborativo con metodologías ágiles (Scrum)',
        'Implementación de buenas prácticas y código limpio'
      ]
    },
    {
      type: 'work',
      icon: Briefcase,
      title: 'Desarrollador Web',
      company: 'Rocketfy',
      period: 'Diciembre 2022 - Junio 2023 · 7 meses',
      description: 'Prácticas profesionales iniciando carrera en desarrollo web. Aprendizaje de tecnologías modernas y colaboración en proyectos reales.',
      achievements: [
        'Fundamentos de desarrollo web con JavaScript',
        'Primeros proyectos con React y tecnologías frontend',
        'Trabajo en equipo y metodologías de desarrollo',
        'Construcción de bases sólidas en programación web'
      ]
    },
    {
      type: 'education',
      icon: GraduationCap,
      title: 'Ingeniería en Sistemas',
      company: 'Universidad',
      period: '2020 - 2024',
      description: 'Tesis: Lia, chatbot inteligente para onboarding empresarial con LLMs y IA generativa (Ollama, LangChain).',
      achievements: [
        'Especialización en IA, LLMs y automatización inteligente',
        'Proyecto líder: Lia, solución real para empresas',
        'Stack completo: React, Angular, Python, Node.js'
      ]
    }
  ]

  return (
    <section id="experience" className="py-20 bg-dark-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Experiencia <span className="text-gradient">& Educación</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-500 to-purple-600"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto md:text-left'
                }`}
              >
                <div className="md:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="card-gradient rounded-xl p-6 border border-dark-700 hover:border-primary-500/50 transition-all"
                  >
                    {/* Icon */}
                    <div className={`flex items-center gap-3 mb-4 ${
                      index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      <div className="p-2 bg-primary-500/20 rounded-lg">
                        <exp.icon className="text-primary-400" size={24} />
                      </div>
                      <span className="text-primary-400 font-mono text-sm">{exp.period}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <p className="text-primary-300 font-semibold mb-3">{exp.company}</p>
                    <p className="text-gray-400 mb-4 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <ul className={`space-y-2 ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="text-primary-400 mt-1">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-dark-950 z-10"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
