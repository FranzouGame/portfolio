<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let particles: THREE.Points
let animationId: number
let mouseX = 0
let mouseY = 0

const initScene = () => {
  if (!containerRef.value) return

  // Scene
  scene = new THREE.Scene()

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    containerRef.value.clientWidth / containerRef.value.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 50

  // Renderer
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: 'high-performance'
  })
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  containerRef.value.appendChild(renderer.domElement)

  // Particles
  const particleCount = 1500
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)

  const color1 = new THREE.Color('#00f5ff') // Cyan
  const color2 = new THREE.Color('#0066ff') // Blue
  const color3 = new THREE.Color('#bf00ff') // Purple

  for (let i = 0; i < particleCount; i++) {
    // Position - sphere distribution
    const radius = 30 + Math.random() * 40
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    // Colors - gradient between cyan, blue, purple
    const colorChoice = Math.random()
    let color: THREE.Color
    if (colorChoice < 0.33) {
      color = color1.clone().lerp(color2, Math.random())
    } else if (colorChoice < 0.66) {
      color = color2.clone().lerp(color3, Math.random())
    } else {
      color = color3.clone().lerp(color1, Math.random())
    }
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    // Sizes
    sizes[i] = Math.random() * 2 + 0.5
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  // Custom shader material for glow effect
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vAlpha;
      uniform float uTime;
      uniform float uPixelRatio;
      
      void main() {
        vColor = color;
        
        vec3 pos = position;
        float noise = sin(pos.x * 0.05 + uTime) * cos(pos.y * 0.05 + uTime) * 2.0;
        pos += normal * noise;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        
        float distance = length(mvPosition.xyz);
        vAlpha = smoothstep(100.0, 20.0, distance);
        
        gl_PointSize = size * uPixelRatio * (50.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      
      void main() {
        float distanceToCenter = length(gl_PointCoord - vec2(0.5));
        float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
        alpha *= vAlpha * 0.8;
        
        vec3 glow = vColor * 1.5;
        gl_FragColor = vec4(glow, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)

  // Add some connecting lines for effect
  const lineGeometry = new THREE.BufferGeometry()
  const linePositions = new Float32Array(300 * 2 * 3)
  
  for (let i = 0; i < 300; i++) {
    const idx1 = Math.floor(Math.random() * particleCount)
    const idx2 = Math.floor(Math.random() * particleCount)
    
    linePositions[i * 6] = positions[idx1 * 3]
    linePositions[i * 6 + 1] = positions[idx1 * 3 + 1]
    linePositions[i * 6 + 2] = positions[idx1 * 3 + 2]
    linePositions[i * 6 + 3] = positions[idx2 * 3]
    linePositions[i * 6 + 4] = positions[idx2 * 3 + 1]
    linePositions[i * 6 + 5] = positions[idx2 * 3 + 2]
  }
  
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
  
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00f5ff,
    transparent: true,
    opacity: 0.05,
    blending: THREE.AdditiveBlending,
  })
  
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
  scene.add(lines)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  const time = performance.now() * 0.001

  // Update shader time
  if (particles && particles.material instanceof THREE.ShaderMaterial) {
    particles.material.uniforms.uTime.value = time
  }

  // Rotate based on mouse position
  if (particles) {
    particles.rotation.x += (mouseY * 0.0001 - particles.rotation.x * 0.01) * 0.1
    particles.rotation.y += (mouseX * 0.0001 - particles.rotation.y * 0.01) * 0.1
    particles.rotation.z += 0.0005
  }

  renderer.render(scene, camera)
}

const handleMouseMove = (event: MouseEvent) => {
  mouseX = event.clientX - window.innerWidth / 2
  mouseY = event.clientY - window.innerHeight / 2
}

const handleResize = () => {
  if (!containerRef.value) return

  camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
}

onMounted(() => {
  initScene()
  animate()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleResize)
  
  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
  }
})
</script>

<template>
  <div 
    ref="containerRef" 
    class="absolute inset-0 -z-10"
    aria-hidden="true"
  />
</template>
