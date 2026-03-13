<script setup lang="ts">
const props = defineProps<{
  profile: {
    name: string
    title: string
    subtitle?: string
    bio: string
    location?: string
  } | null
}>()

const { isDark } = useTheme()

const nameParts = computed(() => {
  const fullName = props.profile?.name || 'François Barlic'
  const [firstName, ...rest] = fullName.split(' ')

  return {
    firstName,
    lastName: rest.join(' ') || 'Barlic',
  }
})

const scrollToSection = (selector: string) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="hero"
    class="relative flex min-h-screen scroll-mt-24 flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8"
  >
    <div class="pointer-events-none absolute inset-x-0 top-0 h-[40rem] hero-halo opacity-50" />

    <!-- Japanese decorative elements -->
    <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <!-- Ensō circle – top right -->
      <UiDecoEnso :size="280" class="absolute -right-16 -top-10 text-primary-400 opacity-40" />
      <!-- Seigaiha waves – bottom left -->
      <UiDecoSeigaiha class="absolute -bottom-2 -left-6 text-primary-500 rotate-3 scale-110" />
      <!-- Asanoha star – bottom right subtle -->
      <UiDecoAsanoha :size="100" class="absolute bottom-24 right-12 text-primary-300 opacity-60 animate-spin-slow" />
    </div>

    <!-- 3D Canvas Background Area -->
    <div class="absolute inset-0 z-0 flex items-center justify-center opacity-60">
      <div class="hero-halo relative h-[80vh] w-[80vw] max-w-5xl rounded-full opacity-60 blur-3xl" />
      <div class="absolute inset-0">
        <ClientOnly>
          <LazyThreeParticleField />
        </ClientOnly>
      </div>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-5xl text-center">
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 100 } }"
        class="eyebrow-chip text-primary-700"
      >
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
        </span>
        <span>Disponible pour une alternance</span>
      </div>

      <h1
        v-motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :visible-once="{ opacity: 1, scale: 1, transition: { delay: 300, duration: 800, type: 'spring' } }"
        class="mt-8 font-display text-[clamp(4rem,12vw,9rem)] leading-[0.85] tracking-tight text-slate-800"
        :class="{ 'mix-blend-multiply': !isDark }"
      >
        <span class="block">{{ nameParts.firstName }}</span>
        <span class="text-primary-600 block">{{ nameParts.lastName }}</span>
      </h1>

      <p
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 500 } }"
        class="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-slate-600 sm:text-xl"
      >
        {{ profile?.subtitle || 'Minimalisme, clarté et précision technique.' }}
      </p>

      <div
        v-motion
        :initial="{ opacity: 0, y: 18 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 700 } }"
        class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <button class="btn-primary w-full sm:w-auto" @click="scrollToSection('#projects')">
          <span>Voir mes projets</span>
        </button>
        <button class="btn-secondary w-full sm:w-auto" @click="scrollToSection('#contact')">
          <span>Me contacter</span>
        </button>
      </div>

      <div class="mt-24 flex items-center justify-center gap-4">
        <span class="h-px w-12 bg-slate-200" />
        <span class="font-mono text-[10px] uppercase tracking-[0.36em] text-slate-400">
          Portfolio 2026
        </span>
        <span class="h-px w-12 bg-slate-200" />
      </div>
    </div>
  </section>
</template>
