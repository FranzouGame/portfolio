// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@tresjs/nuxt',
  ],

  app: {
    head: {
      title: 'François Barlic | Développeur Fullstack',
      htmlAttrs: {
        lang: 'fr',
        class: 'light',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Portfolio de François Barlic, développeur fullstack spécialisé en Nuxt.js, Django et expériences web modernes.',
        },
        { name: 'theme-color', content: '#eef6ff' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Zen+Old+Mincho:wght@400;500;700;900&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/api/**': { cors: true },
  },

  experimental: {
    appManifest: false,
  },

  compatibilityDate: '2024-11-01',
})
