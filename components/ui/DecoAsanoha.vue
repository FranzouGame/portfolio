<script setup lang="ts">
defineProps<{
  class?: string
  size?: number
}>()
</script>

<template>
  <svg
    :width="size || 80"
    :height="size || 80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="deco-asanoha"
    :class="$props.class"
    aria-hidden="true"
  >
    <!-- Asanoha (麻の葉) – geometric hemp-leaf star pattern -->
    <g opacity="0.1" stroke="currentColor" stroke-width="0.8">
      <!-- Central star -->
      <line x1="40" y1="0" x2="40" y2="80" />
      <line x1="0" y1="40" x2="80" y2="40" />
      <line x1="0" y1="0" x2="80" y2="80" />
      <line x1="80" y1="0" x2="0" y2="80" />
      <!-- Diamond connections -->
      <line x1="40" y1="0" x2="0" y2="40" />
      <line x1="40" y1="0" x2="80" y2="40" />
      <line x1="0" y1="40" x2="40" y2="80" />
      <line x1="80" y1="40" x2="40" y2="80" />
      <!-- Inner star lines -->
      <line x1="20" y1="20" x2="40" y2="40" />
      <line x1="60" y1="20" x2="40" y2="40" />
      <line x1="20" y1="60" x2="40" y2="40" />
      <line x1="60" y1="60" x2="40" y2="40" />
    </g>
  </svg>
</template>
