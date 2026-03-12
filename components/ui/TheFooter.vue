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
  <footer class="relative pb-10 pt-4 sm:pt-6">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="rounded-[32px] border border-slate-200 bg-white shadow-soft px-6 py-7 sm:px-8 sm:py-8">
        <div class="grid gap-8 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <div>
            <a
              href="#hero"
              class="inline-flex items-center gap-4 group"
              @click.prevent="scrollToSection('#hero')"
            >
              <span class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-700 sm:h-14 sm:w-14 text-lg sm:text-xl font-display font-bold shadow-sm transition-transform group-hover:scale-105">FB</span>
              <span>
                <span class="block font-display text-2xl tracking-tight text-slate-800 sm:text-3xl group-hover:text-primary-600 transition-colors">
                  François Barlic
                </span>
                <span class="mt-1 block font-mono text-[10px] uppercase tracking-[0.34em] text-slate-500 group-hover:text-primary-500 transition-colors">
                  interfaces claires, web moderne
                </span>
              </span>
            </a>
          </div>

          <nav class="flex flex-wrap gap-4 sm:gap-6 lg:justify-center">
            <a
              v-for="link in quickLinks"
              :key="link.href"
              :href="link.href"
              class="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500 transition-colors hover:text-primary-600"
              @click.prevent="scrollToSection(link.href)"
            >
              {{ link.name }}
            </a>
          </nav>

          <div class="flex items-center gap-3 lg:justify-end">
            <a
              href="https://github.com/FranzouGame"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 text-slate-500 shadow-sm"
              title="GitHub"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.801 8.207 11.388.6.111.793-.261.793-.578v-2.233c-3.338.725-4.034-1.416-4.034-1.416-.545-1.387-1.332-1.756-1.332-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.808 1.304 3.493.997.107-.775.418-1.305.762-1.604-2.665-.304-5.467-1.334-5.467-5.93 0-1.312.469-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.302 1.23A11.5 11.5 0 0112 6.844c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.768.84 1.234 1.91 1.234 3.222 0 4.608-2.806 5.625-5.479 5.921.431.372.823 1.102.823 2.222v3.293c0 .319.192.69.802.576C20.565 21.798 24 17.302 24 12 24 5.373 18.627 0 12 0z" />
              </svg>
            </a>

            <button
              class="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 text-slate-500 shadow-sm"
              title="Retour en haut"
              @click="scrollToSection('#hero')"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>

        <div class="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {{ currentYear }} François Barlic. Tous droits réservés.</p>
          <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-primary-400">
            blanc, bleu pastel, minimalisme japonais contemporain
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
