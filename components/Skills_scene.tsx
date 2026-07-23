"use client";
import { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useSpring, animated } from "react-spring"

const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches

const customIcons: Record<string, string> = {
  "java": "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/java/java-original.svg",
  "amazonwebservices": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "matplotlib": "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/matplotlib/matplotlib-original.svg",
  "vscode": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  "microsoftazure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
}

const spacing = 2
const cols = 8
const rows = 4

const displayNames: Record<string, string> = {
  "react": "React", "typescript": "TypeScript", "python": "Python", "go": "Go",
  "postgresql": "PostgreSQL", "docker": "Docker", "redis": "Redis", "anaconda": "Anaconda", 
  "cplusplus": "C++", "cmake": "CMake", "css": "CSS", "html5": "HTML", "dart": "Dart",
  "flutter": "Flutter", "kubernetes": "Kubernetes", "deepgram": "Deepgram", 
  "javascript": "JavaScript", "figma": "Figma", "git": "Git", "github": "GitHub", 
  "rstudioide": "R Studio", "jira": "Jira", "latex": "LaTeX", "pycharm": "PyCharm", 
  "intellijidea": "IntelliJ IDEA", "mapbox": "Mapbox", "pytorch": "PyTorch",
  "bootstrap": "Bootstrap", "numpy": "NumPy", "pandas": "Pandas", "tailwindcss": "Tailwind CSS", 
  "scikitlearn": "scikit-learn", "opengl": "OpenGL", "tldraw": "tldraw", "render": "Render",
  "nextdotjs": "Next.js", "selenium": "Selenium", "jupyter": "Jupyter", "r": "R", "java": "Java", 
  "amazonwebservices": "AWS", "matplotlib": "Matplotlib", "vscode": "VS Code",
  "shadcnui": "shadcn/ui", "threedotjs": "Three.js", "microsoftazure": "Microsoft Azure",
  "nodedotjs": "Node.js",
}

const icons = [
  "react", "typescript", "python", "go", "postgresql", "docker", 
  "redis", "anaconda", "cplusplus", "cmake", "css", "html5", "dart", "flutter", 
  "kubernetes", "deepgram", "javascript", "figma", "git", 
  "github", "rstudioide", "jira", "latex", "pycharm", "intellijidea", "mapbox",  
  "pytorch", "bootstrap", "numpy", "pandas", 
  "tailwindcss", "scikitlearn", "opengl", "tldraw", "render", 
  "nextdotjs", "selenium", "jupyter", "r",
  "java", "amazonwebservices", "matplotlib", "vscode",
  "shadcnui", "threedotjs", "microsoftazure", 
  "nodedotjs"
]
// couldnt find: "open ai api", "glsl", "uber h3", "seaborn", "grpc", "javafx", "xgboost" 

const shuffledIcons = seededShuffle(icons, 67)


// module-level cache
const textureCache = new Map<string, THREE.Texture>()
const texturePromises = new Map<string, Promise<THREE.Texture>>()


function loadSvgTexture(name: string): Promise<THREE.Texture> {
  // if already loaded
  if (textureCache.has(name)) {
    return Promise.resolve(textureCache.get(name)!)
  }

  // if already loading
  if (texturePromises.has(name)) {
    return texturePromises.get(name)!
  }

  const promise = new Promise<THREE.Texture>((resolve, reject) => {
    console.log("Loading texture for:", name)
    const src = customIcons[name] ?? `https://cdn.simpleicons.org/${name}`
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src

    img.onerror = () => {
      texturePromises.delete(name)
      reject(new Error(`Failed to load icon: ${name}`))
    }

    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0, 256, 256)

      const texture = new THREE.CanvasTexture(canvas)
      textureCache.set(name, texture)
      texturePromises.delete(name)
      resolve(texture)
    }
  })

  texturePromises.set(name, promise)
  return promise
}


function useSvgTexture(name: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(
    () => textureCache.get(name) ?? null // synchronously use cached texture if already available
  )

  useEffect(() => {
    let cancelled = false

    // Already cached — nothing to do
    if (textureCache.has(name)) {
      setTexture(textureCache.get(name)!)
      return
    }

    loadSvgTexture(name).then((tex) => {
      if (!cancelled) setTexture(tex)
    }).catch(() => {
      // silently ignore
    })

    return () => { cancelled = true }
  }, [name])

  return texture
}


function seededShuffle(arr: string[], seed: number) {
  const result = [...arr]
  let s = seed
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}


const AnimatedMesh = animated("mesh")

const Icon = forwardRef<THREE.Mesh, { 
  position: [number, number, number], 
  name: string,
  onHover: (isHovered: boolean) => void,
  planeGeoScale: number 
}>(
  ({ position, name, onHover, planeGeoScale }, ref) => {
    const texture = useSvgTexture(name)
    const [hovered, setHovered] = useState(false)

    const { scale } = useSpring({
      scale: hovered ? 1.4 : 1,
      config: { mass: 1, tension: 300, friction: 10 }
    })

    return (
      <animated.mesh
        ref={ref}
        position={position}
        scale={scale}
        onPointerOver={() => { setHovered(true); onHover(true) }}
        onPointerOut={() => { setHovered(false); onHover(false) }}
        onClick={() => { if (isTouchDevice) { setHovered(h => !h); onHover(!hovered) } }}
      >

        <planeGeometry args={[1.5 * planeGeoScale, 1.5 * planeGeoScale]} />
        <meshBasicMaterial map={texture ?? undefined} transparent visible={!!texture} />
        {hovered && (
          <Html center position={[0, -1, 0]}>
            <div className="text-white text-xs font-[Lora] whitespace-nowrap 
              bg-accent/80 px-2 py-1 -mt-10 md:-mt-2 lg:mt-0 rounded-lg tracking-wider"
            >
              {displayNames[name] ?? name}
            </div>
          </Html>
        )}
      </animated.mesh>
    )
  }
)

