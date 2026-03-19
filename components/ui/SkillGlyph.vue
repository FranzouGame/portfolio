<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  category?: string
  size?: 'sm' | 'md'
}>(), {
  category: '',
  size: 'md',
})

const glyph = computed(() => {
  const byName: Record<string, { kind: string, label?: string, className: string }> = {
    'JavaScript': { kind: 'js', label: 'JS', className: 'skill-glyph-js' },
    'TypeScript': { kind: 'ts', label: 'TS', className: 'skill-glyph-ts' },
    'Vue.js': { kind: 'vue', className: 'skill-glyph-vue' },
    'Nuxt.js': { kind: 'nuxt', className: 'skill-glyph-nuxt' },
    Angular: { kind: 'angular', label: 'A', className: 'skill-glyph-angular' },
    'HTML/CSS': { kind: 'code', label: '</>', className: 'skill-glyph-code' },
    TailwindCSS: { kind: 'tailwind', className: 'skill-glyph-tailwind' },
    Bootstrap: { kind: 'bootstrap', label: 'B', className: 'skill-glyph-bootstrap' },
    Python: { kind: 'python', className: 'skill-glyph-python' },
    Django: { kind: 'django', label: 'dj', className: 'skill-glyph-django' },
    PHP: { kind: 'php', label: 'php', className: 'skill-glyph-php' },
    Laravel: { kind: 'laravel', className: 'skill-glyph-laravel' },
    'C++': { kind: 'cpp', label: 'C++', className: 'skill-glyph-cpp' },
    C: { kind: 'c', label: 'C', className: 'skill-glyph-c' },
    SQL: { kind: 'sql', label: 'SQL', className: 'skill-glyph-sql' },
    NoSQL: { kind: 'nosql', label: 'NoSQL', className: 'skill-glyph-nosql' },
    Git: { kind: 'git', className: 'skill-glyph-git' },
    Docker: { kind: 'docker', className: 'skill-glyph-docker' },
    Kubernetes: { kind: 'kubernetes', className: 'skill-glyph-kubernetes' },
    'Scrum/Agile': { kind: 'agile', className: 'skill-glyph-agile' },
  }

  if (byName[props.name]) {
    return byName[props.name]
  }

  if (props.category === 'soft') {
    return { kind: 'soft', label: '++', className: 'skill-glyph-soft' }
  }

  return {
    kind: 'label',
    label: props.name.slice(0, 2).toUpperCase(),
    className: 'skill-glyph-generic',
  }
})
</script>

