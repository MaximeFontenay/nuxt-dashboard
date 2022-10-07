// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    meta: {
        title: 'Nuxt Dashboard',
        viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        charset: 'utf-8',
        link: [
            {
                href: '/public/fonts/durer.woff2',
                rel: 'preload', 
                as: 'font', 
                type: 'font/woff2', 
                crossorigin: "",
            }
        ],
    },
    css: [
        '@/assets/_variables.scss',
        '@/assets/_base.scss',
        '@/assets/main.scss'
    ],
})
