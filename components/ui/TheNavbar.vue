<script setup lang="ts">
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const { isDark, toggleTheme, initTheme } = useTheme()

const navItems = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets', href: '#projects' },
  { label: 'Parcours', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
]

onMounted(() => {
  initTheme()
  
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      isScrolled
        ? 'bg-dark-950/95 dark:bg-dark-950/95 light:bg-white/95 backdrop-blur-xl py-4'
        : 'bg-transparent py-6'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a href="#hero" class="group flex items-center gap-3">
        <div class="relative w-10 h-10">
          <div class="absolute inset-0 bg-gradient-to-br from-neon-cyan to-neon-blue rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
          <div class="absolute inset-0 flex items-center justify-center font-display font-bold text-dark-950">
            FB
          </div>
        </div>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center gap-1">
        
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="relative px-4 py-2 font-mono text-sm text-white/70 hover:text-white transition-colors group"
        >
          {{ item.label }}
          <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-blue group-hover:w-full transition-all duration-300" />
        </a>
      </div>

      <!-- Theme Toggle Button -->
      <button
        @click="toggleTheme"
        class="hidden lg:flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all group"
        :title="isDark ? 'Mode clair' : 'Mode sombre'"
      >
        <!-- Sun icon (shown in dark mode) -->
        <svg
          v-if="isDark"
          class="w-5 h-5 text-white/70 group-hover:text-neon-cyan transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <!-- Moon icon (shown in light mode) -->
        <svg
          v-else
          class="w-5 h-5 text-dark-950 group-hover:text-neon-blue transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>

      <!-- Mobile Menu Button -->
      <button
        class="lg:hidden relative w-10 h-10 flex items-center justify-center"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Menu"
      >
        <div class="relative w-6 h-5">
          <span
            class="absolute left-0 w-full h-0.5 bg-white transition-all duration-300"
            :class="isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'"
          />
          <span
            class="absolute left-0 top-2 w-full h-0.5 bg-white transition-all duration-300"
            :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
          />
          <span
            class="absolute left-0 w-full h-0.5 bg-white transition-all duration-300"
            :class="isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'"
          />
        </div>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden absolute top-full left-0 right-0 bg-dark-950/98 backdrop-blur-xl border-t border-white/10"
      >
        <div class="max-w-7xl mx-auto px-6 py-6 space-y-4">
          
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="block font-mono text-lg text-white/70 hover:text-neon-cyan transition-colors"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </a>
          
          <!-- Mobile Theme Toggle -->
          <button
            @click="toggleTheme"
            class="flex items-center gap-3 font-mono text-lg text-white/70 hover:text-neon-cyan transition-colors"
          >
            <svg
              v-if="isDark"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            {{ isDark ? 'Mode clair' : 'Mode sombre' }}
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>