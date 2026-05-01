import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const NODE_COUNT = 24
const ROPE_SEGMENTS = 200

interface NodeData {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  phase: number
}

interface RopeData {
  startNode: number
  endNode: number
  phase: number
}

function lerpColor(a: THREE.Color, b: THREE.Color, t: number) {
  return a.clone().lerp(b, t)
}

function createNodes(): NodeData[] {
  const nodes: NodeData[] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    const t = i / NODE_COUNT
    const x = (t - 0.5) * 15
    const yMain = Math.sin(t * Math.PI * 2) * 2.5
    const ySecondary = Math.sin(t * Math.PI * 4) * 1.2
    const y = yMain + ySecondary + (Math.random() - 0.5) * 0.5
    const z = Math.cos(t * Math.PI * 2) * 1.5
    nodes.push({ x, y, z, vx: 0, vy: 0, phase: Math.random() * Math.PI * 2 })
  }
  return nodes
}

function createRopes(): RopeData[] {
  const ropes: RopeData[] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    ropes.push({ startNode: i, endNode: (i + 1) % NODE_COUNT, phase: Math.random() * Math.PI * 2 })
  }
  return ropes
}

function NodesAndRopes() {
  const nodesRef = useRef<NodeData[]>(createNodes())
  const ropesRef = useRef<RopeData[]>(createRopes())
  const mouseTarget = useRef(new THREE.Vector3(0, 0, 0))
  const mouseSmooth = useRef(new THREE.Vector3(0, 0, 0))
  const { camera, size } = useThree()

  const baseColor = useMemo(() => new THREE.Color('#FFC300'), [])
  const signalColor = useMemo(() => new THREE.Color('#CCFF00'), [])

  // Node meshes
  const nodeMeshesRef = useRef<THREE.Mesh[]>([])
  const nodeGeom = useMemo(() => new THREE.BoxGeometry(0.12, 0.12, 0.12), [])
  const nodeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: baseColor,
    emissive: baseColor,
    emissiveIntensity: 2.0,
    roughness: 0.4,
    metalness: 0.8,
  }), [baseColor])

  const ropeGroupRef = useRef<THREE.Group>(new THREE.Group())

  // Handle mouse
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / size.width) * 2 - 1
      const ny = -(e.clientY / size.height) * 2 + 1
      mouseTarget.current.set(nx * 8, ny * 4, 0)
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [size])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const delta = 0.016
    const nodes = nodesRef.current
    const ropes = ropesRef.current

    // Smooth mouse
    mouseSmooth.current.lerp(mouseTarget.current, 0.05)

    // Update nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      const node = nodes[i]
      const hoverDistance = Math.sqrt(
        (node.x - mouseSmooth.current.x) ** 2 +
        (node.y - mouseSmooth.current.y) ** 2
      )
      const smoothstep = Math.max(0, Math.min(1, (hoverDistance - 0) / 1.5))
      const mouseInfluence = 1 - smoothstep

      node.vx += Math.sin(time + node.phase) * 0.1 * delta +
        (mouseSmooth.current.x - node.x) * mouseInfluence * 2 * delta -
        node.vx * 3 * delta
      node.vy += Math.cos(time * 0.8 + node.phase) * 0.1 * delta +
        (mouseSmooth.current.y - node.y) * mouseInfluence * 2 * delta -
        node.vy * 3 * delta

      node.x += node.vx * delta
      node.y += node.vy * delta
    }

    // Update node meshes
    for (let i = 0; i < NODE_COUNT; i++) {
      const mesh = nodeMeshesRef.current[i]
      if (mesh) {
        const node = nodes[i]
        mesh.position.set(node.x, node.y, node.z)
        const pulse = Math.sin(time * 3 + i * 0.5) * 0.5 + 0.5
        const col = lerpColor(baseColor, signalColor, pulse)
        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.emissive.copy(col)
        mat.color.copy(col)
        mat.emissiveIntensity = 2.0 + Math.sin(time * 2 + i * 0.5) * 0.5
        mesh.rotation.x += delta * 0.5
        mesh.rotation.y += delta * 0.3
      }
    }

    // Update ropes - build tube geometry
    const group = ropeGroupRef.current
    group.clear()

    for (let r = 0; r < ropes.length; r++) {
      const rope = ropes[r]
      const startNode = nodes[rope.startNode]
      const endNode = nodes[rope.endNode]
      const midX = (startNode.x + endNode.x) / 2 + Math.sin(time * 0.5 + rope.phase) * 0.3
      const midY = (startNode.y + endNode.y) / 2 + Math.cos(time * 0.3 + rope.phase) * 0.3
      const midZ = (startNode.z + endNode.z) / 2

      const points: THREE.Vector3[] = []
      for (let seg = 0; seg <= ROPE_SEGMENTS; seg++) {
        const t = seg / ROPE_SEGMENTS
        const p = new THREE.Vector3()
        p.x = (1 - t) * (1 - t) * startNode.x + 2 * (1 - t) * t * midX + t * t * endNode.x
        p.y = (1 - t) * (1 - t) * startNode.y + 2 * (1 - t) * t * midY + t * t * endNode.y
        p.z = (1 - t) * (1 - t) * startNode.z + 2 * (1 - t) * t * midZ + t * t * endNode.z
        points.push(p)
      }

      const curve = new THREE.CatmullRomCurve3(points)
      const tubeGeom = new THREE.TubeGeometry(curve, ROPE_SEGMENTS, 0.015, 4, false)
      const pulse = Math.sin(time * 2 + rope.phase) * 0.5 + 0.5
      const intensity = 0.3 + pulse * 0.7
      const ropeCol = lerpColor(baseColor, signalColor, pulse)

      const tubeMat = new THREE.MeshBasicMaterial({
        color: ropeCol,
        transparent: true,
        opacity: intensity * 0.5,
      })
      const tube = new THREE.Mesh(tubeGeom, tubeMat)
      group.add(tube)
    }

    // Camera parallax
    camera.position.x += (mouseSmooth.current.x * 0.3 - camera.position.x) * 0.02
    camera.position.y += (mouseSmooth.current.y * 0.2 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <group ref={ropeGroupRef} />
      {Array.from({ length: NODE_COUNT }).map((_, i) => (
        <mesh
          key={`node-${i}`}
          ref={(el) => { if (el) nodeMeshesRef.current[i] = el }}
          geometry={nodeGeom}
          material={nodeMat.clone()}
        />
      ))}
    </>
  )
}

export default function NeonNetwork() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Tilt-shift mask overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          pointerEvents: 'none',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          style={{ background: '#0B0C10' }}
          gl={{ antialias: true, alpha: false }}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#FFC300" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#CCFF00" />
          <NodesAndRopes />
          <EffectComposer>
            <Bloom
              intensity={0.8}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.5}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  )
}