<template>
  <span class="skill-glyph" :class="[glyph.className, size === 'sm' ? 'skill-glyph-sm' : 'skill-glyph-md']" aria-hidden="true">
    <svg v-if="glyph.kind === 'vue'" viewBox="0 0 24 24" class="skill-glyph-icon">
      <path d="M4 5h4.4L12 11.1 15.6 5H20l-8 14z" fill="currentColor" opacity="0.95" />
      <path d="M7.3 5H10l2 3.4L14 5h2.7L12 13.2z" fill="white" opacity="0.9" />
    </svg>

    <svg v-else-if="glyph.kind === 'nuxt'" viewBox="0 0 24 24" class="skill-glyph-icon">
      <path d="M4 17l4.7-8.2a1.7 1.7 0 0 1 2.9 0L16.3 17h-3.4l-2.8-4.8L7.2 17z" fill="currentColor" opacity="0.92" />
      <path d="M12.1 17l3.2-5.5a1.7 1.7 0 0 1 2.9 0L20 17z" fill="white" opacity="0.92" />
    </svg>

    <svg v-else-if="glyph.kind === 'angular'" viewBox="0 0 24 24" class="skill-glyph-icon">
      <path d="M12 3l7.2 2.5-1.1 9.5L12 21l-6.1-6 .9-9.5z" fill="currentColor" />
      <path d="M12 6.4l4 9.1h-1.9l-.8-2H10.6l-.8 2H8zm0 3.8l-1 2.4h2z" fill="white" opacity="0.94" />
    </svg>

    <svg v-else-if="glyph.kind === 'tailwind'" viewBox="0 0 24 24" class="skill-glyph-icon">
      <path d="M7 9.2c1.1-1.9 2.3-2.7 3.8-2.7 2.2 0 3.5 1.6 4.2 3 .5 1 1 1.7 2 1.7.7 0 1.4-.4 2-1.3-.9 1.9-2.1 2.7-3.7 2.7-2.2 0-3.5-1.6-4.2-3-.5-1-1-1.7-2-1.7-.7 0-1.4.4-2.1 1.3zm-3 4.4c1.1-1.9 2.3-2.7 3.8-2.7 2.2 0 3.5 1.6 4.2 3 .5 1 1 1.7 2 1.7.7 0 1.4-.4 2-1.3-.9 1.9-2.1 2.7-3.7 2.7-2.2 0-3.5-1.6-4.2-3-.5-1-1-1.7-2-1.7-.7 0-1.4.4-2.1 1.3z" fill="currentColor" />
    </svg>

    <svg v-else-if="glyph.kind === 'python'" viewBox="0 0 24 24" class="skill-glyph-icon">
      <path d="M12.2 4c-3.5 0-3.3 1.5-3.3 1.5V8h6.6v.8H6.2S4 8.5 4 12.1c0 3.6 1.9 3.4 1.9 3.4H8v-3.1c0-2.2 1.9-3.4 3.5-3.4h5.8S20 9 20 5.7 17.2 4 17.2 4zm-1.8 1.2a1 1 0 110 2 1 1 0 010-2z" fill="currentColor" />
      <path d="M11.8 20c3.5 0 3.3-1.5 3.3-1.5V16h-6.6v-.8h9.3S20 15.5 20 11.9c0-3.6-1.9-3.4-1.9-3.4H16v3.1c0 2.2-1.9 3.4-3.5 3.4H6.7S4 15 4 18.3 6.8 20 6.8 20zm1.8-1.2a1 1 0 110-2 1 1 0 010 2z" fill="white" opacity="0.92" />
    </svg>

    <svg v-else-if="glyph.kind === 'laravel'" viewBox="0 0 24 24" class="skill-glyph-icon">
      <path d="M6 8.3l5-2.8 4.8 2.8-4.8 2.8zM10.4 11.7v5.7L6 14.7V9zm7.6-2.7v5.6l-4.8 2.8v-5.7zm-6.1 9.3l4.7-2.7 1.8 1-4.8 2.8z" fill="currentColor" />
    </svg>

    <svg v-else-if="glyph.kind === 'git'" viewBox="0 0 24 24" class="skill-glyph-icon">
      <path d="M8 5.5a2 2 0 11.1 4v3.2l2.3 2.3a2 2 0 11-1.1 1.1L6.9 13.8A2 2 0 118.1 9.5V6.4A2 2 0 018 5.5zm8 4a2 2 0 11.1 4V15a2 2 0 11-1.1 0v-1.5A2 2 0 0116 9.5z" fill="currentColor" />
    </svg>

    <svg v-else-if="glyph.kind === 'docker'" viewBox="0 0 24 24" class="skill-glyph-icon">
      <path d="M5 10h2v2H5zm3 0h2v2H8zm3 0h2v2h-2zM8 7.5h2V9H8zm3 0h2V9h-2zm3 2.5h2v2h-2zm4 .8c0 3.3-2.4 5.2-5.8 5.2H8.6A4.6 4.6 0 014 11.4h14.2c.3-.6.7-1.1 1.3-1.5.5.3 1 .5 1.5.5-.2.8-.5 1.3-.9 1.7z" fill="currentColor" />
    </svg>

    <svg v-else-if="glyph.kind === 'kubernetes'" viewBox="0 0 24 24" class="skill-glyph-icon">
      <path d="M12 4.2l2.3 1.3 2.6-.3.6 2.6 1.9 1.8-1.9 1.8-.6 2.6-2.6-.3L12 19.8l-2.3-1.3-2.6.3-.6-2.6-1.9-1.8 1.9-1.8.6-2.6 2.6.3z" fill="currentColor" />
      <circle cx="12" cy="12" r="2.1" fill="white" opacity="0.94" />
    </svg>

    <svg v-else-if="glyph.kind === 'agile'" viewBox="0 0 24 24" class="skill-glyph-icon">
      <path d="M12 5a6.8 6.8 0 015.8 3.2l1.5-.2-.8 2.7-2.7-.7 1-.2A5.2 5.2 0 0012 6.6a5.4 5.4 0 00-4.8 3h-2A7 7 0 0112 5zm6.8 6a7 7 0 01-6.8 8 6.8 6.8 0 01-5.8-3.2l-1.5.2.8-2.7 2.7.7-1 .2A5.2 5.2 0 0012 17.4a5.4 5.4 0 004.8-3h2z" fill="currentColor" />
    </svg>

    <svg v-else-if="glyph.kind === 'sql'" viewBox="0 0 24 24" class="skill-glyph-icon">
      <ellipse cx="12" cy="6.5" rx="5.8" ry="2.5" fill="currentColor" />
      <path d="M6.2 6.5v7c0 1.4 2.6 2.5 5.8 2.5s5.8-1.1 5.8-2.5v-7" fill="currentColor" opacity="0.82" />
      <path d="M6.2 10c0 1.4 2.6 2.5 5.8 2.5s5.8-1.1 5.8-2.5" stroke="white" stroke-width="1" opacity="0.45" />
    </svg>

    <svg v-else-if="glyph.kind === 'nosql'" viewBox="0 0 24 24" class="skill-glyph-icon">
      <ellipse cx="12" cy="7" rx="5.4" ry="2.2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="5.4" ry="2.2" fill="currentColor" opacity="0.76" />
      <ellipse cx="12" cy="17" rx="5.4" ry="2.2" fill="currentColor" opacity="0.52" />
    </svg>

    <span v-else class="skill-glyph-label">
      {{ glyph.label }}
    </span>
  </span>
