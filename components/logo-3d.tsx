"use client"

import React from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { useGLTF, OrbitControls, Bounds, Environment, useEnvironment } from "@react-three/drei"
import { Suspense, useMemo, useState, useEffect, useRef } from "react"
import * as THREE from "three"

// Component to set clear background color - transparent like Formia
function ClearBackground() {
  const { gl, scene } = useThree()
  
  useEffect(() => {
    // Transparent background for better integration
    gl.setClearColor('#ffffff', 0)
    scene.background = null // No background for transparency
  }, [gl, scene])
  
  return null
}

// Component to force immediate canvas resize
function ForceCanvasResize() {
  const { gl, size, setSize } = useThree()
  
  useEffect(() => {
    const canvas = gl.domElement
    if (!canvas) return
    
    // Find the container parent
    let container = canvas.parentElement
    while (container && container !== document.body) {
      const style = window.getComputedStyle(container)
      if (style.position === 'relative' || style.position === 'absolute') {
        const rect = container.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) {
          // Force immediate resize
          gl.setSize(rect.width, rect.height, false)
          setSize(rect.width, rect.height)
          break
        }
      }
      container = container.parentElement
    }
    
    // Also force resize on next frame
    const timeout = requestAnimationFrame(() => {
      if (container) {
        const rect = container.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) {
          gl.setSize(rect.width, rect.height, false)
          setSize(rect.width, rect.height)
        }
      }
    })
    
    return () => {
      cancelAnimationFrame(timeout)
    }
  }, [gl, setSize])
  
  return null
}

function LogoModel({ onLoaded }: { onLoaded?: () => void }) {
  const { scene } = useGLTF("/Logo/plenio-logotype.gltf")
  const groupRef = useRef<THREE.Group>(null)
  const envMap = useEnvironment({ preset: 'studio' })
  
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
          // Styled similar to Formia.so - dark glass material (vetro nero)
          const newMaterials = materials.map(() => {
            const physicalMaterial = new THREE.MeshPhysicalMaterial({
              color: 0x0a0a0a, // Dark/black glass color
              roughness: 0.0, // Perfectly smooth surface (0.0 for mirror-like finish)
              metalness: 0.0, // No metalness for glass
              transmission: 0.85, // High transmission but slightly reduced for darker glass
              thickness: 0.5, // Medium thickness for realistic glass depth
              ior: 1.5, // Index of refraction (standard glass)
              clearcoat: 1.0, // High clearcoat for glass shine
              clearcoatRoughness: 0.0, // Perfectly smooth clearcoat
              iridescence: 0.8, // Moderate iridescence for subtle rainbow effect
              iridescenceIOR: 1.8, // IOR for iridescence (more subtle than before)
              iridescenceThicknessRange: [200, 400], // Wider range for smoother color transitions
              envMap: envMap, // Environment map for reflections (critical for glass!)
              envMapIntensity: 1.5, // Softer intensity for more uniform reflections
              opacity: 1,
              transparent: true, // Enable transparency for transmission
              side: THREE.DoubleSide, // Render both sides for better glass effect
              depthWrite: false, // Important for proper transparency rendering
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
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  
  useEffect(() => {
    if (modelLoaded) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => setIsLoading(false), 100)
      return () => clearTimeout(timer)
    }
  }, [modelLoaded])
  
  // Force canvas to fill container immediately
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const findAndResizeCanvas = () => {
      const canvas = container.querySelector('canvas')
      if (canvas && container) {
        const rect = container.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) {
          canvas.style.width = `${rect.width}px`
          canvas.style.height = `${rect.height}px`
          canvas.width = rect.width
          canvas.height = rect.height
        }
      }
    }
    
    // Resize immediately
    findAndResizeCanvas()
    
    // Also on next frame
    requestAnimationFrame(findAndResizeCanvas)
    
    // Set up ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      findAndResizeCanvas()
    })
    resizeObserver.observe(container)
    
    return () => {
      resizeObserver.disconnect()
    }
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className={`${className} bg-background`} 
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      {isLoading && <ShimmerLoader />}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ 
          antialias: true, 
          alpha: true, // Enable alpha for better transparency handling
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false, // Better performance
          logarithmicDepthBuffer: false,
        }}
        dpr={[1, 2]} // Higher DPR for sharper rendering like Formia
        performance={{ min: 0.5 }}
        shadows={false} // Disable shadows for cleaner look
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
          transition: 'opacity 0.3s ease-in-out',
          touchAction: 'auto', // Better touch handling like Formia
          imageRendering: 'auto', // Crisp rendering
        }}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
      >
        <Suspense fallback={null}>
          <ForceCanvasResize />
          <ClearBackground />
          <Environment preset="studio" resolution={256} />
          <StaticBounds margin={3.0}>
            <LogoModel onLoaded={() => setModelLoaded(true)} />
          </StaticBounds>
          {/* Lighting setup - soft and uniform studio lighting */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={0.6} />
          <directionalLight position={[-10, -10, -5]} intensity={0.4} />
          <directionalLight position={[0, 10, 0]} intensity={0.5} />
          <directionalLight position={[-5, 5, 10]} intensity={0.3} />
          <directionalLight position={[5, -5, -10]} intensity={0.3} />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.0}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            makeDefault
            dampingFactor={0.05} // Smoother damping for more fluid interaction
            enableDamping={true}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload("/Logo/plenio-logotype.gltf")

