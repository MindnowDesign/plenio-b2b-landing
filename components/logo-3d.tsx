"use client"

import React from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { useGLTF, OrbitControls, Bounds, Environment, useEnvironment } from "@react-three/drei"
import { Suspense, useMemo, useState, useEffect, useRef } from "react"
import * as THREE from "three"

// Component to set clear background color
function ClearBackground() {
  const { gl, scene } = useThree()
  
  useEffect(() => {
    // Set clear color to white/light
    gl.setClearColor('#ffffff', 1)
    scene.background = new THREE.Color('#ffffff')
  }, [gl, scene])
  
  return null
}

function LogoModel({ onLoaded }: { onLoaded?: () => void }) {
  const { scene } = useGLTF("/Logo/plenio-logotype.gltf")
  const groupRef = useRef<THREE.Group>(null)
  const envMap = useEnvironment({ preset: 'city' })
  
  // Memoize cloned scene to avoid re-cloning on every render
  const clonedScene = useMemo(() => scene.clone(), [scene])
  
  // Replace materials with realistic/glass-like physical material
  // Following best practices from Codrops article: https://tympanus.net/codrops/2021/10/27/creating-the-effect-of-transparent-glass-and-plastic-in-three-js/
  useEffect(() => {
    let meshCount = 0
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshCount++
        if (child.material) {
          // Handle both single material and material arrays
          const materials = Array.isArray(child.material) 
            ? child.material 
            : [child.material]
          
          // Replace with MeshPhysicalMaterial for realistic glass effect
          const newMaterials = materials.map(() => {
            const physicalMaterial = new THREE.MeshPhysicalMaterial({
              color: 0xffffff, // White/clear for glass
              roughness: 0.05, // Very low roughness (0.05-0.15 range recommended for glass)
              metalness: 0.0, // No metalness for glass
              transmission: 1.0, // Full transmission for clear glass
              thickness: 0.2, // Reduced thickness for more transparency
              ior: 1.5, // Index of refraction (standard glass)
              clearcoat: 1.0, // High clearcoat for glass shine
              clearcoatRoughness: 0.0, // Perfectly smooth clearcoat
              iridescence: 1.0, // High iridescence for rainbow/prismatic effect
              iridescenceIOR: 2.2, // Much higher IOR for very pronounced colorful reflections
              iridescenceThicknessRange: [100, 300], // More concentrated range for stronger color bands
              envMap: envMap, // Environment map for reflections (critical for glass!)
              envMapIntensity: 4.5, // Even higher intensity for very visible colorful reflections
              opacity: 1,
              transparent: true, // Enable transparency for transmission
              side: THREE.FrontSide
            })
            return physicalMaterial
          })
          
          child.material = Array.isArray(child.material) 
            ? newMaterials 
            : newMaterials[0]
        }
      }
    })
    
    // Notify when model is loaded and materials are set
    if (meshCount > 0 && onLoaded) {
      onLoaded()
    }
  }, [clonedScene, onLoaded, envMap])
  
  return (
    <group ref={groupRef} scale={[0.85, 0.85, 0.85]}>
      <primitive 
        object={clonedScene} 
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
      />
    </group>
  )
}


interface Logo3DProps {
  className?: string
}

// Component to handle static camera positioning (no animation)
function StaticBounds({ children, margin = 1.4 }: { children: React.ReactNode, margin?: number }) {
  const { camera, scene } = useThree()
  const hasFitted = useRef(false)
  
  useEffect(() => {
    if (hasFitted.current) return
    
    // Wait a frame for the model to be in the scene
    const timeout = setTimeout(() => {
      const box = new THREE.Box3()
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          box.expandByObject(child)
        }
      })
      
      if (!box.isEmpty()) {
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const distance = maxDim * margin
        
        // Position camera to look at center
        camera.position.set(center.x, center.y, center.z + distance)
        camera.lookAt(center)
        camera.updateProjectionMatrix()
        
        hasFitted.current = true
      }
    }, 100)
    
    return () => clearTimeout(timeout)
  }, [camera, scene, margin])
  
  return <>{children}</>
}

// Shimmer skeleton loader
function ShimmerLoader() {
  return (
    <div 
      className="absolute inset-0 bg-background overflow-hidden"
      style={{ width: '100%', height: '100%' }}
    >
      <div 
        className="absolute inset-0 animate-shimmer"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  )
}

export function Logo3D({ className }: Logo3DProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (modelLoaded) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => setIsLoading(false), 100)
      return () => clearTimeout(timer)
    }
  }, [modelLoaded])
  
  return (
    <div 
      className={`${className} bg-background`} 
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      {isLoading && <ShimmerLoader />}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        style={{ 
          position: 'absolute', 
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%', 
          height: '100%', 
          display: 'block',
          margin: 0,
          padding: 0,
          cursor: isDragging ? 'grabbing' : 'grab',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
      >
        <Suspense fallback={null}>
          <ClearBackground />
          <Environment preset="city" />
          <StaticBounds margin={3.0}>
            <LogoModel onLoaded={() => setModelLoaded(true)} />
          </StaticBounds>
          {/* Lighting setup - enhanced for glass material */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} />
          <directionalLight position={[0, 5, 0]} intensity={0.6} />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            makeDefault
            dampingFactor={0.1}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload("/Logo/plenio-logotype.gltf")

