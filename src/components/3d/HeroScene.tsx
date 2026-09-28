"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Very slow cinematic camera movement effect on the terrain
      meshRef.current.position.z = (state.clock.elapsedTime * 0.1) % 2;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -20]}>
      <planeGeometry args={[100, 100, 64, 64]} />
      <meshStandardMaterial 
        color="#08131C" 
        wireframe={true}
        wireframeLinewidth={1}
        emissive="#0B1B29"
        emissiveIntensity={0.2}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#D6A45B" 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} color="#0B1B29" />
      <directionalLight 
        position={[10, 10, -10]} 
        intensity={1} 
        color="#D6A45B"
      />
      <spotLight 
        position={[-10, 5, 10]} 
        intensity={0.5} 
        color="#E9C58A" 
        angle={0.3} 
        penumbra={1} 
      />
      
      {/* Environment */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={["#050A0F", 5, 40]} />
      
      <Terrain />
      <FloatingParticles />
    </Canvas>
  );
}
