<script setup lang="ts">
defineProps<{
  class?: string
  variant?: 'wave' | 'dot' | 'line'
}>()
</script>

<template>
  <div
    class="pointer-events-none flex items-center justify-center py-4"
    :class="$props.class"
    aria-hidden="true"
  >
    <!-- Wave variant (default) -->
    <svg v-if="!variant || variant === 'wave'" width="200" height="16" viewBox="0 0 200 16" fill="none" class="text-primary-300 opacity-30">
      <path
        d="M0 8 C16.7 0, 33.3 0, 50 8 C66.7 16, 83.3 16, 100 8 C116.7 0, 133.3 0, 150 8 C166.7 16, 183.3 16, 200 8"
        stroke="currentColor"
        stroke-width="1.2"
        fill="none"
        stroke-linecap="round"
      />
    </svg>

    <!-- Dot variant -->
    <div v-else-if="variant === 'dot'" class="flex items-center gap-3">
      <span class="h-1 w-1 rounded-full bg-primary-300 opacity-30" />
      <span class="h-1.5 w-1.5 rounded-full bg-primary-400 opacity-30" />
      <span class="h-1 w-8 rounded-full bg-primary-300 opacity-20" />
      <span class="h-1.5 w-1.5 rounded-full bg-primary-400 opacity-30" />
      <span class="h-1 w-1 rounded-full bg-primary-300 opacity-30" />
    </div>

    <!-- Line variant -->
    <div v-else-if="variant === 'line'" class="flex items-center gap-4">
      <span class="h-px w-16 bg-gradient-to-r from-transparent to-primary-300 opacity-25" />
      <svg width="12" height="12" viewBox="0 0 12 12" class="text-primary-400 opacity-25">
        <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" />
      </svg>
      <span class="h-px w-16 bg-gradient-to-l from-transparent to-primary-300 opacity-25" />
    </div>
  </div>
</template>
