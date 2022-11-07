// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    meta: {
        title: 'Nuxt Dashboard',
        viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        charset: 'utf-8',
    },
    app: {
        pageTransition: {
            name: 'fade',
            mode: 'out-in' // default
        },
        layoutTransition: {
            name: 'slide',
            mode: 'out-in' // default
        }
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
    typescript: {
        strict: true
    }
})
