<script setup lang="ts">
interface Skill {
  id: number
  name: string
  percentage: number
  category: string
}

const props = defineProps<{
  skills: Skill[]
}>()

const isVisible = ref(false)
const activeCategory = ref('frontend')

const categories = [
  {
    id: 'frontend',
    label: 'Frontend',
    code: 'FE',
    title: 'Construire des interfaces nettes et fluides.',
    description: 'Nuxt, Vue, TypeScript et un soin fort porté à la lisibilité, aux détails et à la réactivité.',
  },
  {
    id: 'backend',
    label: 'Backend',
    code: 'BE',
    title: 'Structurer une base technique fiable.',
    description: 'APIs, logique métier, bases de données et intégration propre entre front et back.',
  },
  {
    id: 'tools',
    label: 'Outils',
    code: 'OPS',
    title: 'Garder un flux de travail robuste.',
    description: 'Versioning, conteneurisation, méthodes de travail et qualité de livraison.',
  },
  {
    id: 'soft',
    label: 'Soft skills',
    code: 'HUM',
    title: 'Rester clair, adaptable et rigoureux.',
    description: 'Communication, autonomie, curiosité et capacité à faire avancer un projet dans le bon rythme.',
  },
]

const preferredStack = ['Nuxt.js', 'Vue.js', 'TypeScript', 'Django', 'Python', 'TailwindCSS', 'Git', 'SQL']

const filteredSkills = computed(() => {
  return props.skills?.filter(skill => skill.category === activeCategory.value) || []
})

const activeCategoryData = computed(() => {
  return categories.find(category => category.id === activeCategory.value) || categories[0]
})

const getBarColor = (percentage: number) => {
  if (percentage >= 90) return 'from-primary-400 to-primary-600'
  if (percentage >= 75) return 'from-primary-300 to-primary-500'
  if (percentage >= 60) return 'from-slate-300 to-primary-400'
  return 'from-slate-200 to-slate-400'
}

const triggerAnimation = () => {
  isVisible.value = false
  window.setTimeout(() => {
    isVisible.value = true
  }, 90)
}

watch(activeCategory, () => {
  triggerAnimation()
})

onMounted(() => {
  triggerAnimation()
})
</script>

<template>
  <section id="skills" class="relative scroll-mt-28 py-24 sm:py-28">
    <!-- Japanese decorative elements -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <UiDecoAsanoha :size="90" class="absolute right-4 top-16 text-primary-300 opacity-40 animate-spin-slow" />
      <UiDecoTwig class="absolute -right-1 bottom-0 text-primary-400 rotate-180" />
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="section-shell px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div class="grid gap-10 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
          <div class="flex flex-col h-full">
            <span
              v-motion
              :initial="{ opacity: 0, y: 16 }"
              :visible-once="{ opacity: 1, y: 0 }"
              class="font-mono text-sm uppercase tracking-[0.24em] text-primary-500 font-semibold"
            >
              Expertise
            </span>

            <h2
              v-motion
              :initial="{ opacity: 0, y: 22 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 120 } }"
              class="mt-6 font-display text-4xl tracking-tight text-slate-800 sm:text-5xl"
            >
              Une stack choisie pour la clarté et la fiabilité.
            </h2>

            <p
              v-motion
              :initial="{ opacity: 0 }"
              :visible-once="{ opacity: 1, transition: { delay: 220 } }"
              class="mt-6 text-lg leading-relaxed text-slate-600"
            >
              Une base technique solide, mais surtout une recherche constante de cohérence entre performance, lisibilité et qualité de finition.
            </p>

            <div class="mt-8 rounded-2xl border border-slate-100 bg-surface-50 p-6 shadow-sm">
              <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Catégorie active</p>
              <p class="mt-4 font-display text-3xl tracking-tight text-slate-800">
                {{ activeCategoryData.title }}
              </p>
              <p class="mt-4 text-slate-600">
                {{ activeCategoryData.description }}
              </p>
            </div>

            <div class="mt-auto pt-6">
              <div class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Stack préférée</p>
                <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="tech in preferredStack"
                  :key="tech"
                  class="inline-flex rounded-full bg-surface-100 border border-slate-200 px-3 py-1.5 text-sm text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-slate-900"
                >
                  {{ tech }}
                </span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col h-full">
            <div
              v-motion
              :initial="{ opacity: 0, y: 16 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 180 } }"
              class="flex flex-wrap gap-3"
            >
              <button
                v-for="category in categories"
                :key="category.id"
                class="rounded-full border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] transition-all duration-300 shadow-sm"
                :class="
                  activeCategory === category.id
                    ? 'border-primary-200 bg-primary-100 text-primary-800 shadow-soft'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700'
                "
                @click="activeCategory = category.id"
              >
                <span class="mr-3" :class="activeCategory === category.id ? 'text-primary-600' : 'text-primary-400'">{{ category.code }}</span>
                {{ category.label }}
              </button>
            </div>

            <div class="mt-8 grid gap-4 md:grid-cols-2 flex-1 items-start content-start">
              <TransitionGroup name="skill" tag="div" class="contents">
                <div
                  v-for="(skill, index) in filteredSkills"
                  :key="skill.id"
                  v-motion
                  :initial="{ opacity: 0, y: 14 }"
                  :visible-once="{ opacity: 1, y: 0, transition: { delay: 80 * index } }"
                  class="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-soft"
                >
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">{{ activeCategoryData.label }}</p>
                      <h3 class="mt-2 font-display text-2xl tracking-tight text-slate-800">
                        {{ skill.name }}
                      </h3>
                    </div>
                    <span class="font-mono text-[11px] uppercase tracking-[0.24em] text-primary-600 font-semibold">
                      {{ skill.percentage }}%
                    </span>
                  </div>

                  <div class="mt-6 h-1 w-full rounded-full bg-slate-100 overflow-hidden relative">
                    <div
                      class="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r"
                      :class="getBarColor(skill.percentage)"
                      :style="{
                        width: isVisible ? `${skill.percentage}%` : '0%',
                        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: `${index * 80}ms`,
                      }"
                    />
                  </div>

                  <div class="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    <span>Exploration</span>
                    <span>Maîtrise</span>
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-enter-active,
.skill-leave-active {
  transition: all 0.3s ease;
}

.skill-enter-from,
.skill-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.skill-move {
  transition: transform 0.3s ease;
}
</style>
