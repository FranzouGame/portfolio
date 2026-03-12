<script setup lang="ts">
import * as THREE from 'three'

const containerRef = ref<HTMLElement | null>(null)

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let world: THREE.Group | null = null
let orbGeometry: THREE.IcosahedronGeometry | null = null
let orbMesh: THREE.Mesh | null = null
let outlineMesh: THREE.LineSegments | null = null
let rings: THREE.Mesh[] = []
let particleGeometry: THREE.BufferGeometry | null = null
let particleSystem: THREE.Points | null = null
let animationId = 0
let baseOrbPositions: Float32Array | null = null
let orbNormals: Float32Array | null = null
let baseParticlePositions: Float32Array | null = null
let targetPointer = { x: 0, y: 0 }
let currentPointer = { x: 0, y: 0 }

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const createOrb = () => {
  if (!world) return

  orbGeometry = new THREE.IcosahedronGeometry(3.1, 3)
  baseOrbPositions = new Float32Array(orbGeometry.attributes.position.array as Float32Array)
  orbNormals = new Float32Array(orbGeometry.attributes.normal.array as Float32Array)

  const orbMaterial = new THREE.MeshPhysicalMaterial({
    color: '#dce7f6',
    roughness: 0.08,
    metalness: 0,
    transmission: 0.78,
    thickness: 1.1,
    transparent: true,
    opacity: 0.72,
    ior: 1.16,
    clearcoat: 0.8,
    clearcoatRoughness: 0.14,
  })

  orbMesh = new THREE.Mesh(orbGeometry, orbMaterial)
  world.add(orbMesh)

  const edges = new THREE.EdgesGeometry(orbGeometry, 20)
  outlineMesh = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({
      color: '#9dbde2',
      transparent: true,
      opacity: 0.24,
    }),
  )

  world.add(outlineMesh)
}

const createRings = () => {
  if (!world) return

  const ringConfigs = [
    { radius: 4.8, tube: 0.045, color: '#9dbde2', opacity: 0.22, rotation: [0.7, 0.2, 1.1] },
    { radius: 6.0, tube: 0.035, color: '#dce7f6', opacity: 0.18, rotation: [1.15, 0.9, 0.3] },
  ]

  rings = ringConfigs.map(config => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(config.radius, config.tube, 18, 220),
      new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: config.opacity,
      }),
    )

    ring.rotation.set(config.rotation[0], config.rotation[1], config.rotation[2])
    world?.add(ring)
    return ring
  })
}

const createParticles = () => {
  if (!world) return

  const count = 220
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  baseParticlePositions = new Float32Array(count * 3)

  const palette = [
    new THREE.Color('#9dbde2'),
    new THREE.Color('#dce7f6'),
    new THREE.Color('#8aaed5'),
  ]

  for (let index = 0; index < count; index++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 4.7 + Math.random() * 2.3
    const height = (Math.random() - 0.5) * 5.8
    const offset = index * 3

    positions[offset] = Math.cos(angle) * radius
    positions[offset + 1] = height
    positions[offset + 2] = Math.sin(angle) * radius * 0.82

    baseParticlePositions[offset] = positions[offset]
    baseParticlePositions[offset + 1] = positions[offset + 1]
    baseParticlePositions[offset + 2] = positions[offset + 2]

    const color = palette[Math.floor(Math.random() * palette.length)].clone()
    color.offsetHSL((Math.random() - 0.5) * 0.03, 0.02, 0.05)
    colors[offset] = color.r
    colors[offset + 1] = color.g
    colors[offset + 2] = color.b
  }

  particleGeometry = new THREE.BufferGeometry()
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  particleSystem = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      depthWrite: false,
    }),
  )

  world.add(particleSystem)
}

const initScene = () => {
  if (!containerRef.value) return

  scene = new THREE.Scene()
  world = new THREE.Group()
  scene.add(world)

  camera = new THREE.PerspectiveCamera(
    38,
    containerRef.value.clientWidth / containerRef.value.clientHeight,
    0.1,
    100,
  )
  camera.position.set(0, 0.15, 13.5)

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  containerRef.value.appendChild(renderer.domElement)

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.55)
  const keyLight = new THREE.PointLight(0xe6f0ff, 28, 60)
  keyLight.position.set(8, 8, 14)
  const fillLight = new THREE.PointLight(0xa5c5e9, 18, 60)
  fillLight.position.set(-10, -6, 10)

  scene.add(ambientLight, keyLight, fillLight)

  createOrb()
  createRings()
  createParticles()
}

