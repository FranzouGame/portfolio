<script setup lang="ts">
const { initTheme } = useTheme()

useHead({
  script: [
    {
      id: 'theme-bootstrap',
      textContent: `(function(){try{var saved=localStorage.getItem('theme');var mode=saved==='dark'||(!saved&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';var root=document.documentElement;root.classList.add(mode);root.classList.remove(mode==='dark'?'light':'dark');root.dataset.theme=mode;}catch(error){document.documentElement.classList.add('light');document.documentElement.dataset.theme='light';}})();`,
      tagPosition: 'head',
    },
  ],
})

onMounted(() => {
  initTheme()
})
</script>

<template>
  <UiPageSideOrnaments />
  <NuxtPage />
</template>
