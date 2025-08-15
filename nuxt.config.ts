// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/icon'],
  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL,
    public: {
      PASSWORT: process.env.NUXT_PASSWORT,
    }
  }
})