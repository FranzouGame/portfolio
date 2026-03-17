<script setup lang="ts">
import type {
  EducationData,
  ExperienceData,
  ProfileData,
  ProjectData,
  SkillData,
} from '~/types/api'

const { data: profile } = await useFetch<ProfileData | null>('/api/profile')
const { data: skills } = await useFetch<SkillData[]>('/api/skills')
const { data: projects } = await useFetch<ProjectData[]>('/api/projects')
const { data: experiences } = await useFetch<ExperienceData[]>('/api/experiences')
const { data: education } = await useFetch<EducationData[]>('/api/education')

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
  <div class="relative min-h-screen overflow-hidden font-sans text-slate-900 transition-colors duration-500">
    <div class="pointer-events-none absolute inset-0 z-0 bg-mesh-theme opacity-50" />

    <UiTheNavbar />

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
