"use client";
import { forwardRef, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useSpring, animated } from "react-spring"


const customIcons: Record<string, string> = {
  "java": "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/java/java-original.svg",
  "amazonwebservices": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "matplotlib": "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/matplotlib/matplotlib-original.svg",
  "vscode": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
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
}

const icons = [
  "react", "typescript", "python", "go", "postgresql", "docker", 
  "redis", "anaconda", "cplusplus", "cmake", "css", "html5", "dart", "flutter", 
  "kubernetes", "deepgram", "javascript", "figma", "git", 
  "github", "rstudioide", "jira", "latex", "pycharm", "intellijidea", "mapbox",  
  "pytorch", "bootstrap", "numpy", "pandas", 
  "tailwindcss", "scikitlearn", "opengl", "tldraw", "render", 
  "nextdotjs", "selenium", "jupyter", "r",
  "java", "amazonwebservices", "matplotlib", "vscode"
]
// couldnt find: "open ai api", "glsl", "uber h3", "seaborn", 

const positions: [number, number, number][] = []
for (let x = -cols; x < cols; x++) {
  for (let y = -rows; y < rows; y++) {
    positions.push([x * spacing, y * spacing, 0])
  }
}

const shuffledIcons = seededShuffle(icons, 67)


function useSvgTexture(name: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    const src = customIcons[name] ?? `https://cdn.simpleicons.org/${name}`
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src
    img.onerror = () => {}
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0, 256, 256)
      setTexture(new THREE.CanvasTexture(canvas))
    }
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
  onHover: (isHovered: boolean) => void
}>(
  ({ position, name, onHover }, ref) => {
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
      >
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial map={texture ?? undefined} transparent visible={!!texture} />
        {hovered && (
          <Html center position={[0, -1, 0]}>
            <div style={{
              color: "white",
              fontSize: "12px",
              fontFamily: "var(--font-body)",
              whiteSpace: "nowrap",
              background: "color-mix(in srgb, var(--color-accent) 80%, transparent)",

              padding: "4px 8px",
              borderRadius: "8px",
              letterSpacing: "0.05em",
            }}>
              {displayNames[name] ?? name}
            </div>
          </Html>
        )}
      </animated.mesh>
    )
  }
)

function IconGrid() {
  console.log("IconGrid rendering");

  const meshRefs = useRef<(THREE.Mesh | null)[]>(new Array(positions.length).fill(null))
  const { camera } = useThree()

  useFrame(() => {
    const gw = cols * 2 * spacing
    const gh = rows * 2 * spacing

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return

      const originalX = positions[i][0]
      const originalY = positions[i][1]

      let x = originalX - camera.position.x
      x = ((x + gw / 2) % gw + gw) % gw - gw / 2
      let y = originalY - camera.position.y
      y = ((y + gh / 2) % gh + gh) % gh - gh / 2

      const wrappedX = x + camera.position.x
      const wrappedY = y + camera.position.y

      // fisheye based on screen position only
      const dist = Math.sqrt(x * x + y * y)
      const fisheyeRadius = 6
      const force = Math.max(0, (1 - dist / fisheyeRadius) * 0.5)

      const targetX = wrappedX + x * force
      const targetY = wrappedY + y * force

      const threshold = spacing * 2
      mesh.position.x = Math.abs(targetX - mesh.position.x) > threshold ? targetX : THREE.MathUtils.lerp(mesh.position.x, targetX, 0.08)
      mesh.position.y = Math.abs(targetY - mesh.position.y) > threshold ? targetY : THREE.MathUtils.lerp(mesh.position.y, targetY, 0.08)
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
        />
      ))}
    </>
  )
}

export default function Skills_scene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 40 }} style={{ width: "100vw", height: "100vh" }} className="cursor-grab active:cursor-grabbing">
      <IconGrid/>
      <OrbitControls 
        enableRotate={false} 
        enableZoom={false} 
        mouseButtons={{ LEFT: 2, RIGHT: 2 }} // pan w/ left or right click
      />
    </Canvas>
  )
}

