<script setup lang="ts">
interface Project {
  id: number
  title: string
  slug: string
  description: string
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

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    web: 'text-neon-cyan border-neon-cyan/30',
    desktop: 'text-neon-purple border-neon-purple/30',
    mobile: 'text-neon-pink border-neon-pink/30',
  }
  return colors[category] || 'text-white/60 border-white/20'
}
</script>

<template>
  <section id="projects" class="relative py-32 overflow-hidden">
    <!-- Background -->
    <div class="absolute top-1/2 left-0 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl -translate-y-1/2" />
    <div class="absolute top-1/4 right-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-3xl" />

    <div class="max-w-7xl mx-auto px-6 relative">
      <!-- Section Header -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        class="text-center mb-16"
      >
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
      <div 
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 200 } }"
        class="flex justify-center gap-2 mb-12"
      >
        <button
          v-for="filter in filters"
          :key="filter.id"
          class="px-5 py-2 rounded-lg font-mono text-sm transition-all"
          :class="[
            activeFilter === filter.id
              ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
              : 'bg-white/5 text-white/60 border border-transparent hover:border-white/20'
          ]"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TransitionGroup name="project">
          <article
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: 100 * index } }"
            class="group relative"
          >
            <div class="glass-card-hover h-full flex flex-col overflow-hidden">
              <!-- Image -->
              <div class="relative aspect-video overflow-hidden bg-dark-800">
                <!-- Placeholder gradient -->
                <div 
                  class="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-dark-800 to-neon-purple/20"
                />
                
                <!-- Project initial letters -->
                <div 
                  class="absolute inset-0 flex items-center justify-center text-4xl 
                         font-display font-bold text-white/10"
                >
                  {{ project.title.split(' ').map(w => w[0]).join('').slice(0, 3) }}
                </div>

                <!-- Hover overlay -->
                <div 
                  class="absolute inset-0 bg-dark-950/80 opacity-0 group-hover:opacity-100 
                         transition-opacity flex items-center justify-center gap-4"
                >
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    title="Voir sur GitHub"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    title="Voir le projet"
                  >
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <!-- Category Badge -->
                <div 
                  class="absolute top-3 right-3 px-3 py-1 text-xs font-mono uppercase 
                         tracking-wider rounded-full border backdrop-blur-sm"
                  :class="getCategoryColor(project.category)"
                >
                  {{ project.category }}
                </div>

                <!-- Featured Badge -->
                <div 
                  v-if="project.featured"
                  class="absolute top-3 left-3 px-3 py-1 text-xs font-mono uppercase 
                         tracking-wider rounded-full bg-neon-cyan/20 text-neon-cyan 
                         border border-neon-cyan/30"
                >
                  ⭐ Featured
                </div>
              </div>

              <!-- Content -->
              <div class="p-6 flex-1 flex flex-col">
                <h3 class="text-xl font-display font-bold mb-2 group-hover:text-neon-cyan transition-colors">
                  {{ project.title }}
                </h3>
                <p class="text-white/50 text-sm mb-4 flex-1">
                  {{ project.description }}
                </p>

                <!-- Technologies -->
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.technologies.slice(0, 4)"
                    :key="tech"
                    class="px-2 py-1 text-xs font-mono bg-white/5 rounded text-white/60"
                  >
                    {{ tech }}
                  </span>
                  <span
                    v-if="project.technologies.length > 4"
                    class="px-2 py-1 text-xs font-mono bg-white/5 rounded text-white/40"
                  >
                    +{{ project.technologies.length - 4 }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </div>

      <!-- View More Link -->
      <div 
        v-motion
        :initial="{ opacity: 0 }"
        :visible-once="{ opacity: 1, transition: { delay: 600 } }"
        class="text-center mt-12"
      >
        <a
          href="https://github.com/FranzouGame"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 font-mono text-neon-cyan hover:text-white transition-colors"
        >
          Voir plus sur GitHub
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-enter-active,
.project-leave-active {
  transition: all 0.4s ease;
}

.project-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.project-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.project-move {
  transition: transform 0.4s ease;
}
</style>
