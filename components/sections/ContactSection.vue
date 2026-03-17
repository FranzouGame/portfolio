<script setup lang="ts">
import type { ProfileData } from '~/types/api'

const props = defineProps<{
  profile: Pick<
    ProfileData,
    'email' | 'phone' | 'location' | 'githubUrl' | 'linkedinUrl' | 'instagramUrl'
  > | null
}>()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const statusMessage = ref('')

const handleSubmit = async () => {
  if (!form.name || !form.email || !form.message) {
    submitStatus.value = 'error'
    statusMessage.value = 'Veuillez remplir tous les champs obligatoires.'
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form,
    })

    submitStatus.value = 'success'
    statusMessage.value = 'Message envoyé avec succès. Je vous répondrai rapidement.'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (error: any) {
    submitStatus.value = 'error'
    statusMessage.value = error?.data?.message || 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
    window.setTimeout(() => {
      submitStatus.value = 'idle'
      statusMessage.value = ''
    }, 5000)
  }
}

const contactMethods = computed(() => {
  const methods = [
    {
      icon: 'email',
      label: 'Email',
      value: props.profile?.email || 'francois.barlic57@gmail.com',
      href: `mailto:${props.profile?.email || 'francois.barlic57@gmail.com'}`,
    },
    {
      icon: 'location',
      label: 'Localisation',
      value: props.profile?.location || 'Anglet - 64',
      href: null,
    },
  ]

  if (props.profile?.phone) {
    methods.splice(1, 0, {
      icon: 'phone',
      label: 'Téléphone',
      value: props.profile.phone,
      href: `tel:${props.profile.phone.replace(/\s+/g, '')}`,
    })
  }

  return methods
})

const socialLinks = computed(() => {
  return [
    {
      name: 'GitHub',
      icon: 'github',
      url: props.profile?.githubUrl || 'https://github.com/FranzouGame',
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      url: props.profile?.linkedinUrl,
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      url: props.profile?.instagramUrl
        ? `https://instagram.com/${props.profile.instagramUrl.replace('@', '')}`
        : null,
    },
  ].filter(link => link.url)
})
</script>

