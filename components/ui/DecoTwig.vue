<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <svg
    width="60"
    height="180"
    viewBox="0 0 60 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="deco-twig"
    :class="$props.class"
    aria-hidden="true"
  >
    <!-- Minimalist bamboo twig / branch -->
    <g opacity="0.1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
      <!-- Main stem -->
      <path d="M30 180 C30 140, 28 100, 30 60 C31 40, 30 20, 30 0" class="twig-stem" />
      <!-- Node marks -->
      <line x1="26" y1="50" x2="34" y2="50" stroke-width="1.6" opacity="0.6" />
      <line x1="27" y1="100" x2="33" y2="100" stroke-width="1.6" opacity="0.6" />
      <line x1="27" y1="140" x2="33" y2="140" stroke-width="1.6" opacity="0.6" />
      <!-- Small leaves -->
      <path d="M30 50 C22 42, 14 38, 8 32" />
      <path d="M30 50 C38 44, 44 39, 50 34" />
      <path d="M30 100 C20 94, 12 88, 6 82" />
      <path d="M30 140 C38 134, 46 130, 52 124" />
    </g>
  </svg>
</template>

<style scoped>
.twig-stem {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: grow-twig 4s ease forwards 0.5s;
}

@keyframes grow-twig {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
