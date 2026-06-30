'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Knot() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ pointer }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.x += (pointer.y * 0.4 - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.y += (pointer.x * 0.4 - groupRef.current.rotation.y) * 0.04
  })

  return (
    <group ref={groupRef} scale={0.72}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh>
          <torusKnotGeometry args={[1.1, 0.35, 160, 24]} />
          <meshNormalMaterial />
        </mesh>
      </Float>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <Knot />
    </Canvas>
  )
}
