# 🚀 Portafolio Personal - AI & Frontend Developer

Portafolio **IMPACTANTE E INNOVADOR** desarrollado con React, Vite, Tailwind CSS y **Three.js**, enfocado en destacar proyectos de **Inteligencia Artificial Local** y **Desarrollo Frontend**.

## ✨ Características Innovadoras

### 🎆 Hero 3D Interactivo Estilo Spline
- � **Escena 3D inmersiva** con React Three Fiber
- 🧠 **Red neuronal animada** que representa sistemas de IA
- ✨ **Partículas interactivas** que responden al movimiento del mouse
- 🎨 **Esferas flotantes** con tecnologías (React, Angular, Python, Node.js, Ollama)
- ⌨️ **Efecto de escritura automática** para el título
- 🎭 **Gradientes dinámicos** y efectos de profundidad

### 🚀 Más Características
- 🌊 **Animaciones Fluidas**: Implementadas con Framer Motion
- � **Filtros Interactivos**: En proyectos por categoría (IA, Frontend)
- 📱 **100% Responsive**: Adaptable a todos los dispositivos
- ⚡ **Ultra Performance**: Optimizado con Vite
- � **Diseño Moderno**: Glassmorphism, gradientes y efectos visuales avanzados

## 🛠️ Tecnologías

### Core
- **React 18** - Biblioteca de UI
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework de CSS utility-first

### Animaciones & 3D
- **Three.js** - Gráficos 3D en WebGL
- **React Three Fiber** - Three.js en React
- **@react-three/drei** - Helpers para R3F
- **Framer Motion** - Animaciones avanzadas
- **React Intersection Observer** - Detección de scroll

### UI/UX
- **React Icons** - Iconos de tecnologías
- **Lucide React** - Iconos modernos
- **React Type Animation** - Efecto de escritura

## 🚀 Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```

4. **Previsualizar build de producción:**
   ```bash
   npm run preview
   ```

## 📝 Personalización

### 1. Información Personal

Edita `src/components/Hero.jsx` para actualizar:
- Tu nombre
- Títulos profesionales
- Links a redes sociales (GitHub, LinkedIn, Email)

### 2. Sobre Mí

Modifica `src/components/About.jsx` para:
- Agregar tu descripción personal
- Actualizar tus áreas de especialización
- Personalizar los highlights

### 3. Proyectos

En `src/components/Projects.jsx`:
- Agrega tus proyectos en el array `projects`
- Cada proyecto puede incluir:
  - Título y descripción
  - Tags de tecnologías
  - Links a GitHub y demo en vivo
  - Imagen (puedes usar URLs de Unsplash o tus propias imágenes)
  - Categoría (ia/frontend)

### 4. Experiencia

Actualiza `src/components/Experience.jsx` con:
- Tu experiencia laboral
- Educación
- Certificaciones
- Logros específicos

### 5. Contacto

Modifica `src/components/Contact.jsx` para:
- Agregar tu email
- Actualizar tu ubicación
- Configurar el envío de formulario (puedes usar EmailJS, FormSubmit, etc.)

### 6. Colores

Personaliza la paleta de colores en `tailwind.config.js`:
```javascript
colors: {
  primary: { ... }, // Colores principales
  dark: { ... }     // Tonos oscuros
}
```

### 7. Imágenes

Coloca tus imágenes en la carpeta `public/` y reemplaza las URLs de Unsplash en:
- `Projects.jsx` - Imágenes de proyectos
- Opcionalmente, agrega tu foto de perfil

## 📂 Estructura del Proyecto

```
portafolio/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Barra de navegación
│   │   ├── Hero.jsx            # Sección principal
│   │   ├── About.jsx           # Sobre mí
│   │   ├── TechStack.jsx       # Tecnologías
│   │   ├── Projects.jsx        # Proyectos destacados
│   │   ├── Experience.jsx      # Experiencia y educación
│   │   ├── Contact.jsx         # Formulario de contacto
│   │   └── ParticlesBackground.jsx  # Fondo animado
│   ├── App.jsx                 # Componente principal
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Secciones del Portafolio

1. **Hero** - Presentación impactante con animación de texto
2. **About** - Descripción profesional y áreas de expertise
3. **Tech Stack** - Tecnologías con iconos animados flotantes
4. **Projects** - Galería de proyectos con filtros por categoría
5. **Experience** - Timeline de experiencia laboral y educación
6. **Contact** - Formulario de contacto y redes sociales

## 🌟 Mejoras Futuras

- [ ] Integrar sistema de blog con MDX
- [ ] Agregar modo claro/oscuro
- [ ] Implementar internacionalización (ES/EN)
- [ ] Agregar animaciones 3D con Three.js
- [ ] Conectar formulario con backend real
- [ ] Agregar Analytics (Google Analytics/Plausible)
- [ ] Implementar sistema de comentarios en proyectos

## 📱 Responsive Design

El portafolio está completamente optimizado para:
- 📱 Móviles (320px+)
- 💻 Tablets (768px+)
- 🖥️ Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Luego arrastra la carpeta 'dist' a Netlify
```

### GitHub Pages
```bash
# Configura el base en vite.config.js
base: '/nombre-repo/'
npm run build
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - siéntete libre de usarlo para tu portafolio personal.

## 🤝 Contribuciones

Las sugerencias y mejoras son bienvenidas. No dudes en hacer un fork y crear un pull request.

## 📧 Contacto

- Email: tuemail@ejemplo.com
- GitHub: [@tuusuario](https://github.com/tuusuario)
- LinkedIn: [Tu Nombre](https://linkedin.com/in/tuusuario)

---

⭐ Si te gustó este proyecto, no olvides darle una estrella en GitHub!

**Desarrollado con ❤️ y ☕ usando React + Tailwind CSS**