</template>

<style scoped>
.skill-glyph {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  border: 1px solid rgb(var(--line) / 0.14);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.16),
    0 10px 24px rgb(var(--shadow) / 0.12);
  overflow: hidden;
}

.skill-glyph::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(255 255 255 / 0.16), transparent 24%);
  pointer-events: none;
}

.skill-glyph-md {
  width: 3.2rem;
  height: 3.2rem;
}

.skill-glyph-sm {
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 14px;
}

.skill-glyph-icon {
  width: 60%;
  height: 60%;
  color: currentColor;
}

.skill-glyph-label {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.skill-glyph-js { background: linear-gradient(145deg, #f7df1e, #d9b806); color: #2a2000; }
.skill-glyph-ts { background: linear-gradient(145deg, #3178c6, #1f5ba5); color: white; }
.skill-glyph-vue { background: linear-gradient(145deg, #42b883, #26735f); color: #1d2f28; }
.skill-glyph-nuxt { background: linear-gradient(145deg, #33c48d, #14885d); color: #eafff7; }
.skill-glyph-angular { background: linear-gradient(145deg, #dd0031, #9e0c2c); color: white; }
.skill-glyph-code { background: linear-gradient(145deg, #ff8a65, #4fc3f7); color: white; }
.skill-glyph-tailwind { background: linear-gradient(145deg, #44d3f2, #0ea5e9); color: white; }
.skill-glyph-bootstrap { background: linear-gradient(145deg, #8b5cf6, #5b31b5); color: white; }
.skill-glyph-python { background: linear-gradient(145deg, #3776ab, #ffd43b); color: #11243a; }
.skill-glyph-django { background: linear-gradient(145deg, #0f5132, #0b2f20); color: white; }
.skill-glyph-php { background: linear-gradient(145deg, #8892bf, #586292); color: white; }
.skill-glyph-laravel { background: linear-gradient(145deg, #ff5b3d, #e03f24); color: white; }
.skill-glyph-cpp { background: linear-gradient(145deg, #4a90e2, #2f64b3); color: white; }
.skill-glyph-c { background: linear-gradient(145deg, #5c6bc0, #3949ab); color: white; }
.skill-glyph-sql { background: linear-gradient(145deg, #4db6ac, #197278); color: white; }
.skill-glyph-nosql { background: linear-gradient(145deg, #6bcf8d, #24875a); color: white; }
.skill-glyph-git { background: linear-gradient(145deg, #f1502f, #c3361a); color: white; }
.skill-glyph-docker { background: linear-gradient(145deg, #2496ed, #1267b0); color: white; }
.skill-glyph-kubernetes { background: linear-gradient(145deg, #5f8df6, #315bd9); color: white; }
.skill-glyph-agile { background: linear-gradient(145deg, #f59e0b, #c97a03); color: white; }
.skill-glyph-soft { background: linear-gradient(145deg, #f2c6d5, #caa5d7); color: #5a4155; }
.skill-glyph-generic { background: linear-gradient(145deg, rgb(var(--accent-soft)), rgb(var(--accent))); color: rgb(var(--text-main)); }
</style>
