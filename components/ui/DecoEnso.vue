<script setup lang="ts">
defineProps<{
  size?: number
  strokeWidth?: number
  class?: string
}>()
</script>

<template>
  <svg
    :width="size || 120"
    :height="size || 120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="deco-enso"
    :class="$props.class"
    aria-hidden="true"
  >
    <!-- Ensō circle – the traditional Zen brushstroke circle -->
    <path
      d="M60 10
        C85 10, 110 35, 110 60
        C110 85, 85 110, 60 110
        C35 110, 10 85, 10 60
        C10 42, 22 22, 42 14"
      stroke="currentColor"
      :stroke-width="strokeWidth || 2.5"
      stroke-linecap="round"
      fill="none"
      opacity="0.18"
      class="enso-path"
    />
  </svg>
</template>

<style scoped>
.enso-path {
  stroke-dasharray: 320;
  stroke-dashoffset: 320;
  animation: draw-enso 3s ease forwards;
}

@keyframes draw-enso {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
