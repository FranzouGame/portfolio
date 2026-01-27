<script setup lang="ts">
const props = defineProps<{
  profile: {
    email: string
    phone?: string
    location?: string
    githubUrl?: string
    linkedinUrl?: string
    instagramUrl?: string
  } | null
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
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: form,
    })

    submitStatus.value = 'success'
    statusMessage.value = 'Message envoyé avec succès ! Je vous répondrai rapidement.'
    
    // Reset form
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (error: any) {
    submitStatus.value = 'error'
    statusMessage.value = error?.data?.message || 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
    
    // Clear status after 5 seconds
    setTimeout(() => {
      submitStatus.value = 'idle'
      statusMessage.value = ''
    }, 5000)
  }
}

const contactMethods = computed(() => [
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
])

const socialLinks = computed(() => [
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
    url: props.profile?.instagramUrl ? `https://instagram.com/${props.profile.instagramUrl.replace('@', '')}` : null,
  },
].filter(link => link.url))
</script>

<template>
  <section id="contact" class="relative py-32 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-cyan/5 rounded-full blur-3xl" />

    <div class="max-w-6xl mx-auto px-6 relative">
      <!-- Section Header -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        class="text-center mb-16"
      >
        <span class="font-mono text-neon-cyan text-sm tracking-widest uppercase">
          Contact
        </span>
        <h2 class="section-title mt-4">
          Travaillons <span class="gradient-text">ensemble</span>
        </h2>
        <p class="mt-4 text-white/50 max-w-2xl mx-auto">
          Un projet en tête ? Une opportunité d'alternance ? N'hésitez pas à me contacter, 
          je serai ravi d'échanger avec vous.
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12">
        <!-- Contact Info -->
        <div 
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :visible-once="{ opacity: 1, x: 0, transition: { delay: 200 } }"
          class="lg:col-span-2 space-y-8"
        >
          <!-- Contact Methods -->
          <div class="space-y-4">
            <a
              v-for="method in contactMethods"
              :key="method.label"
              :href="method.href || undefined"
              class="flex items-center gap-4 p-4 glass-card hover:border-neon-cyan/30 
                     transition-all group"
              :class="method.href ? 'cursor-pointer' : 'cursor-default'"
            >
              <!-- Icon -->
              <div 
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 
                       flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <svg v-if="method.icon === 'email'" class="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <svg v-else-if="method.icon === 'phone'" class="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <svg v-else class="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div class="font-mono text-xs text-white/40 uppercase tracking-wider">
                  {{ method.label }}
                </div>
                <div class="font-display text-white group-hover:text-neon-cyan transition-colors">
                  {{ method.value }}
                </div>
              </div>
            </a>
          </div>

          <!-- Social Links -->
          <div>
            <h4 class="font-mono text-sm text-white/40 uppercase tracking-wider mb-4">
              Réseaux sociaux
            </h4>
            <div class="flex gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url!"
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 rounded-xl bg-white/5 border border-white/10 
                       flex items-center justify-center hover:border-neon-cyan/50 
                       hover:bg-neon-cyan/10 transition-all group"
                :title="social.name"
              >
                <svg v-if="social.icon === 'github'" class="w-5 h-5 group-hover:text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <svg v-else-if="social.icon === 'linkedin'" class="w-5 h-5 group-hover:text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <svg v-else-if="social.icon === 'instagram'" class="w-5 h-5 group-hover:text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Availability Badge -->
          <div class="glass-card p-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span class="font-mono text-sm text-green-400">Disponible</span>
            </div>
            <p class="text-white/60 text-sm">
              Je suis actuellement à la recherche d'une alternance pour un Master en informatique.
            </p>
          </div>
        </div>

        <!-- Contact Form -->
        <div 
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :visible-once="{ opacity: 1, x: 0, transition: { delay: 400 } }"
          class="lg:col-span-3"
        >
          <form 
            class="glass-card p-8 space-y-6"
            @submit.prevent="handleSubmit"
          >
            <div class="grid sm:grid-cols-2 gap-6">
              <!-- Name -->
              <div>
                <label for="name" class="block font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                  Nom <span class="text-neon-cyan">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                         text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan/50 
                         focus:ring-1 focus:ring-neon-cyan/50 transition-all"
                  placeholder="Votre nom"
                >
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                  Email <span class="text-neon-cyan">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                         text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan/50 
                         focus:ring-1 focus:ring-neon-cyan/50 transition-all"
                  placeholder="votre@email.com"
                >
              </div>
            </div>

            <!-- Subject -->
            <div>
              <label for="subject" class="block font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                Sujet
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                       text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan/50 
                       focus:ring-1 focus:ring-neon-cyan/50 transition-all"
                placeholder="Sujet de votre message"
              >
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                Message <span class="text-neon-cyan">*</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                       text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan/50 
                       focus:ring-1 focus:ring-neon-cyan/50 transition-all resize-none"
                placeholder="Votre message..."
              />
            </div>

            <!-- Status Message -->
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
                class="p-4 rounded-lg"
                :class="submitStatus === 'success' 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'"
              >
                {{ statusMessage }}
              </div>
            </Transition>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 
                     disabled:cursor-not-allowed"
            >
              <svg 
                v-if="isSubmitting" 
                class="w-5 h-5 animate-spin" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span class="relative z-10">
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
