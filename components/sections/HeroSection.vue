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
    <div class="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(ellipse_at_top,rgba(225,235,244,0.4),transparent_60%)]" />

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
    <div class="absolute inset-0 z-0 flex items-center justify-center opacity-70">
      <div class="relative h-[80vh] w-[80vw] max-w-5xl rounded-full opacity-60 blur-3xl bg-primary-100" />
      <div class="absolute inset-0">
        <ClientOnly>
          <!-- Keep the component for now, it will be replaced by the Enso/Torii later -->
          <LazyThreeParticleField />
        </ClientOnly>
      </div>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-5xl text-center">
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 100 } }"
        class="inline-flex items-center gap-2.5 rounded-full border border-primary-200 bg-white/80 backdrop-blur-md px-4 py-2 text-[13px] font-medium text-primary-700 shadow-sm"
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
        class="mt-8 font-display text-[clamp(4rem,12vw,9rem)] leading-[0.85] tracking-tight text-slate-800 mix-blend-multiply"
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
        <button class="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-primary-600 px-8 font-medium text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-500 hover:shadow-hover focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2" @click="scrollToSection('#projects')">
          <span>Voir mes projets</span>
        </button>
        <button class="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-8 font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2" @click="scrollToSection('#contact')">
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
