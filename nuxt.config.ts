// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    meta: {
        title: 'Nuxt Dashboard',
        viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        charset: 'utf-8',
    },
    css: [
        '@/assets/_variables.scss',
        '@/assets/_base.scss',
        '@/assets/main.scss',
    ],
    components: {
        global: true,
        dirs: ['~/components']
    },
})
