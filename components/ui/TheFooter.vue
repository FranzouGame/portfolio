<script setup lang="ts">
const currentYear = new Date().getFullYear()

const quickLinks = [
  { name: 'Accueil', href: '#hero' },
  { name: 'À propos', href: '#about' },
  { name: 'Projets', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="relative py-12 border-t border-white/5">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent" />

    <div class="max-w-7xl mx-auto px-6 relative">
      <div class="grid md:grid-cols-3 gap-8 items-center">
        <!-- Logo & Copyright -->
        <div>
          <a 
            href="#hero"
            class="inline-flex items-center gap-3 mb-4"
            @click.prevent="scrollToSection('#hero')"
          >
            <div class="relative w-10 h-10">
              <div class="absolute inset-0 bg-gradient-to-br from-neon-cyan to-neon-blue rounded-lg opacity-80" />
              <div class="absolute inset-0 flex items-center justify-center font-display font-bold text-dark-950">
                FB
              </div>
            </div>
            <span class="font-display font-semibold text-lg">
              <span class="text-white">François</span>
              <span class="text-neon-cyan">.dev</span>
            </span>
          </a>
          <p class="text-white/40 text-sm">
            © {{ currentYear }} François Barlic. Tous droits réservés.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="flex justify-center">
          <nav class="flex flex-wrap justify-center gap-6">
            <a
              v-for="link in quickLinks"
              :key="link.href"
              :href="link.href"
              class="font-mono text-sm text-white/50 hover:text-neon-cyan transition-colors"
              @click.prevent="scrollToSection(link.href)"
            >
              {{ link.name }}
            </a>
          </nav>
        </div>

        <!-- Social & Back to Top -->
        <div class="flex items-center justify-end gap-4">
          <!-- Social Links -->
          <a
            href="https://github.com/FranzouGame"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center 
                   hover:bg-neon-cyan/10 hover:text-neon-cyan transition-all"
            title="GitHub"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          <!-- Back to Top -->
          <button
            class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center 
                   hover:bg-neon-cyan/10 hover:text-neon-cyan transition-all group"
            title="Retour en haut"
            @click="scrollToSection('#hero')"
          >
            <svg 
              class="w-5 h-5 transform group-hover:-translate-y-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Made with love -->
      <div class="mt-8 pt-8 border-t border-white/5 text-center">
        <p class="font-mono text-xs text-white/30">
          Fait avec 
          <span class="text-red-500">♥</span> 
          et 
          <span class="text-neon-cyan">Nuxt.js</span>
        </p>
      </div>
    </div>
  </footer>
</template>
