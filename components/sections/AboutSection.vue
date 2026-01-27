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
      <div 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        class="text-center mb-20"
      >
        <span class="font-mono text-neon-cyan text-sm tracking-widest uppercase">
          À propos
        </span>
        <h2 class="section-title mt-4">
          Qui suis-je<span class="text-neon-cyan">?</span>
        </h2>
      </div>

      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Image/Visual -->
        <div
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :visible-once="{ opacity: 1, x: 0, transition: { delay: 200 } }"
          class="relative"
        >
          <!-- Main Image Container -->
          <div class="relative aspect-square max-w-md mx-auto">
            <!-- Decorative Frame -->
            <div 
              class="absolute -inset-4 border border-neon-cyan/20 rounded-2xl 
                     transform rotate-3"
            />
            <div 
              class="absolute -inset-4 border border-neon-purple/20 rounded-2xl 
                     transform -rotate-3"
            />
            
            <!-- Image Placeholder / Avatar -->
            <div 
              class="relative w-full h-full rounded-2xl overflow-hidden 
                     bg-gradient-to-br from-dark-800 to-dark-900"
            >
              <!-- Placeholder with initials -->
              <div 
                class="absolute inset-0 flex items-center justify-center 
                       text-8xl font-display font-bold gradient-text opacity-20"
              >
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
              <div 
                class="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent 
                       to-transparent"
              />
            </div>

            <!-- Floating badges -->
            <div 
              class="absolute -right-4 top-8 glass-card px-4 py-2 animate-float"
              style="animation-delay: 0s;"
            >
              <span class="font-mono text-sm text-neon-cyan">Nuxt.js</span>
            </div>
            <div 
              class="absolute -left-4 bottom-24 glass-card px-4 py-2 animate-float"
              style="animation-delay: 1s;"
            >
              <span class="font-mono text-sm text-neon-purple">Django</span>
            </div>
            <div 
              class="absolute right-8 -bottom-4 glass-card px-4 py-2 animate-float"
              style="animation-delay: 2s;"
            >
              <span class="font-mono text-sm text-neon-blue">Vue.js</span>
            </div>
          </div>
        </div>

        <!-- Right: Content -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :visible-once="{ opacity: 1, x: 0, transition: { delay: 400 } }"
        >
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
            <div
              v-for="(item, index) in highlights"
              :key="item.label"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 500 + index * 100 } }"
              class="glass-card p-4 group hover:border-neon-cyan/30 transition-colors"
            >
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

          <!-- Contact Quick Links -->
          <div class="flex flex-wrap gap-4">
            <a 
              :href="`mailto:${profile?.email || 'francois.barlic57@gmail.com'}`"
              class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg 
                     border border-white/10 hover:border-neon-cyan/30 transition-colors 
                     font-mono text-sm"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ profile?.email || 'francois.barlic57@gmail.com' }}
            </a>
            <a 
              href="https://github.com/FranzouGame"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg 
                     border border-white/10 hover:border-neon-cyan/30 transition-colors 
                     font-mono text-sm"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
