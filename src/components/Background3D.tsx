"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function VulnerabilityNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate a network of nodes
  const nodeCount = 300;
  const { positions, colors, lines } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);
    const lineIndices = [];

    // Base color (electric blue)
    const baseColor = new THREE.Color("#007AFF");

    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10 - 2; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5; // Z

      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;
    }

    // Connect some nearby nodes to form a network
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < 4) { // Connection threshold
          lineIndices.push(i, j);
        }
      }
    }

    return { 
      positions: pos, 
      colors: col, 
      lines: new Uint16Array(lineIndices) 
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Move scanner
    if (scannerRef.current) {
      const scanX = Math.sin(t * 0.5) * 15;
      scannerRef.current.position.x = scanX;

      // Update node colors based on scanner proximity (Simulating Vulnerability Detection)
      if (pointsRef.current) {
        const geometry = pointsRef.current.geometry;
        const colorAttr = geometry.attributes.color;
        const posAttr = geometry.attributes.position;
        
        for (let i = 0; i < nodeCount; i++) {
          const nodeX = posAttr.getX(i);
          const nodeZ = posAttr.getZ(i);
          
          // If scanner passes over the node
          if (Math.abs(nodeX - scanX) < 1.0) {
            // 5% chance to flag as a "Vulnerability" (RED alert)
            if (Math.random() > 0.95) {
              colorAttr.setXYZ(i, 1, 0, 0); // Red
            } else {
              colorAttr.setXYZ(i, 0, 1, 1); // Cyan (Scanning)
            }
          } else {
            // Fade back to normal blue slowly
            const r = colorAttr.getX(i);
            const g = colorAttr.getY(i);
            const b = colorAttr.getZ(i);
            
            colorAttr.setXYZ(
              i,
              THREE.MathUtils.lerp(r, 0, 0.05),
              THREE.MathUtils.lerp(g, 0.48, 0.05), // 0x7A in hex roughly
              THREE.MathUtils.lerp(b, 1, 0.05)
            );
          }
        }
        colorAttr.needsUpdate = true;
      }
    }
    
    // Slowly rotate the entire network
    if (pointsRef.current && linesRef.current) {
      pointsRef.current.rotation.y = t * 0.02;
      linesRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <group>
      {/* Network Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute attach="attributes-position" count={nodeCount} array={positions} itemSize={3} />
          {/* @ts-ignore */}
          <bufferAttribute attach="attributes-color" count={nodeCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} />
      </points>

      {/* Connecting Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute attach="attributes-position" count={nodeCount} array={positions} itemSize={3} />
          {/* @ts-ignore */}
          <bufferAttribute attach="index" array={lines} itemSize={1} />
        </bufferGeometry>
        <lineBasicMaterial color="#007AFF" transparent opacity={0.15} />
      </lineSegments>

      {/* Laser Scanner */}
      <mesh ref={scannerRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 20, 20]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#020202]">
      <Canvas camera={{ position: [0, 2, 15], fov: 60 }}>
        <fog attach="fog" args={["#020202", 5, 25]} />
        <VulnerabilityNetwork />
      </Canvas>
    </div>
  );
}
