import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/icon'],
  runtimeConfig: {
    public: {
      PASSWORT: process.env.NUXT_PASSWORT,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY      
    }
  },
  nitro: {
    // nitro ist für api-routen in nuxt zuständig, mit preset netlify mache es meine api für netlify ausführbar weil es das intern in netlify functions umwandelt
    preset: 'netlify'
  }
})