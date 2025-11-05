import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Brain } from 'lucide-react';

// Lazy load del componente 3D para mejor rendimiento inicial
const Scene3D = lazy(() => import('./Scene3D'));

export default function Hero3D() {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Especialista en Inteligencia Artificial & Desarrollo Full Stack';
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        delayChildren: 0.6,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };
  
  return (
    <motion.div 
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black"
    >
      {/* Escena 3D de fondo con lazy loading */}
      <Suspense fallback={<div className="absolute inset-0" />}>
        <Scene3D />
      </Suspense>
      
      {/* Overlay con gradiente suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70 z-10" />
      
      {/* Contenido */}
      <motion.div
        className="relative z-20 container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge de especialización - Oculto en móvil */}
        <motion.div
          variants={itemVariants}
          className="mb-8 hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm"
        >
          <Brain className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 text-sm font-mono">AI Engineer & Full Stack Developer</span>
        </motion.div>
        
        {/* Nombre principal */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 relative sm:top-3">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-white drop-shadow-[0_0_50px_rgba(0,212,255,0.5)]">
              Andres Salazar
            </span>
          </h1>
        </motion.div>
        
        {/* Título con efecto typing */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-xl md:text-3xl font-light text-gray-300 font-mono min-h-[2.5rem]">
            <span className="text-cyan-400">&gt;</span> {text}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-cyan-400 transition-opacity`}>_</span>
          </h2>
        </motion.div>
        
        {/* Descripción minimalista con foco en IA */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Desarrollo{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
            soluciones de IA con modelos locales
          </span>
          {' '}y modernizo aplicaciones legacy a arquitecturas cloud-native.
        </motion.p>
        
        {/* CTAs profesionales */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-2"
          >
            <span>Explorar Proyectos</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.a>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gray-900/50 backdrop-blur-md border border-cyan-500/30 text-white font-semibold rounded-xl hover:bg-gray-900/80 hover:border-cyan-500/50 transition-all"
          >
            Contacto
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
