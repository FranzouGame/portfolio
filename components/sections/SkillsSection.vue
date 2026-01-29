<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
  { id: 'frontend', label: 'Frontend', icon: '🎨' },
  { id: 'backend', label: 'Backend', icon: '⚙️' },
  { id: 'tools', label: 'Outils', icon: '🛠️' },
  { id: 'soft', label: 'Soft Skills', icon: '🧠' },
]

const filteredSkills = computed(() => {
  return props.skills?.filter(s => s.category === activeCategory.value) || []
})

const getBarColor = (percentage: number) => {
  if (percentage >= 90) return 'from-neon-cyan to-neon-blue'
  if (percentage >= 75) return 'from-neon-blue to-neon-purple'
  if (percentage >= 60) return 'from-neon-purple to-neon-pink'
  return 'from-white/50 to-white/30'
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 500)
})
</script>

<template>
  <section id="skills" class="relative py-32 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 dot-grid opacity-30" />
    
    <div class="max-w-7xl mx-auto px-6 relative">
      <!-- Section Header -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        class="text-center mb-16"
      >
        <span class="font-mono text-neon-cyan text-sm tracking-widest uppercase">
          Expertise
        </span>
        <h2 class="section-title mt-4">
          Mes <span class="gradient-text">compétences</span>
        </h2>
        <p class="mt-4 text-white/50 max-w-2xl mx-auto">
          Technologies et outils que j'utilise au quotidien pour créer des applications web modernes et performantes.
        </p>
      </div>

      <!-- Category Tabs -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 200 } }"
        class="flex flex-wrap justify-center gap-2 mb-12"
      >
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="px-6 py-3 rounded-xl font-mono text-sm transition-all duration-300"
          :class="[
            activeCategory === cat.id
              ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/50 text-white'
              : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20'
          ]"
          @click="activeCategory = cat.id"
        >
          <span class="mr-2">{{ cat.icon }}</span>
          {{ cat.label }}
        </button>
      </div>

      <!-- Skills Grid -->
      <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <TransitionGroup
          name="skill"
          tag="div"
          class="contents"
        >
          <div
            v-for="(skill, index) in filteredSkills"
            :key="skill.id"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visible-once="{ opacity: 1, x: 0, transition: { delay: 100 * index } }"
            class="glass-card p-6 group hover:border-neon-cyan/30 transition-all duration-300"
          >
            <div class="flex justify-between items-center mb-3">
              <span class="font-display font-semibold text-lg">{{ skill.name }}</span>
              <span class="font-mono text-neon-cyan text-sm">{{ skill.percentage }}%</span>
            </div>
            
            <div class="skill-bar">
              <div 
                class="skill-bar-fill bg-gradient-to-r"
                :class="getBarColor(skill.percentage)"
                :style="{ 
                  width: isVisible ? `${skill.percentage}%` : '0%',
                  transitionDelay: `${index * 100}ms`
                }"
              />
            </div>

            <!-- Skill level indicator -->
            <div class="mt-2 flex justify-between text-xs font-mono text-white/30">
              <span>Débutant</span>
              <span>Expert</span>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Tech Stack Visual -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 600 } }"
        class="mt-20 text-center"
      >
        <h3 class="font-mono text-sm text-white/40 uppercase tracking-widest mb-8">
          Stack technique préféré
        </h3>
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="tech in ['Nuxt.js', 'Vue.js', 'TypeScript', 'Django', 'Python', 'TailwindCSS', 'PostgreSQL', 'Git']"
            :key="tech"
            class="px-6 py-3 glass-card font-mono text-sm hover:border-neon-cyan/30 
                   hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] transition-all cursor-default"
          >
            {{ tech }}
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
  transform: translateX(-20px);
}

.skill-move {
  transition: transform 0.3s ease;
}
</style>
