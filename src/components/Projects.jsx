import { motion } from 'framer-motion'
import { useState } from 'react'
import { Github, ExternalLink, Brain, Code, Sparkles } from 'lucide-react'

const Projects = () => {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      title: 'Lia - Chatbot IA para Onboarding',
      category: 'ia',
      description: 'Chatbot inteligente basado en LLMs y IA generativa para automatizar y personalizar la incorporación de nuevos empleados. Solución escalable que aporta valor a startups y empresas en expansión.',
      tags: ['Python', 'Ollama', 'LangChain', 'React', 'FastAPI', 'RAG', 'LLMs'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      github: 'https://github.com/Hion-creator/chatbot2.0',
      demo: 'https://hion-creator.github.io/presentacion-chatbot/',
      featured: true
    },
    {
      title: 'Sunthers - Sitio Web de Gremio Gaming',
      category: 'frontend',
      description: 'Página web profesional para gremio de videojuegos con diseño inmersivo y responsive. Incluye información del gremio, miembros, eventos y sistema de reclutamiento.',
      tags: ['React', 'JavaScript', 'CSS3', 'Responsive Design', 'Gaming'],
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
      github: 'https://github.com/Hion-creator/webwarbone0.1',
      demo: 'https://sunthers.games/'
    },
    {
      title: 'WebWarbone 0.1',
      category: 'frontend',
      description: 'Página web moderna desarrollada con React, diseño responsive y optimizada para rendimiento. Implementa las mejores prácticas de desarrollo frontend con componentes reutilizables.',
      tags: ['React', 'JavaScript', 'CSS3', 'Responsive Design'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      github: 'https://github.com/Hion-creator/webwarbone0.1',
      demo: '#'
    },
    {
      title: 'API REST con ML',
      category: 'ia',
      description: 'API escalable con modelos de clasificación de texto usando spaCy y FastAPI. Implementa caché con Redis para optimizar rendimiento.',
      tags: ['Python', 'FastAPI', 'spaCy', 'Docker', 'Redis'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      github: '#',
      demo: '#'
    },
    {
      title: 'App de Gestión de Proyectos',
      category: 'frontend',
      description: 'Sistema completo de gestión con metodologías ágiles, tableros Kanban, sprints y métricas de equipo en tiempo real.',
      tags: ['Angular', 'TypeScript', 'Firebase', 'Material UI'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      github: '#',
      demo: '#'
    }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)

  const categories = [
    { id: 'all', name: 'Todos', icon: Sparkles },
    { id: 'ia', name: 'IA & ML', icon: Brain },
    { id: 'frontend', name: 'Frontend', icon: Code }
  ]

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-dark-900 to-dark-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Mis <span className="text-gradient">Proyectos</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            <span className="hidden sm:inline">Soluciones innovadoras que combinan IA generativa y desarrollo web moderno</span>
            <span className="sm:hidden">IA y desarrollo web que generan impacto real</span>
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 text-sm sm:text-base ${
                  filter === cat.id
                    ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg shadow-primary-500/50'
                    : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <cat.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden xs:inline">{cat.name}</span>
                <span className="xs:hidden">{cat.name.split(' ')[0]}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group relative overflow-hidden rounded-2xl bg-dark-800 border border-dark-700 hover:border-primary-500/50 transition-all ${
                  project.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-80"></div>
                  
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full text-xs font-semibold">
                      Destacado
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gradient transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-300 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      <Github size={20} />
                      <span>Código</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      <ExternalLink size={20} />
                      <span>Demo</span>
                    </motion.a>
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

export default Projects
