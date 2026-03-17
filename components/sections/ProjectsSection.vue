<script setup lang="ts">
import type { ProjectData } from '~/types/api'

const props = defineProps<{
  projects: ProjectData[]
}>()

const currentIndex = ref(0)
const isAnimating = ref(false)
const touchStartX = ref(0)
const touchEndX = ref(0)
const autoplayInterval = ref<number | null>(null)

const activeFilter = ref('all')
const projectImagesEnabled = false

const filters = [
  { id: 'all', label: 'Tous' },
  { id: 'web', label: 'Web' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'featured', label: 'Sélection' },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return props.projects || []
  if (activeFilter.value === 'featured') return props.projects?.filter(project => project.featured) || []
  return props.projects?.filter(project => project.category === activeFilter.value) || []
})

const currentProject = computed(() => {
  return filteredProjects.value[currentIndex.value] || null
})

watch(activeFilter, () => {
  currentIndex.value = 0
})

watch(filteredProjects, projects => {
  if (currentIndex.value >= projects.length) {
    currentIndex.value = 0
  }
})

const nextSlide = () => {
  if (isAnimating.value || filteredProjects.value.length <= 1) return
  isAnimating.value = true
  currentIndex.value = (currentIndex.value + 1) % filteredProjects.value.length
  window.setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

const prevSlide = () => {
  if (isAnimating.value || filteredProjects.value.length <= 1) return
  isAnimating.value = true
  currentIndex.value = (currentIndex.value - 1 + filteredProjects.value.length) % filteredProjects.value.length
  window.setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

const goToSlide = (index: number) => {
  if (isAnimating.value || index === currentIndex.value) return
  isAnimating.value = true
  currentIndex.value = index
  window.setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

const getSlideStyle = (index: number): Record<string, string> => {
  const total = filteredProjects.value.length
  if (total === 0) return {}

  let diff = index - currentIndex.value

  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total

  const absPos = Math.abs(diff)
  const isActive = diff === 0
  const isAdjacent = absPos === 1
  const isVisible = absPos <= 2

  if (!isVisible) {
    return {
      opacity: '0',
      transform: `translateX(${diff * 100}%) scale(0.68)`,
      zIndex: '0',
      pointerEvents: 'none',
    }
  }

  return {
    opacity: isActive ? '1' : isAdjacent ? '0.6' : '0.22',
    transform: `translateX(${diff * 78}%) scale(${isActive ? 1 : isAdjacent ? 0.88 : 0.76})`,
    zIndex: isActive ? '30' : isAdjacent ? '20' : '10',
    pointerEvents: isActive || isAdjacent ? 'auto' : 'none',
    filter: isActive ? 'none' : 'saturate(0.88)',
    cursor: isActive ? 'default' : 'pointer',
  }
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    web: 'text-primary-600 border-primary-200 bg-primary-50',
    desktop: 'text-slate-600 border-slate-200 bg-slate-50',
    mobile: 'text-primary-700 border-primary-300 bg-primary-100',
  }

  return colors[category] || 'text-slate-500 border-slate-200 bg-white'
}

const getProjectUrl = (project: ProjectData) => {
  return project.liveUrl || project.githubUrl || '#'
}

const hasProjectImage = (project: ProjectData) => {
  return projectImagesEnabled && Boolean(project.imageUrl)
}

const getPosterStyle = (project: ProjectData) => {
  if (!hasProjectImage(project)) return {}

  return {
    backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1), rgba(240,245,250,0.8)), url(${project.imageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }
}

const getProjectMonogram = (project: ProjectData) => {
  return project.title
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX
  touchEndX.value = event.touches[0].clientX
}

const handleTouchMove = (event: TouchEvent) => {
  touchEndX.value = event.touches[0].clientX
}

const handleTouchEnd = () => {
  const diff = touchStartX.value - touchEndX.value
  if (Math.abs(diff) > 50) {
    if (diff > 0) nextSlide()
    else prevSlide()
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') prevSlide()
  if (event.key === 'ArrowRight') nextSlide()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  autoplayInterval.value = window.setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (autoplayInterval.value) window.clearInterval(autoplayInterval.value)
})
</script>

<template>
  <section id="projects" class="relative scroll-mt-28 py-24 sm:py-28">
    <!-- Japanese decorative elements -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <UiDecoAsanoha :size="70" class="absolute left-6 top-16 text-primary-300 opacity-40" />
      <UiDecoTwig class="absolute -left-3 bottom-10 text-primary-400 rotate-12" />
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="section-shell px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div class="max-w-3xl">
            <span
              v-motion
              :initial="{ opacity: 0, y: 16 }"
              :visible-once="{ opacity: 1, y: 0 }"
              class="font-mono text-sm uppercase tracking-[0.24em] text-primary-500 font-semibold"
            >
              Portfolio
            </span>

            <h2
              v-motion
              :initial="{ opacity: 0, y: 22 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 120 } }"
              class="mt-6 font-display text-4xl tracking-tight text-slate-800 sm:text-5xl"
            >
              Des projets complets, concrets et bien finis.
            </h2>

            <p
              v-motion
              :initial="{ opacity: 0 }"
              :visible-once="{ opacity: 1, transition: { delay: 220 } }"
              class="mt-6 text-lg leading-relaxed text-slate-600"
            >
              Une sélection de réalisations construites pendant ma formation et mes expériences, avec une attention forte sur la qualité d’exécution et la cohérence globale.
            </p>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: 180 } }"
            class="flex flex-wrap gap-3"
          >
            <button
              v-for="filter in filters"
              :key="filter.id"
              class="rounded-full border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] transition-all duration-300 shadow-sm"
              :class="
                activeFilter === filter.id
                  ? 'border-primary-200 bg-primary-100 text-primary-800 shadow-soft'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700'
              "
              @click="activeFilter = filter.id"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>

        <div
          v-if="filteredProjects.length > 0"
          class="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div class="relative">
            <div class="pointer-events-none absolute inset-x-10 top-10 h-64 rounded-full project-orbit-glow opacity-80 blur-3xl" />
            <div class="relative flex min-h-[500px] items-center justify-center overflow-hidden sm:min-h-[560px]">
              <div
                v-for="(project, index) in filteredProjects"
                :key="project.id"
                class="absolute w-full max-w-[22rem] transition-all duration-500 ease-out sm:max-w-[28rem] md:max-w-[36rem]"
                :style="getSlideStyle(index)"
                @click="index !== currentIndex && goToSlide(index)"
              >
                <article
                  class="project-card overflow-hidden transition-transform hover:-translate-y-1"
                  :class="index === currentIndex ? 'project-card-active' : 'bg-white shadow-soft'"
                >
                  <a
                    :href="getProjectUrl(project)"
                    :target="getProjectUrl(project) !== '#' ? '_blank' : undefined"
                    rel="noopener noreferrer"
                    class="project-poster relative block aspect-[15/10] overflow-hidden p-6 sm:p-8 border-b border-slate-100 bg-surface-50"
                    :style="getPosterStyle(project)"
                    :class="{ 'pointer-events-none': index !== currentIndex }"
                  >
                    <div v-if="!hasProjectImage(project)" class="absolute inset-0 bg-[radial-gradient(#e1ebf4_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                    <div class="relative flex h-full flex-col justify-between">
                      <span class="project-focus-line" :class="index === currentIndex ? 'opacity-100' : 'opacity-0'" />
                      <div class="flex items-start justify-between gap-4">
                        <div class="space-y-3">
                          <span
                            class="inline-flex rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em]"
                            :class="getCategoryColor(project.category)"
                          >
                            {{ project.category }}
                          </span>
                          <p class="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-400">
                            {{ String(index + 1).padStart(2, '0') }} / {{ String(filteredProjects.length).padStart(2, '0') }}
                          </p>
                        </div>

                        <span
                          v-if="project.featured"
                          class="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-primary-700 shadow-sm"
                        >
                          Sélection
                        </span>
                      </div>

                      <div class="relative">
                        <p class="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
                          {{ project.slug.replace(/-/g, ' / ') }}
                        </p>
                        <div class="mt-4 flex items-end justify-between gap-4">
                          <h3 class="max-w-[80%] font-display text-4xl tracking-tight text-slate-800 sm:text-5xl">
                            {{ project.title }}
                          </h3>
                          <span class="project-monogram font-display text-5xl tracking-tight text-slate-200 sm:text-6xl">
                            {{ getProjectMonogram(project) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>

                  <div class="p-6 sm:p-7">
                    <p class="text-sm leading-relaxed text-slate-600 sm:text-base">
                      {{ project.description }}
                    </p>

                    <div class="mt-6 flex flex-wrap gap-2">
                      <span
                        v-for="tech in project.technologies.slice(0, 4)"
                        :key="tech"
                        class="inline-flex rounded-full bg-surface-100 border border-slate-200 px-3 py-1.5 text-xs text-slate-600 shadow-sm"
                      >
                        {{ tech }}
                      </span>
                      <span
                        v-if="project.technologies.length > 4"
                        class="inline-flex rounded-full bg-surface-50 border border-slate-100 px-3 py-1.5 text-xs text-slate-400"
                      >
                        +{{ project.technologies.length - 4 }}
                      </span>
                    </div>

                    <div class="mt-6 flex flex-wrap gap-3">
                      <a
                        v-if="project.githubUrl"
                        :href="project.githubUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                      >
                        GitHub
                      </a>
                      <a
                        v-if="project.liveUrl"
                        :href="project.liveUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                      >
                        Live
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white p-2 shadow-sm">
                <button
                  class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-all duration-300 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-50"
                  :disabled="filteredProjects.length <= 1"
                  @click="prevSlide"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <span class="px-3 font-mono text-[10px] uppercase tracking-[0.28em] text-slate-400">
                  {{ currentIndex + 1 }} / {{ filteredProjects.length }}
                </span>

                <button
                  class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-all duration-300 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-50"
                  :disabled="filteredProjects.length <= 1"
                  @click="nextSlide"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <button
                  v-for="(project, index) in filteredProjects"
                  :key="project.id"
                  class="group relative p-1"
                  :aria-label="`Aller au projet ${index + 1}`"
                  @click="goToSlide(index)"
                >
                  <span
                    class="block h-2 rounded-full transition-all duration-300"
                    :class="index === currentIndex ? 'w-10 bg-primary-500' : 'w-2 bg-slate-200 group-hover:bg-slate-300'"
                  />
                </button>
              </div>
            </div>
          </div>

          <div v-if="currentProject" class="space-y-4">
            <div class="surface-card-accent p-6">
              <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Projet actif</p>
              <p class="mt-4 font-display text-3xl tracking-tight text-slate-800">
                {{ currentProject.title }}
              </p>
              <p class="mt-4 text-slate-600">
                {{ currentProject.longDescription || currentProject.description }}
              </p>

              <div class="mt-6 grid gap-3 sm:grid-cols-2">
                <div class="rounded-xl border border-white/60 bg-white/70 p-4">
                  <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-400">Lecture</p>
                  <p class="mt-2 text-sm text-slate-700">
                    {{ currentProject.featured ? 'Projet mis en avant' : 'Projet du portfolio' }}
                  </p>
                </div>
                <div class="rounded-xl border border-white/60 bg-white/70 p-4">
                  <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-400">Cadence</p>
                  <p class="mt-2 text-sm text-slate-700">
                    {{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(filteredProjects.length).padStart(2, '0') }}
                  </p>
                </div>
              </div>
            </div>

            <div class="surface-card p-6">
              <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Technologies</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="tech in currentProject.technologies"
                  :key="tech"
                  class="inline-flex rounded-full bg-surface-100 border border-slate-200 px-3 py-1.5 text-sm text-slate-600 shadow-sm"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="surface-card-editorial p-6">
              <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Liens</p>
              <div class="mt-4 flex flex-wrap gap-3">
                <a
                  v-if="currentProject.githubUrl"
                  :href="currentProject.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
                >
                  Code source
                </a>
                <a
                  v-if="currentProject.liveUrl"
                  :href="currentProject.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex h-12 items-center justify-center rounded-full bg-primary-600 px-8 font-medium text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-500 hover:shadow-hover focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
                >
                  <span class="relative z-10">Voir le projet</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="rounded-[28px] border border-slate-100 bg-white shadow-sm mx-auto mt-10 max-w-xl p-12 text-center">
          <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Rien ici pour l’instant</p>
          <p class="mt-4 text-slate-500">Aucun projet ne correspond à ce filtre.</p>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0 }"
          :visible-once="{ opacity: 1, transition: { delay: 420 } }"
          class="mt-12 text-center"
        >
          <a
            href="https://github.com/FranzouGame"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary-600 transition-colors hover:text-primary-800"
          >
            Explorer mon GitHub
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-card {
  position: relative;
  border-radius: 28px;
  border: 1px solid rgb(var(--line) / 0.1);
}

.project-card-active {
  background:
    linear-gradient(
      160deg,
      rgb(var(--surface) / 0.98) 0%,
      rgb(var(--surface-alt) / 0.92) 62%,
      rgb(var(--surface-strong) / 0.74) 100%
    );
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.16),
    0 28px 64px rgb(var(--shadow) / 0.16);
}

.project-card-active::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at top right, rgb(var(--accent-soft) / 0.16), transparent 24%),
    linear-gradient(180deg, rgb(255 255 255 / 0.14), transparent 20%);
}

.project-orbit-glow {
  background:
    radial-gradient(circle at center, rgb(var(--accent-soft) / 0.2) 0%, rgb(var(--accent) / 0.08) 42%, transparent 74%);
}

.project-focus-line {
  position: absolute;
  left: 0;
  top: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgb(var(--accent-strong)), transparent);
  transition: opacity 0.3s ease;
}

.project-monogram {
  position: relative;
  padding: 0.35rem 0.75rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgb(var(--line) / 0.12);
  background: rgb(var(--surface) / 0.54);
  backdrop-filter: blur(12px);
}
</style>
