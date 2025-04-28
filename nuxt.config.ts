// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
  app: {
    head: {
      title: "Roblox Outfits Viewer",
      meta: [
        {
          name: "description",
          content: "Browse and view all your Roblox avatars in one place",
        },
        {
          name: "theme-color",
          content: "#87CEEB",
        },
      ],
    },
  },
});
