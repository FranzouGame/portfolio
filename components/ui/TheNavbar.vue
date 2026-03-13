<script setup lang="ts">
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const { isDark, toggleTheme } = useTheme()

const navItems = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets', href: '#projects' },
  { label: 'Parcours', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 24
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div
        class="rounded-[32px] border px-4 py-3 transition-all duration-500 sm:px-5"
        :class="
          isScrolled
            ? 'border-white/40 bg-white/70 shadow-soft backdrop-blur-2xl'
            : 'border-transparent bg-transparent shadow-none backdrop-blur-sm'
        "
      >
        <div class="flex items-center justify-between gap-4">
          <a href="#hero" class="group flex min-w-0 items-center gap-3 sm:gap-4" @click="closeMobileMenu">
            <span class="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-700 sm:h-12 sm:w-12 text-lg sm:text-xl font-display font-bold shadow-sm transition-transform group-hover:scale-105">
              FB
            </span>
            <span class="min-w-0">
              <span class="block truncate font-display text-[1.35rem] tracking-tight text-slate-800 sm:text-[1.55rem] group-hover:text-primary-600 transition-colors">
                François Barlic
              </span>
              <span class="mt-1 block font-mono text-[10px] uppercase tracking-[0.34em] text-slate-500 transition-colors group-hover:text-primary-500">
                portfolio / full-stack
              </span>
            </span>
          </a>

          <div class="hidden items-center gap-1 xl:gap-2 lg:flex">
            <a
              v-for="item in navItems"
              :key="item.href"
              :href="item.href"
              class="relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-600 transition-all duration-300 hover:text-primary-600 hover:bg-primary-50"
            >
              {{ item.label }}
            </a>
          </div>

          <div class="flex items-center gap-2 sm:gap-3">
            <button
              class="group hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 shadow-soft backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 lg:flex"
              :title="isDark ? 'Mode clair' : 'Mode sombre'"
              @click="toggleTheme"
            >
              <svg
                v-if="isDark"
                class="h-5 w-5 text-slate-500 transition-colors group-hover:text-primary-600"
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
                class="h-5 w-5 text-slate-500 transition-colors group-hover:text-primary-600"
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

            <button
              class="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 shadow-soft backdrop-blur-xl lg:hidden"
              :aria-expanded="isMobileMenuOpen"
              aria-label="Menu"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <div class="relative h-5 w-6">
                <span
                  class="absolute left-0 h-0.5 w-full rounded-full bg-slate-800 transition-all duration-300"
                  :class="isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'"
                />
                <span
                  class="absolute left-0 top-2 h-0.5 w-full rounded-full bg-slate-800 transition-all duration-300"
                  :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
                />
                <span
                  class="absolute left-0 h-0.5 w-full rounded-full bg-slate-800 transition-all duration-300"
                  :class="isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'"
                />
              </div>
            </button>
          </div>
        </div>

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <div v-if="isMobileMenuOpen" class="mt-4 lg:hidden">
            <div class="space-y-2 rounded-[28px] border border-white/60 bg-white/80 p-3 shadow-soft backdrop-blur-2xl">
              <a
                v-for="(item, index) in navItems"
                :key="item.href"
                :href="item.href"
                class="flex items-center justify-between rounded-xl px-4 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-700 transition-all hover:bg-primary-50 hover:text-primary-700"
                @click="closeMobileMenu"
              >
                <span>{{ item.label }}</span>
                <span class="text-primary-400">{{ String(index + 1).padStart(2, '0') }}</span>
              </a>

              <button
                class="mt-2 flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-700 transition-all hover:bg-primary-50 hover:text-primary-700"
                @click="toggleTheme"
              >
                <span>{{ isDark ? 'Mode clair' : 'Mode sombre' }}</span>
                <span class="text-primary-400">{{ isDark ? 'Light' : 'Dark' }}</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </nav>
</template>
