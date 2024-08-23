// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/eslint", "nuxt-auth-sanctum"],
  sanctum: {
    baseUrl: process.env.BACKEND_URL,
  },
  imports: {
    autoImport: false,
  },
  nitro: {
    routeRules: {
      "/backend/**": {
        proxy: `${process.env.BACKEND_URL}/**`,
      },
    },
  },
  tailwindcss: {
    configPath: "tailwind.config",
  },
});
