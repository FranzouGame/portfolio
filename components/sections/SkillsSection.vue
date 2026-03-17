<script setup lang="ts">
interface Skill {
  id: number
  name: string
  category: string
}

const props = defineProps<{
  skills: Skill[]
}>()

const activeCategory = ref('frontend')

const categories = [
  {
    id: 'frontend',
    label: 'Frontend',
    code: 'FE',
    title: 'Construire des interfaces nettes et fluides.',
    description: 'Nuxt, Vue, TypeScript et un soin fort porte a la lisibilite, aux details et a la reactivite.',
  },
  {
    id: 'backend',
    label: 'Backend',
    code: 'BE',
    title: 'Structurer une base technique fiable.',
    description: 'APIs, logique metier, bases de donnees et integration propre entre front et back.',
  },
  {
    id: 'tools',
    label: 'Outils',
    code: 'OPS',
    title: 'Garder un flux de travail robuste.',
    description: 'Versioning, conteneurisation, methodes de travail et qualite de livraison.',
  },
  {
    id: 'soft',
    label: 'Soft skills',
    code: 'HUM',
    title: 'Rester clair, adaptable et rigoureux.',
    description: 'Communication, autonomie, curiosite et capacite a faire avancer un projet dans le bon rythme.',
  },
]

const preferredStack = ['Nuxt.js', 'Vue.js', 'TypeScript', 'Django', 'Python', 'TailwindCSS', 'Git', 'SQL']

const filteredSkills = computed(() => {
  return props.skills?.filter(skill => skill.category === activeCategory.value) || []
})

const activeCategoryData = computed(() => {
  return categories.find(category => category.id === activeCategory.value) || categories[0]
})

const isPreferredSkill = (name: string) => preferredStack.includes(name)

const getSkillSummary = (skill: Skill) => {
  if (skill.category === 'soft') {
    return 'Une qualite de travail que je cherche a rendre concrete dans ma maniere de collaborer et d avancer.'
  }

  if (skill.category === 'tools') {
    return isPreferredSkill(skill.name)
      ? 'Un repere important dans mon environnement de travail actuel.'
      : 'Un outil que je mobilise selon le contexte, la stack et les contraintes du projet.'
  }

  return isPreferredSkill(skill.name)
    ? 'Une technologie que je mets volontiers au centre quand elle sert bien le projet.'
    : 'Une brique que je peux integrer selon le besoin fonctionnel, technique ou produit.'
}
</script>

<template>
  <section id="skills" class="relative scroll-mt-28 py-24 sm:py-28">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <UiDecoAsanoha :size="90" class="absolute right-4 top-16 text-primary-300 opacity-40 animate-spin-slow" />
      <UiDecoTwig class="absolute -right-1 bottom-0 rotate-180 text-primary-400" />
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="section-shell px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div class="grid gap-10 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
          <div class="flex h-full flex-col">
            <span
              v-motion
              :initial="{ opacity: 0, y: 16 }"
              :visible-once="{ opacity: 1, y: 0 }"
              class="font-mono text-sm font-semibold uppercase tracking-[0.24em] text-primary-500"
            >
              Expertise
            </span>

            <h2
              v-motion
              :initial="{ opacity: 0, y: 22 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 120 } }"
              class="mt-6 font-display text-4xl tracking-tight text-slate-800 sm:text-5xl"
            >
              Une stack choisie pour la clarte et la fiabilite.
            </h2>

            <p
              v-motion
              :initial="{ opacity: 0 }"
              :visible-once="{ opacity: 1, transition: { delay: 220 } }"
              class="mt-6 text-lg leading-relaxed text-slate-600"
            >
              Une base technique solide, mais surtout une recherche constante de coherence entre performance, lisibilite et qualite de finition.
            </p>

            <div class="mt-8 rounded-2xl border border-slate-100 bg-surface-50 p-6 shadow-sm">
              <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Categorie active</p>
              <p class="mt-4 font-display text-3xl tracking-tight text-slate-800">
                {{ activeCategoryData.title }}
              </p>
              <p class="mt-4 text-slate-600">
                {{ activeCategoryData.description }}
              </p>
              <p class="mt-4 border-t border-slate-200/80 pt-4 text-sm leading-relaxed text-slate-500">
                Pas de jauges arbitraires ici : je prefere montrer les outils que j utilise, ceux que je privilegie et le contexte dans lequel ils m aident a livrer proprement.
              </p>
            </div>

            <div class="mt-auto pt-6">
              <div class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Stack privilegiee</p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="tech in preferredStack"
                    :key="tech"
                    class="inline-flex rounded-full border border-slate-200 bg-surface-100 px-3 py-1.5 text-sm text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-slate-900"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex h-full flex-col">
            <div
              v-motion
              :initial="{ opacity: 0, y: 16 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 180 } }"
              class="flex flex-wrap gap-3"
            >
              <button
                v-for="category in categories"
                :key="category.id"
                class="rounded-full border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] shadow-sm transition-all duration-300"
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

            <div class="mt-8 grid flex-1 content-start items-start gap-4 md:grid-cols-2">
              <TransitionGroup name="skill" tag="div" class="contents">
                <div
                  v-for="(skill, index) in filteredSkills"
                  :key="skill.id"
                  v-motion
                  :initial="{ opacity: 0, y: 14 }"
                  :visible-once="{ opacity: 1, y: 0, transition: { delay: 80 * index } }"
                  class="rounded-2xl border p-5 transition-transform hover:-translate-y-1 sm:p-6"
                  :class="
                    isPreferredSkill(skill.name)
                      ? 'skill-card-preferred border-primary-200 shadow-soft'
                      : 'border-slate-100 bg-white shadow-sm hover:shadow-soft'
                  "
                >
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">{{ activeCategoryData.label }}</p>
                      <h3 class="mt-2 font-display text-2xl tracking-tight text-slate-800">
                        {{ skill.name }}
                      </h3>
                    </div>

                    <span
                      v-if="isPreferredSkill(skill.name)"
                      class="skill-focus-chip inline-flex rounded-full border border-primary-200 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-700"
                    >
                      Focus
                    </span>
                  </div>

                  <p class="mt-5 text-sm leading-relaxed text-slate-600">
                    {{ getSkillSummary(skill) }}
                  </p>

                  <div class="mt-5 flex flex-wrap gap-2">
                    <span class="skill-meta-chip inline-flex rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600">
                      {{ skill.category === 'soft' ? 'Qualite de travail' : activeCategoryData.label }}
                    </span>
                    <span
                      v-if="isPreferredSkill(skill.name)"
                      class="skill-preferred-chip inline-flex rounded-full border border-primary-200 px-3 py-1.5 text-xs text-primary-700"
                    >
                      Stack privilegiee
                    </span>
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

.skill-card-preferred {
  background:
    linear-gradient(
      145deg,
      rgb(var(--accent) / 0.16) 0%,
      rgb(var(--surface-alt) / 0.96) 34%,
      rgb(var(--surface) / 0.94) 100%
    );
}

.skill-focus-chip {
  background-color: rgb(var(--surface-strong) / 0.72);
}

.skill-meta-chip {
  background-color: rgb(var(--surface) / 0.76);
}

.skill-preferred-chip {
  background-color: rgb(var(--accent) / 0.16);
}
</style>
