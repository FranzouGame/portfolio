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

const activeSummary = computed(() => {
  if (activeTab.value === 'experience') {
    return {
      title: 'Construire en production.',
      description: 'Expériences en entreprise, travail en équipe et amélioration continue de produits réels.',
    }
  }

  return {
    title: 'Approfondir les fondamentaux.',
    description: 'Formation, projets et progression technique pour consolider une pratique durable du développement.',
  }
})

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
    stage: 'bg-primary-50 text-secondary-600 border-primary-200',
    alternance: 'bg-primary-100 text-primary-700 border-primary-300',
    cdi: 'bg-green-50 text-green-700 border-green-200',
    cdd: 'bg-slate-100 text-slate-700 border-slate-300',
  }

  return colors[type] || 'bg-surface-50 text-slate-500 border-slate-200'
}
</script>

<template>
  <section id="timeline" class="relative scroll-mt-28 py-24 sm:py-28">
    <!-- Japanese decorative elements -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <UiDecoSeigaiha class="absolute -left-8 top-10 text-primary-300 rotate-6" />
      <UiDecoEnso :size="140" class="absolute right-4 bottom-12 text-primary-400 opacity-25" />
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
              Parcours
            </span>

            <h2
              v-motion
              :initial="{ opacity: 0, y: 22 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 120 } }"
              class="mt-6 font-display text-4xl tracking-tight text-slate-800 sm:text-5xl"
            >
              Une progression continue, ancrée dans la pratique.
            </h2>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: 180 } }"
            class="rounded-full border border-slate-200 bg-white shadow-sm inline-flex gap-2 p-2"
          >
            <button
              class="rounded-full px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] transition-all"
              :class="
                activeTab === 'experience'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              "
              @click="activeTab = 'experience'"
            >
              Expériences
            </button>
            <button
              class="rounded-full px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] transition-all"
              :class="
                activeTab === 'education'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              "
              @click="activeTab = 'education'"
            >
              Formation
            </button>
          </div>
        </div>

        <div class="mt-10 grid gap-8 items-start xl:grid-cols-[280px_minmax(0,1fr)]">
          <div class="relative">
            <div class="sticky top-32 rounded-2xl border border-slate-100 bg-surface-50 p-6 shadow-sm">
              <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Cap actuel</p>
              <p class="mt-4 font-display text-3xl tracking-tight text-slate-800">
                {{ activeSummary.title }}
              </p>
              <p class="mt-4 text-slate-600">
                {{ activeSummary.description }}
              </p>
            </div>
          </div>

          <div class="relative">
            <div class="absolute bottom-0 left-0 top-0 w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2" />

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
                  v-for="(experience, index) in experiences"
                  :key="experience.id"
                  v-motion
                  :initial="{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }"
                  :visible-once="{ opacity: 1, x: 0, transition: { delay: 150 * index } }"
                  class="relative mb-10 last:mb-0"
                  :class="index % 2 === 0 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'"
                >
                  <div
                    class="absolute left-0 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-primary-500 shadow-sm md:left-1/2"
                    :class="experience.current ? 'animate-pulse bg-primary-600' : ''"
                  />

                  <div class="rounded-2xl border border-slate-100 bg-white shadow-sm ml-8 p-6 md:ml-0 transition-transform hover:-translate-y-1 hover:shadow-soft">
                    <div class="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">
                          {{ formatDate(experience.startDate) }} - {{ experience.current ? 'Aujourd’hui' : formatDate(experience.endDate!) }}
                        </p>
                        <h3 class="mt-3 font-display text-3xl tracking-tight text-slate-800">
                          {{ experience.title }}
                        </h3>
                        <p class="mt-2 text-primary-600 font-medium">
                          {{ experience.company }}
                        </p>
                      </div>

                      <span
                        class="rounded-full border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em]"
                        :class="getTypeColor(experience.type)"
                      >
                        {{ getTypeLabel(experience.type) }}
                      </span>
                    </div>

                    <div class="mt-5 flex flex-wrap gap-3">
                      <span
                        v-if="experience.location"
                        class="inline-flex rounded-full bg-surface-50 border border-slate-100 px-3 py-1.5 text-xs text-slate-500"
                      >
                        {{ experience.location }}
                      </span>
                      <span class="inline-flex rounded-full bg-surface-50 border border-slate-100 px-3 py-1.5 text-xs text-slate-500">
                        {{ experience.current ? 'En cours' : 'Terminé' }}
                      </span>
                    </div>

                    <p class="mt-5 text-sm leading-relaxed text-slate-600">
                      {{ experience.description }}
                    </p>

                    <div v-if="experience.technologies?.length" class="mt-5 flex flex-wrap gap-2">
                      <span
                        v-for="tech in experience.technologies"
                        :key="tech"
                        class="inline-flex rounded-full bg-surface-100 border border-slate-200 px-3 py-1.5 text-xs text-slate-600 shadow-sm"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else key="education">
                <div
                  v-for="(entry, index) in education"
                  :key="entry.id"
                  v-motion
                  :initial="{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }"
                  :visible-once="{ opacity: 1, x: 0, transition: { delay: 150 * index } }"
                  class="relative mb-10 last:mb-0"
                  :class="index % 2 === 0 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'"
                >
                  <div
                    class="absolute left-0 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-secondary-500 shadow-sm md:left-1/2"
                    :class="entry.current ? 'animate-pulse bg-secondary-600' : ''"
                  />

                  <div class="rounded-2xl border border-slate-100 bg-white shadow-sm ml-8 p-6 md:ml-0 transition-transform hover:-translate-y-1 hover:shadow-soft">
                    <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">
                      {{ formatDate(entry.startDate) }} - {{ entry.current ? 'Aujourd’hui' : formatDate(entry.endDate!) }}
                    </p>
                    <h3 class="mt-3 font-display text-3xl tracking-tight text-slate-800">
                      {{ entry.degree }}
                    </h3>
                    <p class="mt-2 text-secondary-600 font-medium">
                      {{ entry.school }}
                    </p>

                    <div class="mt-5 flex flex-wrap gap-3">
                      <span
                        v-if="entry.location"
                        class="inline-flex rounded-full bg-surface-50 border border-slate-100 px-3 py-1.5 text-xs text-slate-500"
                      >
                        {{ entry.location }}
                      </span>
                      <span class="inline-flex rounded-full bg-surface-50 border border-slate-100 px-3 py-1.5 text-xs text-slate-500">
                        {{ entry.current ? 'En cours' : 'Complété' }}
                      </span>
                    </div>

                    <p class="mt-5 text-sm leading-relaxed text-slate-600">
                      {{ entry.description }}
                    </p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