const animate = () => {
  if (!renderer || !scene || !camera || !world || !orbGeometry) return

  animationId = window.requestAnimationFrame(animate)

  const time = performance.now() * 0.001
  const motionFactor = prefersReducedMotion() ? 0.3 : 1

  currentPointer.x = THREE.MathUtils.lerp(currentPointer.x, targetPointer.x, 0.05)
  currentPointer.y = THREE.MathUtils.lerp(currentPointer.y, targetPointer.y, 0.05)

  world.rotation.y = THREE.MathUtils.lerp(world.rotation.y, currentPointer.x * 0.22, 0.04)
  world.rotation.x = THREE.MathUtils.lerp(world.rotation.x, -currentPointer.y * 0.12, 0.04)
  world.position.y = Math.sin(time * 0.65) * 0.18 * motionFactor

  if (orbMesh && baseOrbPositions && orbNormals) {
    const positions = orbGeometry.attributes.position.array as Float32Array

    for (let offset = 0; offset < positions.length; offset += 3) {
      const baseX = baseOrbPositions[offset]
      const baseY = baseOrbPositions[offset + 1]
      const baseZ = baseOrbPositions[offset + 2]
      const normalX = orbNormals[offset]
      const normalY = orbNormals[offset + 1]
      const normalZ = orbNormals[offset + 2]

      const ripple = Math.sin(time * 0.9 + normalX * 4.1 + normalY * 3.4 + normalZ * 4.8) * 0.18 * motionFactor

      positions[offset] = baseX + normalX * ripple
      positions[offset + 1] = baseY + normalY * ripple
      positions[offset + 2] = baseZ + normalZ * ripple
    }

    orbGeometry.attributes.position.needsUpdate = true
    orbGeometry.computeVertexNormals()

    orbMesh.rotation.y = time * 0.12 * motionFactor
    orbMesh.rotation.x = Math.sin(time * 0.32) * 0.08 * motionFactor
  }

  if (outlineMesh) {
    outlineMesh.rotation.y = -time * 0.08 * motionFactor
    outlineMesh.rotation.x = time * 0.05 * motionFactor
  }

  rings.forEach((ring, index) => {
    const direction = index % 2 === 0 ? 1 : -1
    ring.rotation.x += 0.0006 * direction * motionFactor
    ring.rotation.y += 0.001 * (index + 1) * motionFactor
  })

  if (particleGeometry && baseParticlePositions) {
    const positions = particleGeometry.attributes.position.array as Float32Array

    for (let offset = 0; offset < positions.length; offset += 3) {
      const x = baseParticlePositions[offset]
      const y = baseParticlePositions[offset + 1]
      const z = baseParticlePositions[offset + 2]

      positions[offset] = x + Math.sin(time * 0.8 + y * 0.4) * 0.06 * motionFactor
      positions[offset + 1] = y + Math.cos(time * 0.7 + x * 0.28) * 0.08 * motionFactor
      positions[offset + 2] = z + Math.sin(time * 0.9 + x * 0.22) * 0.05 * motionFactor
    }

    particleGeometry.attributes.position.needsUpdate = true
  }

  camera.position.x = THREE.MathUtils.lerp(camera.position.x, currentPointer.x * 0.55, 0.04)
  camera.position.y = THREE.MathUtils.lerp(camera.position.y, currentPointer.y * -0.35, 0.04)
  camera.lookAt(0, 0, 0)

  renderer.render(scene, camera)
}

const handlePointerMove = (event: PointerEvent) => {
  if (!containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  targetPointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
  targetPointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
}

const resetPointer = () => {
  targetPointer.x = 0
  targetPointer.y = 0
}

const handleResize = () => {
  if (!containerRef.value || !camera || !renderer) return

  camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
}

const disposeScene = () => {
  if (animationId) window.cancelAnimationFrame(animationId)

  scene?.traverse(object => {
    const mesh = object as THREE.Mesh
    if (mesh.geometry) mesh.geometry.dispose()

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(material => material.dispose())
    } else if (mesh.material) {
      mesh.material.dispose()
    }
  })

  renderer?.dispose()
  renderer?.domElement.remove()

  scene = null
  camera = null
  renderer = null
  world = null
  orbGeometry = null
  orbMesh = null
  outlineMesh = null
  particleGeometry = null
  particleSystem = null
  rings = []
  baseOrbPositions = null
  orbNormals = null
  baseParticlePositions = null
}

onMounted(() => {
  initScene()
  animate()

  containerRef.value?.addEventListener('pointermove', handlePointerMove, { passive: true })
  containerRef.value?.addEventListener('pointerleave', resetPointer, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  containerRef.value?.removeEventListener('pointermove', handlePointerMove)
  containerRef.value?.removeEventListener('pointerleave', resetPointer)
  window.removeEventListener('resize', handleResize)
  disposeScene()
})
</script>

<template>
  <div
    ref="containerRef"
    class="absolute inset-0 opacity-95"
    aria-hidden="true"
  />
</template>
