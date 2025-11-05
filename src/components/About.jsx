import { motion } from 'framer-motion'
import { Code, Brain, Lightbulb, Rocket } from 'lucide-react'

const About = () => {
  const highlights = [
    {
      icon: Brain,
      title: 'Inteligencia Artificial',
      description: 'Especializado en LLMs y IA generativa. Líder del proyecto Lia, chatbot para onboarding empresarial.'
    },
    {
      icon: Code,
      title: 'Desarrollo Web',
      description: 'Experto en React y Angular. Soluciones escalables con HTML, CSS y JavaScript moderno.'
    },
    {
      icon: Rocket,
      title: 'Innovación',
      description: 'Transformo ideas en productos funcionales que resuelven problemas reales y generan impacto.'
    },
    {
      icon: Lightbulb,
      title: 'Aprendizaje Continuo',
      description: 'Comprometido con la innovación tecnológica, explorando ML y automatización inteligente.'
    }
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-dark-950 to-dark-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Sobre <span className="text-gradient">Mí</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-10 lg:p-12 mb-12 border border-dark-700"
          >
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              Estudiante de <span className="text-primary-400 font-semibold">Ingeniería en Sistemas</span> con 
              profunda pasión por el desarrollo de software, la inteligencia artificial y la creación de 
              <span className="text-primary-400 font-semibold"> soluciones web innovadoras y escalables</span>.
            </p>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              He participado en diversos proyectos de <span className="text-primary-400 font-semibold">desarrollo Front-End</span>, 
              trabajando con React, Angular, HTML, CSS y JavaScript. Me enfoco en mejorar la experiencia de usuario, 
              la seguridad del código y la colaboración en <span className="text-primary-400 font-semibold">equipos ágiles</span>.
            </p>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Actualmente lidero el desarrollo de <span className="text-primary-400 font-semibold">Lia</span>, 
              un chatbot inteligente para procesos de onboarding empresarial basado en LLMs e IA generativa, 
              aportando valor a startups y empresas en expansión.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="card-gradient rounded-xl p-6 border border-primary-500/20 hover:border-primary-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-500/20 rounded-lg">
                    <item.icon className="text-primary-400" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