<template>
  <section id="contact" class="relative scroll-mt-28 py-24 sm:py-28">
    <!-- Japanese decorative elements -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <UiDecoEnso :size="200" class="absolute -left-12 top-8 text-primary-400 opacity-30" />
      <UiDecoSeigaiha class="absolute -right-10 bottom-4 text-primary-300 -rotate-2" />
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="section-shell px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div class="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div class="space-y-6">
            <div>
              <span
                v-motion
                :initial="{ opacity: 0, y: 16 }"
                :visible-once="{ opacity: 1, y: 0 }"
                class="font-mono text-sm uppercase tracking-[0.24em] text-primary-500 font-semibold"
              >
                Contact
              </span>

              <h2
                v-motion
                :initial="{ opacity: 0, y: 22 }"
                :visible-once="{ opacity: 1, y: 0, transition: { delay: 120 } }"
                class="mt-6 font-display text-4xl tracking-tight text-slate-800 sm:text-5xl"
              >
                Parlons d’un projet clair, utile et bien fini.
              </h2>

              <p
                v-motion
                :initial="{ opacity: 0 }"
                :visible-once="{ opacity: 1, transition: { delay: 220 } }"
                class="mt-6 text-lg leading-relaxed text-slate-600"
              >
                Une opportunité, un projet ou simplement l’envie d’échanger autour du web et de l’interface ? Je suis disponible pour en discuter.
              </p>

              <div class="mt-6">
                <span class="section-strand">
                  opportunites claires, rythme simple, reponse rapide
                </span>
              </div>
            </div>

            <div class="surface-card-accent p-6">
              <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Disponibilité</p>
              <p class="mt-4 font-display text-3xl tracking-tight text-slate-800">
                Alternance et projets motivants.
              </p>
              <p class="mt-4 text-slate-600">
                Je recherche une alternance pour poursuivre en Master informatique, avec une vraie attention portée aux environnements où la qualité d’exécution compte.
              </p>
            </div>

            <div class="grid gap-4">
              <a
                v-for="method in contactMethods"
                :key="method.label"
                :href="method.href || undefined"
                class="surface-card flex items-center gap-4 p-5 transition-transform hover:-translate-y-1 hover:shadow-soft"
                :class="method.href ? 'cursor-pointer' : 'cursor-default'"
              >
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50">
                  <svg
                    v-if="method.icon === 'email'"
                    class="h-5 w-5 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <svg
                    v-else-if="method.icon === 'phone'"
                    class="h-5 w-5 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>

                <div>
                  <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">{{ method.label }}</p>
                  <p class="mt-2 text-slate-700 font-medium">
                    {{ method.value }}
                  </p>
                </div>
              </a>
            </div>

            <div class="surface-card-editorial p-6">
              <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Réseaux</p>
              <div class="mt-5 flex flex-wrap gap-3">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url!"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-surface-50 text-slate-500 transition-all hover:-translate-y-1 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 hover:shadow-soft"
                  :title="social.name"
                >
                  <svg v-if="social.icon === 'github'" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.801 8.207 11.388.6.111.793-.261.793-.578v-2.233c-3.338.725-4.034-1.416-4.034-1.416-.545-1.387-1.332-1.756-1.332-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.808 1.304 3.493.997.107-.775.418-1.305.762-1.604-2.665-.304-5.467-1.334-5.467-5.93 0-1.312.469-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.302 1.23A11.5 11.5 0 0112 6.844c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.768.84 1.234 1.91 1.234 3.222 0 4.608-2.806 5.625-5.479 5.921.431.372.823 1.102.823 2.222v3.293c0 .319.192.69.802.576C20.565 21.798 24 17.302 24 12 24 5.373 18.627 0 12 0z" />
                  </svg>
                  <svg v-else-if="social.icon === 'linkedin'" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zM7 19H3V9h4v10zM5 7.268A2.268 2.268 0 117.268 5 2.268 2.268 0 015 7.268zM21 19h-4v-5.604C17 11.79 16.468 11 15.4 11c-1.114 0-1.4.78-1.4 2.396V19h-4V9h4v1.367c.665-1.005 1.854-1.734 3.612-1.734C20.131 8.633 21 10.417 21 13.137z" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.251.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.848 0 3.204-.011 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.069-4.85.069-3.204 0-3.583-.011-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92C2.175 15.584 2.163 15.205 2.163 12c0-3.203.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.417 2.175 8.796 2.163 12 2.163zm0-2.163c-3.259 0-3.667.014-4.947.072C2.694.272.272 2.69.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.781 6.981 6.981C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.947-.072 4.359-.2 6.782-2.618 6.981-6.981.058-1.279.072-1.688.072-4.947 0-3.259-.014-3.667-.072-4.947-.199-4.359-2.622-6.782-6.981-6.981C15.668.014 15.259 0 12 0zm0 5.838A6.162 6.162 0 1018.163 12 6.163 6.163 0 0012 5.838zm0 10.162A4 4 0 1116 12a4 4 0 01-4 4zm6.406-11.845a1.44 1.44 0 101.44 1.44 1.44 1.44 0 00-1.44-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: 24 }"
            :visible-once="{ opacity: 1, x: 0, transition: { delay: 260 } }"
            class="h-full"
          >
            <form class="surface-card-editorial flex h-full flex-col rounded-[28px] p-6 sm:p-8 shadow-soft" @submit.prevent="handleSubmit">
              <div class="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-500">Message</p>
                  <p class="mt-4 font-display text-4xl tracking-tight text-slate-800">
                    Décris-moi ton besoin.
                  </p>
                </div>
                <span class="hidden font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400 sm:block">
                  réponse rapide
                </span>
              </div>

              <div class="grid gap-6 sm:grid-cols-2">
                <div>
                  <label for="name" class="mb-2 block font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">
                    Nom *
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full rounded-xl border border-slate-200 bg-surface-50 px-4 py-3 text-slate-800 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors"
                    placeholder="Votre nom"
                  >
                </div>

                <div>
                  <label for="email" class="mb-2 block font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">
                    Email *
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full rounded-xl border border-slate-200 bg-surface-50 px-4 py-3 text-slate-800 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors"
                    placeholder="votre@email.com"
                  >
                </div>
              </div>

              <div class="mt-6">
                <label for="subject" class="mb-2 block font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  Sujet
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-surface-50 px-4 py-3 text-slate-800 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors"
                  placeholder="Sujet du message"
                >
              </div>

              <div class="mt-6">
                <label for="message" class="mb-2 block font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="6"
                  class="w-full rounded-xl border border-slate-200 bg-surface-50 px-4 py-3 text-slate-800 resize-none focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors"
                  placeholder="Votre message..."
                />
              </div>

              <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div
                  v-if="submitStatus !== 'idle'"
                  class="mt-6 rounded-xl border p-4"
                  :class="
                    submitStatus === 'success'
                      ? 'border-green-200 bg-green-50 text-green-700'
                      : 'border-red-200 bg-red-50 text-red-700'
                  "
                >
                  {{ statusMessage }}
                </div>
              </Transition>

              <div class="mt-auto pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-400">
                  Disponible pour échanger
                </p>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-600 px-8 font-medium text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-500 hover:shadow-hover focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:opacity-50"
                >
                  <svg v-if="isSubmitting" class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{{ isSubmitting ? 'Envoi...' : 'Envoyer le message' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
