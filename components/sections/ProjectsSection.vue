<script setup lang="ts">
interface Project {
  id: number
  title: string
  slug: string
  description: string
  longDescription?: string
  imageUrl?: string
  githubUrl?: string
  liveUrl?: string
  technologies: string[]
  category: string
  featured: boolean
}

const props = defineProps<{
  projects: Project[]
}>()

const currentIndex = ref(0)
const isAnimating = ref(false)
const touchStartX = ref(0)
const touchEndX = ref(0)
const carouselRef = ref<HTMLElement | null>(null)

const activeFilter = ref('all')

const filters = [
  { id: 'all', label: 'Tous' },
  { id: 'web', label: 'Web' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'featured', label: '⭐ Featured' },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return props.projects || []
  if (activeFilter.value === 'featured') return props.projects?.filter(p => p.featured) || []
  return props.projects?.filter(p => p.category === activeFilter.value) || []
})

// Reset index when filter changes
watch(activeFilter, () => {
  currentIndex.value = 0
})

const nextSlide = () => {
  if (isAnimating.value || filteredProjects.value.length === 0) return
  isAnimating.value = true
  currentIndex.value = (currentIndex.value + 1) % filteredProjects.value.length
  setTimeout(() => isAnimating.value = false, 500)
}

const prevSlide = () => {
  if (isAnimating.value || filteredProjects.value.length === 0) return
  isAnimating.value = true
  currentIndex.value = (currentIndex.value - 1 + filteredProjects.value.length) % filteredProjects.value.length
  setTimeout(() => isAnimating.value = false, 500)
}

const goToSlide = (index: number) => {
  if (isAnimating.value || index === currentIndex.value) return
  isAnimating.value = true
  currentIndex.value = index
  setTimeout(() => isAnimating.value = false, 500)
}

const getSlideStyle = (index: number): Record<string, string> => {
  const total = filteredProjects.value.length
  if (total === 0) return {}

  let diff = index - currentIndex.value

  // Handle circular navigation
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total

  const absPos = Math.abs(diff)
  const isActive = diff === 0
  const isAdjacent = absPos === 1
  const isVisible = absPos <= 2

  if (!isVisible) {
    return {
      opacity: '0',
      transform: `translateX(${diff * 100}%) scale(0.6)`,
      zIndex: '0',
      pointerEvents: 'none'
    }
  }

  return {
    opacity: isActive ? '1' : isAdjacent ? '0.6' : '0.3',
    transform: `translateX(${diff * 85}%) scale(${isActive ? 1 : isAdjacent ? 0.85 : 0.7})`,
    zIndex: isActive ? '30' : isAdjacent ? '20' : '10',
    pointerEvents: isActive ? 'auto' : 'none',
    filter: isActive ? 'none' : 'brightness(0.7)'
  }
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    web: 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10',
    desktop: 'text-neon-purple border-neon-purple/30 bg-neon-purple/10',
    mobile: 'text-neon-pink border-neon-pink/30 bg-neon-pink/10',
  }
  return colors[category] || 'text-white/60 border-white/20 bg-white/5'
}

// Touch handlers for mobile
const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const diff = touchStartX.value - touchEndX.value
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
}

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') prevSlide()
  if (e.key === 'ArrowRight') nextSlide()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Auto-play 
const autoplayInterval = ref<number | null>(null)
onMounted(() => {
  autoplayInterval.value = window.setInterval(nextSlide, 5000)
})
onUnmounted(() => {
  if (autoplayInterval.value) window.clearInterval(autoplayInterval.value)
})
</script>

