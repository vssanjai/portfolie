"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function HeroModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = state.clock.getElapsedTime() * -0.1;
      wireframeRef.current.rotation.y = state.clock.getElapsedTime() * -0.2;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#00FF41" intensity={2} />
      
      {/* Core glowing object */}
      <Icosahedron ref={meshRef} args={[1.5, 2]} scale={1.2}>
        <MeshDistortMaterial
          color="#0a0a0a"
          emissive="#00FF41"
          emissiveIntensity={0.2}
          distort={0.3}
          speed={2}
          roughness={0.2}
        />
      </Icosahedron>

      {/* Wireframe shell */}
      <Icosahedron ref={wireframeRef} args={[1.8, 1]} scale={1.3}>
        <meshBasicMaterial color="#00F0FF" wireframe />
      </Icosahedron>
    </group>
  );
}
