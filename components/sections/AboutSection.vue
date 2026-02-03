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
    icon: '🎓',
    label: 'Formation',
    value: 'BUT Informatique',
    detail: 'IUT Bayonne'
  },
  {
    icon: '💼',
    label: 'Expérience',
    value: 'Alternant',
    detail: 'Optera'
  },
  {
    icon: '📍',
    label: 'Localisation',
    value: 'Pays Basque',
    detail: 'France'
  },
  {
    icon: '🚗',
    label: 'Mobilité',
    value: 'Permis B',
    detail: 'Véhiculé'
  },
]
</script>

<template>
  <section id="about" class="relative py-32 overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />

    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div v-motion :initial="{ opacity: 0, y: 30 }" :visible-once="{ opacity: 1, y: 0 }" class="text-center mb-20">
        <span class="font-mono text-neon-cyan text-sm tracking-widest uppercase">
          À propos
        </span>
        <h2 class="section-title mt-4">
          Qui suis-je<span class="text-neon-cyan">?</span>
        </h2>
      </div>

      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Image/Visual -->
        <div v-motion :initial="{ opacity: 0, x: -50 }" :visible-once="{ opacity: 1, x: 0, transition: { delay: 200 } }"
          class="relative">
          <!-- Main Image Container -->
          <div class="relative aspect-square max-w-md mx-auto">
            <!-- Decorative Frame -->
            <div class="absolute -inset-4 border border-neon-cyan/20 rounded-2xl 
                     transform rotate-3" />
            <div class="absolute -inset-4 border border-neon-purple/20 rounded-2xl 
                     transform -rotate-3" />

            <!-- Image Placeholder / Avatar -->
            <div class="relative w-full h-full rounded-2xl overflow-hidden 
                     bg-gradient-to-br from-dark-800 to-dark-900">
              <!-- Placeholder with initials -->
              <div class="absolute inset-0 flex items-center justify-center 
                       text-8xl font-display font-bold gradient-text opacity-20">
                FB
              </div>

              <!-- Code decoration -->
              <div class="absolute inset-0 p-8 font-mono text-xs text-white/20 overflow-hidden">
                <pre class="leading-relaxed">
const developer = {
  name: "François Barlic",
  role: "Fullstack Developer",
  stack: ["Nuxt.js", "Django"],
  passion: "Web Development",
  location: "Pays Basque 🏄",
  
  skills: {
    frontend: ["Vue", "Nuxt", "TS"],
    backend: ["Django", "Python"],
    tools: ["Git", "Scrum"]
  },
  
  currentlyLearning: [
    "Three.js",
    "Advanced TypeScript"
  ]
};
                </pre>
              </div>

              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent 
                       to-transparent" />
            </div>

            <!-- Floating badges -->
            <div class="absolute -right-4 top-8 glass-card px-4 py-2 animate-float" style="animation-delay: 0s;">
              <span class="font-mono text-sm text-neon-cyan">Nuxt.js</span>
            </div>
            <div class="absolute -left-4 bottom-24 glass-card px-4 py-2 animate-float" style="animation-delay: 1s;">
              <span class="font-mono text-sm text-neon-purple">Django</span>
            </div>
            <div class="absolute right-8 -bottom-4 glass-card px-4 py-2 animate-float" style="animation-delay: 2s;">
              <span class="font-mono text-sm text-neon-blue">Vue.js</span>
            </div>
          </div>
        </div>

        <!-- Right: Content -->
        <div v-motion :initial="{ opacity: 0, x: 50 }" :visible-once="{ opacity: 1, x: 0, transition: { delay: 400 } }">
          <h3 class="text-3xl font-display font-bold mb-6">
            Développeur passionné par le
            <span class="gradient-text">web moderne</span>
          </h3>

          <p class="text-white/60 text-lg leading-relaxed mb-8">
            {{ profile?.bio || `Étudiant en informatique et alternant chez Optera, je développe
            des applications web avec les technologies modernes. Ma passion pour le code
            me pousse à toujours apprendre et à créer des solutions élégantes et performantes.` }}
          </p>

          <!-- Highlights Grid -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div v-for="(item, index) in highlights" :key="item.label" v-motion :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 500 + index * 100 } }"
              class="glass-card p-4 group hover:border-neon-cyan/30 transition-colors">
              <div class="text-2xl mb-2">{{ item.icon }}</div>
              <div class="font-mono text-xs text-white/40 uppercase tracking-wider">
                {{ item.label }}
              </div>
              <div class="font-display font-semibold text-white">
                {{ item.value }}
              </div>
              <div class="font-mono text-xs text-neon-cyan">
                {{ item.detail }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 text-center">
        <a href="/CV_BARLIC_Francois.pdf" download="CV_BARLIC_Francois.pdf" class="btn-primary inline-block">
          <span class="relative z-10">Télécharger mon CV</span>
        </a>
      </div>
    </div>
  </section>
</template>
