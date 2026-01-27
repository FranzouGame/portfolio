<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Accueil', href: '#hero' },
  { name: 'À propos', href: '#about' },
  { name: 'Compétences', href: '#skills' },
  { name: 'Projets', href: '#projects' },
  { name: 'Parcours', href: '#timeline' },
  { name: 'Contact', href: '#contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToSection = (href: string) => {
  isMobileMenuOpen.value = false
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      isScrolled 
        ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/5 py-4' 
        : 'bg-transparent py-6'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a 
        href="#hero"
        class="group flex items-center gap-3"
        @click.prevent="scrollToSection('#hero')"
      >
        <div class="relative w-10 h-10">
          <div 
            class="absolute inset-0 bg-gradient-to-br from-neon-cyan to-neon-blue rounded-lg 
                   opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div 
            class="absolute inset-0 flex items-center justify-center font-display font-bold text-dark-950"
          >
            FB
          </div>
        </div>
        <span class="hidden sm:block font-display font-semibold text-lg">
          <span class="text-white">François</span>
          <span class="text-neon-cyan">.dev</span>
        </span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center gap-1">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="relative px-4 py-2 font-mono text-sm text-white/70 hover:text-white 
                 transition-colors group"
          @click.prevent="scrollToSection(link.href)"
        >
          {{ link.name }}
          <span 
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
                   bg-gradient-to-r from-neon-cyan to-neon-blue 
                   group-hover:w-full transition-all duration-300"
          />
        </a>
      </div>

      <!-- CTA Button Desktop -->
      <a
        href="#contact"
        class="hidden lg:flex btn-primary"
        @click.prevent="scrollToSection('#contact')"
      >
        Me contacter
      </a>

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
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden absolute top-full left-0 right-0 bg-dark-950/95 backdrop-blur-xl 
               border-b border-white/5"
      >
        <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-2">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="px-4 py-3 font-mono text-white/70 hover:text-white hover:bg-white/5 
                   rounded-lg transition-all"
            @click.prevent="scrollToSection(link.href)"
          >
            {{ link.name }}
          </a>
          <a
            href="#contact"
            class="mt-4 btn-primary text-center"
            @click.prevent="scrollToSection('#contact')"
          >
            Me contacter
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>
