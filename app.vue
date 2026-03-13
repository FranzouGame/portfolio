<script setup lang="ts">
const { initTheme } = useTheme()

useHead({
  script: [
    {
      id: 'theme-bootstrap',
      innerHTML: `(function(){try{var saved=localStorage.getItem('theme');var mode=saved==='dark'||(!saved&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';var root=document.documentElement;root.classList.add(mode);root.classList.remove(mode==='dark'?'light':'dark');root.dataset.theme=mode;}catch(error){document.documentElement.classList.add('light');document.documentElement.dataset.theme='light';}})();`,
      tagPosition: 'head',
    },
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'theme-bootstrap': ['innerHTML'],
  },
})

onMounted(() => {
  initTheme()
})
</script>

<template>
  <NuxtPage />
</template>
