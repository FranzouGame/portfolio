<script setup lang="ts">
const props = defineProps<{
  profile: {
    name: string
    bio: string
    location?: string
    email: string
    phone?: string
  } | null
}>()

const highlights = [
  {
    marker: '01',
    label: 'Formation',
    value: 'BUT Informatique',
    detail: 'IUT de Bayonne',
  },
  {
    marker: '02',
    label: 'Expérience',
    value: 'Alternance',
    detail: 'Optera',
  },
  {
    marker: '03',
    label: 'Territoire',
    value: 'Pays Basque',
    detail: 'France',
  },
  {
    marker: '04',
    label: 'Priorité',
    value: 'Finition UI',
    detail: 'clair, propre, durable',
  },
]

const principles = [
  {
    label: 'Clarté',
    description: 'Des interfaces lisibles, calmes et immédiatement compréhensibles.',
  },
  {
    label: 'Rythme',
    description: 'Des espacements précis, une hiérarchie nette et des transitions discrètes.',
  },
  {
    label: 'Fiabilité',
    description: 'Une implémentation maintenable, responsive et cohérente dans le détail.',
  },
]

const engagement = {
  label: 'Engagement',
  quote: 'Concevoir peu, mais juste: une interface nette, des interactions cohérentes et une qualité d’exécution visible dans chaque détail.',
  signature: 'Clarté, rythme, finition.',
}
</script>

<template>
  <section id="about" class="relative scroll-mt-28 py-24 sm:py-28">
    <!-- Japanese decorative elements -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <UiDecoTwig class="absolute -left-2 top-20 text-primary-400" />
      <UiDecoAsanoha :size="60" class="absolute right-8 top-12 text-primary-300 opacity-50" />
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="section-shell px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div class="grid gap-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(320px,0.94fr)] lg:items-start">
          <div class="flex flex-col h-full">
            <span
              v-motion
              :initial="{ opacity: 0, y: 16 }"
              :visible-once="{ opacity: 1, y: 0 }"
              class="font-mono text-sm uppercase tracking-[0.24em] text-primary-500 font-semibold"
            >
              Profil
            </span>

            <h2
              v-motion
              :initial="{ opacity: 0, y: 22 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 120 } }"
              class="mt-6 font-display text-4xl tracking-tight text-slate-800 sm:text-5xl max-w-3xl"
            >
              Une manière calme et précise de concevoir le web.
            </h2>

            <p
              v-motion
              :initial="{ opacity: 0 }"
              :visible-once="{ opacity: 1, transition: { delay: 220 } }"
              class="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600"
            >
              {{
                profile?.bio ||
                  "Étudiant en informatique et alternant chez Optera, je conçois des applications web modernes avec une attention particulière portée au rythme, à la lisibilité et à l'expérience d'usage."
              }}
            </p>

            <div class="mt-10 grid gap-4 sm:grid-cols-2">
              <div
                v-for="(item, index) in highlights"
                :key="item.label"
                v-motion
                :initial="{ opacity: 0, y: 16 }"
                :visible-once="{ opacity: 1, y: 0, transition: { delay: 280 + index * 80 } }"
                class="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-soft"
              >
                <div class="flex items-center justify-between gap-3">
                  <span class="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-500">
                    {{ item.marker }}
                  </span>
                  <span class="h-px flex-1 bg-slate-100" />
                </div>
                <p class="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-400">
                  {{ item.label }}
                </p>
                <p class="mt-2 font-display text-2xl tracking-tight text-slate-800">
                  {{ item.value }}
                </p>
                <p class="mt-2 text-sm text-slate-500">
                  {{ item.detail }}
                </p>
              </div>
            </div>

            <div class="mt-auto pt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/CV_BARLIC_Francois.pdf"
                download="CV_BARLIC_Francois.pdf"
                class="btn-primary"
              >
                <span class="relative z-10">Télécharger mon CV</span>
              </a>
              <a
                :href="`mailto:${profile?.email || 'francois.barlic57@gmail.com'}`"
                class="btn-secondary"
              >
                <span>Échanger par email</span>
              </a>
            </div>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: 24 }"
            :visible-once="{ opacity: 1, x: 0, transition: { delay: 200 } }"
            class="flex h-full flex-col rounded-[28px] border border-slate-100 bg-white p-6 sm:p-8 shadow-soft"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="max-w-sm">
                <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Atelier</p>
                <p class="mt-4 font-display text-4xl tracking-tight text-slate-800">
                  Frontend soigné, backend solide, système cohérent.
                </p>
              </div>
              <span class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-700 font-display font-bold shadow-sm hidden sm:inline-flex">FB</span>
            </div>

            <div class="mt-8 grid gap-4">
              <div
                v-for="principle in principles"
                :key="principle.label"
                class="rounded-xl border border-slate-100 bg-surface-50 p-5 shadow-sm"
              >
                <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">{{ principle.label }}</p>
                <p class="mt-3 text-slate-600">
                  {{ principle.description }}
                </p>
              </div>
            </div>

            <div class="mt-auto pt-8 grid gap-4 sm:grid-cols-2">
              <div class="floating-note p-5">
                <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">{{ engagement.label }}</p>
                <blockquote class="mt-4 font-display text-2xl tracking-tight text-slate-800">
                  “{{ engagement.quote }}”
                </blockquote>
                <p class="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-400">
                  {{ engagement.signature }}
                </p>
              </div>

              <div class="rounded-xl border border-slate-100 bg-surface-50 p-5 shadow-sm">
                <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Base</p>
                <p class="mt-3 font-display text-3xl tracking-tight text-slate-800">
                  {{ profile?.location || 'Anglet - 64' }}
                </p>
                <p class="mt-3 text-slate-500 text-sm">
                  Un ancrage local, une exigence sur la qualité de réalisation et une envie de construire des produits utiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