<template>
  <section id="projects" class="relative py-32 overflow-hidden">
    <!-- Background -->
    <div class="absolute top-1/2 left-0 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl -translate-y-1/2" />
    <div class="absolute top-1/4 right-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-3xl" />

    <div class="max-w-7xl mx-auto px-6 relative">
      <!-- Section Header -->
      <div v-motion :initial="{ opacity: 0, y: 30 }" :visible-once="{ opacity: 1, y: 0 }" class="text-center mb-16">
        <span class="font-mono text-neon-cyan text-sm tracking-widest uppercase">
          Portfolio
        </span>
        <h2 class="section-title mt-4">
          Mes <span class="gradient-text">projets</span>
        </h2>
        <p class="mt-4 text-white/50 max-w-2xl mx-auto">
          Une sélection de projets réalisés durant ma formation et mes expériences professionnelles.
        </p>
      </div>

      <!-- Filters -->
      <div v-motion :initial="{ opacity: 0, y: 20 }" :visible-once="{ opacity: 1, y: 0, transition: { delay: 200 } }"
        class="flex justify-center gap-2 mb-12">
        <button v-for="filter in filters" :key="filter.id" class="px-5 py-2 rounded-lg font-mono text-sm transition-all"
          :class="[
            activeFilter === filter.id
              ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
              : 'bg-white/5 text-white/60 border border-transparent hover:border-white/20'
          ]" @click="activeFilter = filter.id">
          {{ filter.label }}
        </button>
      </div>

      <!-- Carousel Container -->
      <div v-if="filteredProjects.length > 0" class="relative" @touchstart="handleTouchStart"
        @touchmove="handleTouchMove" @touchend="handleTouchEnd">
        <!-- Navigation Arrows -->
        <button @click="prevSlide" class="absolute left-0 lg:-left-16 top-1/2 -translate-y-1/2 z-40 w-12 h-12 
                 rounded-full glass-card flex items-center justify-center
                 text-white/60 hover:text-neon-cyan hover:border-neon-cyan/50
                 transition-all duration-300 group"
          :class="{ 'opacity-50 cursor-not-allowed': filteredProjects.length <= 1 }"
          :disabled="filteredProjects.length <= 1">
          <svg class="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button @click="nextSlide" class="absolute right-0 lg:-right-16 top-1/2 -translate-y-1/2 z-40 w-12 h-12 
                 rounded-full glass-card flex items-center justify-center
                 text-white/60 hover:text-neon-cyan hover:border-neon-cyan/50
                 transition-all duration-300 group"
          :class="{ 'opacity-50 cursor-not-allowed': filteredProjects.length <= 1 }"
          :disabled="filteredProjects.length <= 1">
          <svg class="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Carousel -->
        <div ref="carouselRef" class="relative h-[500px] md:h-[550px] flex items-center justify-center overflow-hidden">
          <div v-for="(project, index) in filteredProjects" :key="project.id"
            class="absolute w-full max-w-xs sm:max-w-sm md:max-w-lg transition-all duration-500 ease-out"
            :style="getSlideStyle(index)">
            <article class="glass-card overflow-hidden group h-full">
              <!-- Image - Clickable -->

              <a :href="project.githubUrl || '#'" :target="project.githubUrl ? '_blank' : undefined"
                rel="noopener noreferrer" class="block relative aspect-video overflow-hidden bg-dark-800 cursor-pointer"
                :class="{ 'pointer-events-none': index !== currentIndex }">
                <!-- Placeholder gradient -->
                <div class="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-dark-800 to-neon-purple/20" />

                <!-- Project initial letters -->
                <div
                  class="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl font-display font-bold text-white/10">
                  {{project.title.split(' ').map(w => w[0]).join('').slice(0, 3)}}
                </div>

                <!-- Hover overlay -->
                <div v-if="index === currentIndex" class="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 
           transition-opacity flex items-center justify-center">
                  <div class="flex items-center gap-2 text-white font-mono text-sm">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Voir sur GitHub
                  </div>
                </div>

                <!-- Category Badge -->
                <div class="absolute top-3 right-3 px-3 py-1 text-xs font-mono uppercase 
           tracking-wider rounded-full border backdrop-blur-sm" :class="getCategoryColor(project.category)">
                  {{ project.category }}
                </div>

                <!-- Featured Badge -->
                <div v-if="project.featured" class="absolute top-3 left-3 px-3 py-1 text-xs font-mono uppercase 
           tracking-wider rounded-full bg-yellow-500/20 text-yellow-400 
           border border-yellow-500/30 backdrop-blur-sm">
                  ⭐ Featured
                </div>
              </a>

              <!-- Content -->
              <div class="p-6">
                <h3
                  class="text-xl md:text-2xl font-display font-bold mb-3 group-hover:text-neon-cyan transition-colors">
                  {{ project.title }}
                </h3>
                <p class="text-white/50 text-sm md:text-base mb-4 line-clamp-2">
                  {{ project.description }}
                </p>

                <!-- Technologies -->
                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in project.technologies.slice(0, 4)" :key="tech"
                    class="px-2 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded text-white/60">
                    {{ tech }}
                  </span>
                  <span v-if="project.technologies.length > 4"
                    class="px-2 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded text-white/40">
                    +{{ project.technologies.length - 4 }}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Pagination Dots -->
        <div class="flex justify-center items-center gap-2 mt-8">
          <button v-for="(project, index) in filteredProjects" :key="project.id" @click="goToSlide(index)"
            class="group relative p-2" :aria-label="`Aller au projet ${index + 1}`">
            <span class="block w-2 h-2 rounded-full transition-all duration-300" :class="[
              index === currentIndex
                ? 'bg-neon-cyan w-8'
                : 'bg-white/20 group-hover:bg-white/40'
            ]" />
          </button>
        </div>

        <!-- Project Counter -->
        <div class="text-center mt-4">
          <span class="font-mono text-sm text-white/40">
            {{ currentIndex + 1 }} / {{ filteredProjects.length }}
          </span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <p class="text-white/50 font-mono">Aucun projet dans cette catégorie</p>
      </div>

      <!-- View More Link -->
      <div v-motion :initial="{ opacity: 0 }" :visible-once="{ opacity: 1, transition: { delay: 600 } }"
        class="text-center mt-12">
        <a href="https://github.com/FranzouGame" target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-2 font-mono text-neon-cyan hover:text-white transition-colors group">
          Voir plus sur GitHub
          <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>