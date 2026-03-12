<script setup lang="ts">
const sections = [
  { id: 'hero', label: 'Accueil', index: '01' },
  { id: 'about', label: 'À propos', index: '02' },
  { id: 'skills', label: 'Compétences', index: '03' },
  { id: 'projects', label: 'Projets', index: '04' },
  { id: 'timeline', label: 'Parcours', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
]

const activeSection = ref(sections[0])
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)

      const currentEntry = visibleEntries[0]
      if (!currentEntry) return

      const currentSection = sections.find(section => section.id === currentEntry.target.id)
      if (currentSection) {
        activeSection.value = currentSection
      }
    },
    {
      rootMargin: '-42% 0px -42% 0px',
      threshold: [0.2, 0.35, 0.5, 0.7],
    },
  )

  sections.forEach(section => {
    const element = document.getElementById(section.id)
    if (element) observer?.observe(element)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 2xl:flex">
    <div class="flex items-center gap-4 rounded-full border border-slate-200 bg-white/80 px-3 py-6 backdrop-blur-xl shadow-soft">
      <div class="flex flex-col items-center gap-3">
        <span class="h-16 w-px bg-slate-200" />
        <span class="h-2.5 w-2.5 rounded-full bg-primary-400 shadow-[0_0_12px_rgba(108,161,206,0.5)]" />
        <span class="h-16 w-px bg-slate-200" />
      </div>

      <div class="flex items-center gap-4">
        <span class="font-mono text-[10px] uppercase tracking-[0.32em] text-primary-500">
          {{ activeSection.index }}
        </span>
        <span class="writing-vertical font-mono text-[10px] uppercase tracking-[0.38em] text-slate-400">
          {{ activeSection.label }}
        </span>
      </div>
    </div>
  </div>
</template>