function IconGrid() {
  const { size, camera } = useThree()

  const isSmallScreen = size.width < 768;
  const planeGeoScale = isSmallScreen ? 0.7 : 1;
  const responsiveSpacing = isSmallScreen ? spacing * planeGeoScale : spacing;

  const positions = useMemo(() => {
    const pos: [number, number, number][] = []
    for (let x = -cols; x < cols; x++) {
      for (let y = -rows; y < rows; y++) {
        pos.push([x * responsiveSpacing, y * responsiveSpacing, 0])
      }
    }
    return pos
  }, [responsiveSpacing])

  const meshRefs = useRef<(THREE.Mesh | null)[]>(new Array(positions.length).fill(null))

  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set())

  useFrame(() => {
    const gw = cols * 2 * responsiveSpacing
    const gh = rows * 2 * responsiveSpacing

    const stillVisible = new Set<number>()

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return

      const originalX = positions[i][0]
      const originalY = positions[i][1]

      let x = originalX - camera.position.x
      x = ((x + gw / 2) % gw + gw) % gw - gw / 2
      let y = originalY - camera.position.y
      y = ((y + gh / 2) % gh + gh) % gh - gh / 2

      const dist = Math.sqrt(x * x + y * y)
      const cullRadius = 10 * responsiveSpacing / spacing // tune

      if (dist < cullRadius) {
        stillVisible.add(i)
      }

      if (!mesh) return // skip position update for unmounted meshes

      const wrappedX = x + camera.position.x
      const wrappedY = y + camera.position.y

      // fisheye based on screen position only
      const fisheyeRadius = 6 * responsiveSpacing / spacing
      const force = Math.max(0, (1 - dist / fisheyeRadius) * 0.5)

      const targetX = wrappedX + x * force
      const targetY = wrappedY + y * force

      const threshold = responsiveSpacing * 2
      mesh.position.x = Math.abs(targetX - mesh.position.x) > threshold ? targetX : THREE.MathUtils.lerp(mesh.position.x, targetX, 0.08)
      mesh.position.y = Math.abs(targetY - mesh.position.y) > threshold ? targetY : THREE.MathUtils.lerp(mesh.position.y, targetY, 0.08)

      // only update state when the set actually changes
      setVisibleSet((prev) => {
        if (prev.size === stillVisible.size && [...prev].every(i => stillVisible.has(i))) {
          return prev
        }
        return stillVisible
      })
    })
  })

  return (
    <>
      {positions.map((pos, i) => (
        <Icon 
          key={i}
          ref={(el) => { if (el) meshRefs.current[i] = el }}
          position={pos}
          name={shuffledIcons[i % shuffledIcons.length]}
          onHover={() => {}}
          planeGeoScale={planeGeoScale}
        />
      ))}
    </>
  )
}


export default function Skills_scene() {
  const [active, setActive] = useState(false) // for touch devices
  const [showHint, setShowHint] = useState(true) // for non-touch devices

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 2500)
    return () => clearTimeout(t)
  }, [])
    

  if (isTouchDevice) {
    if (!active) {
      return (
        <div 
          className="relative w-full h-[70vh] rounded-lg cursor-pointer overflow-hidden"
          onClick={() => setActive(true)}
        >
          <Canvas camera={{ position: [0, 0, 10], fov: 40 }} style={{ width: "100%", height: "100%" }}>
            <IconGrid/>
          </Canvas>
          <div className="absolute inset-0 flex items-center justify-center bg-accent-light/20 pointer-events-none">
            <p className="text-lg lg:text-xl font-[Lora] bg-accent-light/70 px-4 py-2 rounded-xl">Tap to explore. Drag to move.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="relative w-screen h-[80vh]">
        <button
          onClick={() => setActive(false)}
          className="absolute top-3 right-3 z-50 bg-subheading/70 text-white rounded-full w-9 h-9 flex items-center justify-center"
        >
          ✕
        </button>
        <Canvas camera={{ position: [0, 0, 10], fov: 40 }} style={{ width: "100%", height: "100%" }} className="cursor-grab active:cursor-grabbing">
          <IconGrid/>
          <OrbitControls 
            enableRotate={false} 
            enableZoom={false} 
            mouseButtons={{ LEFT: 2, RIGHT: 2 }}
            touches={{ ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN }}
          />
        </Canvas>
      </div>
    )
  }



  return (
    <div className="relative rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }} style={{ width: "100vw", height: "100vh" }} className="cursor-grab active:cursor-grabbing">
        <IconGrid/>
        <OrbitControls 
          enableRotate={false} 
          enableZoom={false} 
          mouseButtons={{ LEFT: 2, RIGHT: 2 }}
        />
      </Canvas>

      <div 
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700 ${showHint ? "opacity-100" : "opacity-0"}`}
      >
        <p className="text-base lg:text-lg font-[Lora] bg-accent-light/70 px-3 py-1.5 rounded-lg whitespace-nowrap">
          Drag to move. Hover for names.
        </p>
      </div>
    </div>
  )
}
