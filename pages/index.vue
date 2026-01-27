<script setup lang="ts">
// Fetch all data
const { data: profile } = await useFetch('/api/profile')
const { data: skills } = await useFetch('/api/skills')
const { data: projects } = await useFetch('/api/projects')
const { data: experiences } = await useFetch('/api/experiences')
const { data: education } = await useFetch('/api/education')

// SEO
useSeoMeta({
  title: 'François Barlic | Développeur Fullstack',
  ogTitle: 'François Barlic | Développeur Fullstack',
  description: 'Portfolio de François Barlic - Développeur Fullstack passionné par Nuxt.js, Django et les technologies web modernes.',
  ogDescription: 'Portfolio de François Barlic - Développeur Fullstack passionné par Nuxt.js, Django et les technologies web modernes.',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Navigation -->
    <UiTheNavbar />

    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <SectionsHeroSection :profile="profile" />

      <!-- About Section -->
      <SectionsAboutSection :profile="profile" />

      <!-- Skills Section -->
      <SectionsSkillsSection :skills="skills || []" />

      <!-- Projects Section -->
      <SectionsProjectsSection :projects="projects || []" />

      <!-- Timeline Section -->
      <SectionsTimelineSection 
        :experiences="experiences || []" 
        :education="education || []" 
      />

      <!-- Contact Section -->
      <SectionsContactSection :profile="profile" />
    </main>

    <!-- Footer -->
    <UiTheFooter />
  </div>
</template>
