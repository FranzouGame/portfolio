<script setup lang="ts">
const { data: profile } = await useFetch('/api/profile')
const { data: skills } = await useFetch('/api/skills')
const { data: projects } = await useFetch('/api/projects')
const { data: experiences } = await useFetch('/api/experiences')
const { data: education } = await useFetch('/api/education')

useSeoMeta({
  title: 'François Barlic | Développeur Fullstack',
  ogTitle: 'François Barlic | Développeur Fullstack',
  description: 'Portfolio de François Barlic, développeur fullstack passionné par Nuxt.js, Django et les expériences web soignées.',
  ogDescription: 'Portfolio de François Barlic, développeur fullstack passionné par Nuxt.js, Django et les expériences web soignées.',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="bg-surface-50 text-slate-900 relative min-h-screen overflow-hidden font-sans transition-colors duration-500">
    <!-- Light Mesh Gradient Background for Japanese Minimalist Aesthetic -->
    <div class="pointer-events-none absolute inset-0 z-0 bg-mesh-light opacity-50" />

    <UiTheNavbar />
    <UiSectionRail />

    <main class="relative z-10">
      <SectionsHeroSection :profile="profile" />
      <UiDecoSectionDivider variant="wave" />
      <SectionsAboutSection :profile="profile" />
      <UiDecoSectionDivider variant="dot" />
      <SectionsSkillsSection :skills="skills || []" />
      <UiDecoSectionDivider variant="line" />
      <SectionsProjectsSection :projects="projects || []" />
      <UiDecoSectionDivider variant="wave" />
      <SectionsTimelineSection
        :experiences="experiences || []"
        :education="education || []"
      />
      <UiDecoSectionDivider variant="dot" />
      <SectionsContactSection :profile="profile" />
    </main>

    <UiTheFooter />
  </div>
</template>
