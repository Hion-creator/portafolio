import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SiReact, SiAngular, SiNodedotjs, SiPython, SiTailwindcss, SiTypescript, SiJavascript, SiGit, SiDocker, SiMongodb } from 'react-icons/si'
import { Brain, Zap, Code2, Database, Cpu } from 'lucide-react'

const TechStack = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const categories = [
    {
      title: 'Frontend',
      icon: Code2,
      color: 'from-cyan-500 to-blue-600',
      techs: [
        { name: 'React', icon: SiReact, color: '#61DAFB', level: 95 },
        { name: 'Angular', icon: SiAngular, color: '#DD0031', level: 90 },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 92 },
        { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', level: 88 }
      ]
    },
    {
      title: 'Backend',
      icon: Database,
      color: 'from-purple-500 to-pink-600',
      techs: [
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 90 },
        { name: 'Python', icon: SiPython, color: '#3776AB', level: 93 },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 85 },
        { name: 'Docker', icon: SiDocker, color: '#2496ED', level: 80 }
      ]
    },
    {
      title: 'IA & ML',
      icon: Brain,
      color: 'from-emerald-500 to-cyan-600',
      techs: [
        { name: 'Ollama', color: '#00d4ff', level: 95, isText: true },
        { name: 'LangChain', color: '#00f0ff', level: 90, isText: true },
        { name: 'TensorFlow', color: '#FF6F00', level: 82, isText: true },
        { name: 'Hugging Face', color: '#FFD21E', level: 78, isText: true }
      ]
    }
  ]

  const skills = [
    { name: 'Scrum', icon: Zap },
    { name: 'Git Flow', icon: SiGit },
    { name: 'CI/CD', icon: Cpu },
    { name: 'Agile', icon: Code2 }
  ]

  return (
    <section ref={ref} id="tech" className="relative py-20 bg-gradient-to-b from-black via-gray-950 to-gray-900 overflow-hidden">
      {/* Fondo de partículas estáticas decorativas */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-6xl font-bold mb-6">
            Arsenal <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Tecnológico</span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Herramientas de vanguardia para construir el futuro de la IA y el desarrollo web
          </p>
        </motion.div>

        {/* Categorías con diseño orbital/neural */}
        <div className="max-w-7xl mx-auto mb-20">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: catIndex % 2 === 0 ? -100 : 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: catIndex * 0.2 }}
              className="mb-16 last:mb-0"
            >
              {/* Header de categoría */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className={`p-4 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}
                >
                  <category.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{category.title}</h3>
                  <div className={`h-1 w-24 mt-2 bg-gradient-to-r ${category.color} rounded-full`} />
                </div>
              </div>

              {/* Grid de tecnologías con barras de nivel */}
              <div className="grid md:grid-cols-2 gap-6">
                {category.techs.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: catIndex * 0.2 + techIndex * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all overflow-hidden"
                  >
                    {/* Glow effect en hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        {tech.isText ? (
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold"
                            style={{ 
                              backgroundColor: `${tech.color}20`,
                              color: tech.color,
                              border: `2px solid ${tech.color}40`
                            }}
                          >
                            {tech.name.slice(0, 2).toUpperCase()}
                          </div>
                        ) : (
                          <motion.div
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <tech.icon 
                              size={48} 
                              style={{ color: tech.color }}
                              className="drop-shadow-lg"
                            />
                          </motion.div>
                        )}
                        <div>
                          <h4 className="text-xl font-bold text-white">{tech.name}</h4>
                          <p className="text-gray-400 text-sm">{tech.level}% dominio</p>
                        </div>
                      </div>
                    </div>

                    {/* Barra de nivel profesional */}
                    <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${tech.level}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: catIndex * 0.2 + techIndex * 0.1 + 0.3, ease: "easeOut" }}
                        className="h-full rounded-full relative"
                        style={{ 
                          background: `linear-gradient(90deg, ${tech.color}80, ${tech.color})`
                        }}
                      >
                        {/* Efecto de brillo en la barra */}
                        <motion.div
                          animate={{ x: [-20, 200] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                          className="absolute inset-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Metodologías con diseño de badges flotantes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md rounded-3xl p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-3">
              <Zap className="text-yellow-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                Metodologías & Herramientas
              </span>
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                  className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full hover:border-cyan-400 transition-all cursor-default"
                >
                  <div className="flex items-center gap-2">
                    <skill.icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
                    <span className="font-mono font-semibold text-gray-300 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack
