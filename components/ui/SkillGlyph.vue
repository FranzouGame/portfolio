<script setup lang="ts">
import type { SimpleIcon } from 'simple-icons'
import {
  siAngular,
  siBootstrap,
  siC,
  siCplusplus,
  siDjango,
  siDocker,
  siGit,
  siHtml5,
  siJavascript,
  siKubernetes,
  siLaravel,
  siNuxt,
  siPhp,
  siPython,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
} from 'simple-icons'

type SkillGlyph = {
  icon?: SimpleIcon
  label?: string
  className: string
}

const props = withDefaults(defineProps<{
  name: string
  category?: string
  size?: 'sm' | 'md'
}>(), {
  category: '',
  size: 'md',
})

const glyphByName: Record<string, SkillGlyph> = {
  JavaScript: { icon: siJavascript, className: 'skill-glyph-javascript' },
  TypeScript: { icon: siTypescript, className: 'skill-glyph-typescript' },
  'Vue.js': { icon: siVuedotjs, className: 'skill-glyph-vue' },
  'Nuxt.js': { icon: siNuxt, className: 'skill-glyph-nuxt' },
  Angular: { icon: siAngular, className: 'skill-glyph-angular' },
  'HTML/CSS': { icon: siHtml5, className: 'skill-glyph-htmlcss' },
  TailwindCSS: { icon: siTailwindcss, className: 'skill-glyph-tailwind' },
  Bootstrap: { icon: siBootstrap, className: 'skill-glyph-bootstrap' },
  Python: { icon: siPython, className: 'skill-glyph-python' },
  Django: { icon: siDjango, className: 'skill-glyph-django' },
  PHP: { icon: siPhp, className: 'skill-glyph-php' },
  Laravel: { icon: siLaravel, className: 'skill-glyph-laravel' },
  'C++': { icon: siCplusplus, className: 'skill-glyph-cpp' },
  C: { icon: siC, className: 'skill-glyph-c' },
  SQL: { label: 'SQL', className: 'skill-glyph-sql' },
  NoSQL: { label: 'NoSQL', className: 'skill-glyph-nosql' },
  Git: { icon: siGit, className: 'skill-glyph-git' },
  Docker: { icon: siDocker, className: 'skill-glyph-docker' },
  Kubernetes: { icon: siKubernetes, className: 'skill-glyph-kubernetes' },
  'Scrum/Agile': { label: 'Agile', className: 'skill-glyph-agile' },
}

const glyph = computed<SkillGlyph>(() => {
  const knownGlyph = glyphByName[props.name]

  if (knownGlyph) {
    return knownGlyph
  }

  if (props.category === 'soft') {
    return { label: '++', className: 'skill-glyph-soft' }
  }

  return {
    label: props.name.slice(0, 2).toUpperCase(),
    className: 'skill-glyph-generic',
  }
})
</script>

<template>
  <span class="skill-glyph" :class="[glyph.className, size === 'sm' ? 'skill-glyph-sm' : 'skill-glyph-md']" aria-hidden="true">
    <svg
      v-if="glyph.icon"
      class="skill-glyph-icon"
      viewBox="0 0 24 24"
    >
      <path :d="glyph.icon.path" fill="currentColor" />
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
  background:
    radial-gradient(circle at top, rgb(255 255 255 / 0.22), transparent 58%),
    linear-gradient(180deg, rgb(var(--surface-strong) / 0.94), rgb(var(--surface) / 0.88));
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
  font-size: 0.58rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.skill-glyph-javascript { color: #f7df1e; }
.skill-glyph-typescript { color: #3178c6; }
.skill-glyph-vue { color: #42b883; }
.skill-glyph-nuxt { color: #00dc82; }
.skill-glyph-angular { color: #dd0031; }
.skill-glyph-htmlcss { color: #e34f26; }
.skill-glyph-tailwind { color: #06b6d4; }
.skill-glyph-bootstrap { color: #7952b3; }
.skill-glyph-python { color: #3776ab; }
.skill-glyph-django { color: #092e20; }
.skill-glyph-php { color: #777bb4; }
.skill-glyph-laravel { color: #ff2d20; }
.skill-glyph-cpp { color: #00599c; }
.skill-glyph-c { color: #a8b9cc; }
.skill-glyph-sql { color: #197278; }
.skill-glyph-nosql { color: #2f855a; }
.skill-glyph-git { color: #f05032; }
.skill-glyph-docker { color: #2496ed; }
.skill-glyph-kubernetes { color: #326ce5; }
.skill-glyph-agile { color: #c97a03; }
.skill-glyph-soft { color: #7c5c74; }
.skill-glyph-generic { color: rgb(var(--text-main)); }
</style>
