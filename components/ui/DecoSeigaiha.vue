<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <svg
    width="240"
    height="60"
    viewBox="0 0 240 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="deco-seigaiha"
    :class="$props.class"
    aria-hidden="true"
  >
    <!-- Seigaiha (青海波) – traditional Japanese wave pattern -->
    <g opacity="0.12" stroke="currentColor" stroke-width="1.2" fill="none">
      <!-- Row of overlapping concentric arcs -->
      <g v-for="col in 8" :key="'s'+col">
        <path :d="`M${(col-1)*30} 60 A30 30 0 0 1 ${(col-1)*30+30} 60`" />
        <path :d="`M${(col-1)*30+5} 60 A25 25 0 0 1 ${(col-1)*30+25} 60`" opacity="0.7" />
        <path :d="`M${(col-1)*30+10} 60 A20 20 0 0 1 ${(col-1)*30+20} 60`" opacity="0.4" />
      </g>
      <!-- Offset second row -->
      <g v-for="col in 7" :key="'s2'+col" :transform="`translate(15, -30)`">
        <path :d="`M${(col-1)*30} 60 A30 30 0 0 1 ${(col-1)*30+30} 60`" />
        <path :d="`M${(col-1)*30+5} 60 A25 25 0 0 1 ${(col-1)*30+25} 60`" opacity="0.7" />
        <path :d="`M${(col-1)*30+10} 60 A20 20 0 0 1 ${(col-1)*30+20} 60`" opacity="0.4" />
      </g>
    </g>
  </svg>
</template>
