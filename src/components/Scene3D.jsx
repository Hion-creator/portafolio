import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Precargar geometrías compartidas (mejor rendimiento)
const sharedGeometries = {
  sphere: new THREE.SphereGeometry(0.05, 12, 12),
  smallSphere: new THREE.SphereGeometry(0.03, 8, 8),
};

const sharedMaterials = {
  neuron: new THREE.MeshStandardMaterial({
    color: '#00d4ff',
    emissive: '#00d4ff',
    emissiveIntensity: 0.5,
    metalness: 0.8,
    roughness: 0.2,
  }),
  dataFlow: new THREE.MeshBasicMaterial({
    color: '#00f0ff',
    transparent: true,
    opacity: 0.8,
  }),
};

// Cerebro Digital Principal - MEJORADO con morfología fluida
function AIBrain() {
  const brainRef = useRef();
  const innerGlowRef = useRef();
  const particlesRef = useRef();
  
  // Partículas orbitales optimizadas con instancing
  const particles = useMemo(() => {
    const count = 80; // Cantidad optimizada
    const particleData = [];
    
    for (let i = 0; i < count; i++) {
      // Posición esférica aleatoria alrededor del cerebro
      const radius = 3 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particleData.push({
        radius,
        theta,
        phi,
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
      });
    }
    
    return particleData;
  }, []);
  
  useFrame(({ clock }) => {
    if (!brainRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Rotación suave y elegante
    brainRef.current.rotation.y = time * 0.08;
    brainRef.current.rotation.x = Math.sin(time * 0.2) * 0.15;
    brainRef.current.rotation.z = Math.cos(time * 0.25) * 0.08;
    
    // Efecto de "respiración" más orgánico
    const breathe = 1 + Math.sin(time * 0.4) * 0.08 + Math.sin(time * 0.7) * 0.03;
    brainRef.current.scale.setScalar(breathe);
    
    // Glow interior pulsante
    if (innerGlowRef.current) {
      const pulse = 0.3 + Math.sin(time * 0.6) * 0.2;
      innerGlowRef.current.material.emissiveIntensity = pulse;
      innerGlowRef.current.scale.setScalar(0.95 + Math.sin(time * 0.8) * 0.05);
    }
    
    // Animar partículas orbitales con instancing
    if (particlesRef.current) {
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3();
      
      particles.forEach((particle, i) => {
        // Órbita esférica con movimiento fluido
        const angle = time * particle.speed + particle.offset;
        const x = particle.radius * Math.sin(particle.phi + angle * 0.5) * Math.cos(particle.theta + angle);
        const y = particle.radius * Math.sin(particle.phi + angle * 0.5) * Math.sin(particle.theta + angle);
        const z = particle.radius * Math.cos(particle.phi + angle * 0.5);
        
        position.set(x, y, z);
        
        // Escala con pulso suave
        const scale = 0.8 + Math.sin(time * 2 + particle.offset) * 0.2;
        
        matrix.makeScale(scale, scale, scale);
        matrix.setPosition(position);
        
        particlesRef.current.setMatrixAt(i, matrix);
      });
      
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });
  
  return (
    <group ref={brainRef}>
      {/* Core brillante interior */}
      <mesh ref={innerGlowRef} scale={0.85}>
        <icosahedronGeometry args={[2, 3]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
      
      {/* Cerebro principal con distorsión mejorada */}
      <mesh>
        <icosahedronGeometry args={[2, 4]} />
        <MeshDistortMaterial
          color="#00d4ff"
          distort={0.4}
          speed={1.2}
          roughness={0.05}
          metalness={0.9}
          emissive="#0099cc"
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
      
      {/* Contorno exterior sutil */}
      <mesh scale={1.05}>
        <icosahedronGeometry args={[2, 2]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.05}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Partículas orbitales optimizadas con InstancedMesh */}
      <instancedMesh ref={particlesRef} args={[null, null, particles.length]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
}

// ============================================================================
// Componente principal - OPTIMIZADO CON CALIDAD PROFESIONAL
export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ 
          antialias: true, // ACTIVADO para calidad profesional
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        className="bg-transparent"
        dpr={[1, 2]} // Calidad adaptativa según dispositivo
        performance={{ min: 0.8 }} // Mantener calidad alta
      >
        {/* Iluminación balanceada - sin saturar */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />
        <pointLight position={[0, 0, 10]} intensity={0.6} color="#00f0ff" />
        
        {/* Cerebro digital central - Centro visual */}
        <AIBrain />
        
        {/* Controles cinematográficos */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
          enableDamping
          dampingFactor={0.05}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
