<script setup lang="ts">
const props = defineProps<{
  profile: {
    name: string
    title: string
    subtitle?: string
    bio: string
  } | null
}>()

const scrollToProjects = () => {
  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContact = () => {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section 
    id="hero" 
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- 3D Background -->
  <ClientOnly>
    <LazyThreeParticleField />
  </ClientOnly>

    <!-- Gradient Overlays -->
    <div 
      class="absolute inset-0 bg-gradient-to-b from-dark-950/50 via-transparent to-dark-950 
             pointer-events-none"
    />
    <div 
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent 
             pointer-events-none"
    />

    <!-- Content -->
    <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <!-- Greeting -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 200 } }"
        class="inline-flex items-center gap-2 px-4 py-2 mb-4 mt-12 rounded-full 
               bg-white/5 border border-white/10 backdrop-blur-sm"
      >
        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span class="font-mono text-sm text-white/70">Disponible pour une alternance</span>
      </div>

      <!-- Name -->
      <h1
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 400 } }"
        class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
      >
        <span class="text-white">{{ profile?.name?.split(' ')[0] || 'François' }}</span>
        <br>
        <span class="gradient-text-animated">
          {{ profile?.name?.split(' ')[1] || 'Barlic' }}
        </span>
      </h1>

      <!-- Title -->
      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 600 } }"
        class="text-xl sm:text-2xl md:text-3xl font-mono text-white/60 mb-4"
      >
        {{ profile?.title || 'Développeur Fullstack' }}
      </p>

      <!-- Subtitle with typing effect style -->
      <p
        v-motion
        :initial="{ opacity: 0 }"
        :visible-once="{ opacity: 1, transition: { delay: 800 } }"
        class="text-lg text-white/40 font-mono mb-12"
      >
        <span class="text-neon-cyan">&lt;</span>
        {{ profile?.subtitle || 'Nuxt.js • Django • Vue.js' }}
        <span class="text-neon-cyan">/&gt;</span>
      </p>

      <!-- CTA Buttons -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 1000 } }"
        class="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button 
          class="btn-primary"
          @click="scrollToProjects"
        >
          <span class="relative z-10">Voir mes projets</span>
        </button>
        <button 
          class="btn-secondary"
          @click="scrollToContact"
        >
          Me contacter
        </button>
      </div>

      <!-- Tech Stack Icons -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visible-once="{ opacity: 1, transition: { delay: 1200 } }"
        class="mt-16 flex items-center justify-center gap-8 opacity-40"
      >
        <div 
          v-for="tech in ['Nuxt', 'Vue', 'Django', 'TypeScript', 'Python']"
          :key="tech"
          class="font-mono text-xs tracking-wider uppercase"
        >
          {{ tech }}
        </div>
      </div>
    </div>


  </section>
</template>
