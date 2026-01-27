<script setup lang="ts">
interface Experience {
  id: number
  title: string
  company: string
  location?: string
  type: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  technologies: string[]
}

interface Education {
  id: number
  degree: string
  school: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
}

const props = defineProps<{
  experiences: Experience[]
  education: Education[]
}>()

const activeTab = ref<'experience' | 'education'>('experience')

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    stage: 'Stage',
    alternance: 'Alternance',
    cdi: 'CDI',
    cdd: 'CDD',
  }
  return labels[type] || type
}

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    stage: 'bg-neon-blue/20 text-neon-blue border-neon-blue/30',
    alternance: 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30',
    cdi: 'bg-green-500/20 text-green-400 border-green-500/30',
    cdd: 'bg-neon-purple/20 text-neon-purple border-neon-purple/30',
  }
  return colors[type] || 'bg-white/10 text-white/60 border-white/20'
}
</script>

<template>
  <section id="timeline" class="relative py-32 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 dot-grid opacity-20" />
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-3xl" />

    <div class="max-w-5xl mx-auto px-6 relative">
      <!-- Section Header -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        class="text-center mb-16"
      >
        <span class="font-mono text-neon-cyan text-sm tracking-widest uppercase">
          Parcours
        </span>
        <h2 class="section-title mt-4">
          Mon <span class="gradient-text">parcours</span>
        </h2>
      </div>

      <!-- Tabs -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 200 } }"
        class="flex justify-center gap-4 mb-16"
      >
        <button
          class="px-8 py-4 rounded-xl font-mono text-sm transition-all relative overflow-hidden"
          :class="[
            activeTab === 'experience'
              ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/50 text-white'
              : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
          ]"
          @click="activeTab = 'experience'"
        >
          💼 Expériences
        </button>
        <button
          class="px-8 py-4 rounded-xl font-mono text-sm transition-all"
          :class="[
            activeTab === 'education'
              ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/50 text-white'
              : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
          ]"
          @click="activeTab = 'education'"
        >
          🎓 Formation
        </button>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical Line -->
        <div 
          class="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b 
                 from-neon-cyan via-neon-blue to-neon-purple transform md:-translate-x-1/2"
        />

        <!-- Experience Timeline -->
        <Transition
          enter-active-class="transition-all duration-500"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <div v-if="activeTab === 'experience'" key="experience">
            <div
              v-for="(exp, index) in experiences"
              :key="exp.id"
              v-motion
              :initial="{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }"
              :visible-once="{ opacity: 1, x: 0, transition: { delay: 200 * index } }"
              class="relative mb-12 last:mb-0"
              :class="index % 2 === 0 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'"
            >
              <!-- Dot -->
              <div 
                class="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-neon-cyan 
                       transform -translate-x-1/2 shadow-[0_0_20px_rgba(0,245,255,0.5)]"
                :class="exp.current ? 'animate-pulse' : ''"
              />

              <!-- Card -->
              <div 
                class="ml-8 md:ml-0 glass-card p-6 hover:border-neon-cyan/30 transition-all"
              >
                <!-- Header -->
                <div class="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 class="text-xl font-display font-bold">{{ exp.title }}</h3>
                    <p class="text-neon-cyan font-mono text-sm">{{ exp.company }}</p>
                  </div>
                  <span 
                    class="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border"
                    :class="getTypeColor(exp.type)"
                  >
                    {{ getTypeLabel(exp.type) }}
                  </span>
                </div>

                <!-- Date & Location -->
                <div class="flex flex-wrap gap-4 text-sm text-white/50 mb-4">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatDate(exp.startDate) }} - {{ exp.current ? 'Présent' : formatDate(exp.endDate!) }}
                  </span>
                  <span v-if="exp.location" class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ exp.location }}
                  </span>
                </div>

                <!-- Description -->
                <p class="text-white/60 text-sm leading-relaxed mb-4">
                  {{ exp.description }}
                </p>

                <!-- Technologies -->
                <div v-if="exp.technologies?.length" class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in exp.technologies"
                    :key="tech"
                    class="px-2 py-1 text-xs font-mono bg-white/5 rounded text-white/60"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Education Timeline -->
          <div v-else key="education">
            <div
              v-for="(edu, index) in education"
              :key="edu.id"
              v-motion
              :initial="{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }"
              :visible-once="{ opacity: 1, x: 0, transition: { delay: 200 * index } }"
              class="relative mb-12 last:mb-0"
              :class="index % 2 === 0 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'"
            >
              <!-- Dot -->
              <div 
                class="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-neon-purple 
                       transform -translate-x-1/2 shadow-[0_0_20px_rgba(191,0,255,0.5)]"
                :class="edu.current ? 'animate-pulse' : ''"
              />

              <!-- Card -->
              <div 
                class="ml-8 md:ml-0 glass-card p-6 hover:border-neon-purple/30 transition-all"
              >
                <!-- Header -->
                <div class="mb-4">
                  <h3 class="text-xl font-display font-bold">{{ edu.degree }}</h3>
                  <p class="text-neon-purple font-mono text-sm">{{ edu.school }}</p>
                </div>

                <!-- Date & Location -->
                <div class="flex flex-wrap gap-4 text-sm text-white/50 mb-4">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatDate(edu.startDate) }} - {{ edu.current ? 'Présent' : formatDate(edu.endDate!) }}
                  </span>
                  <span v-if="edu.location" class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ edu.location }}
                  </span>
                </div>

                <!-- Description -->
                <p class="text-white/60 text-sm leading-relaxed">
                  {{ edu.description }}
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>
