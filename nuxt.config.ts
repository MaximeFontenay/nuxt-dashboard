// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head : {
            title: 'Nuxt Dashboard',
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
            charset: 'utf-8',
            htmlAttrs: {lang: 'fr'},
            meta: [{
               name: 'description', content: 'Create my personal customizable dashboard for free.'
            }]
        },
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
    },
    modules: [
        '@nuxt/devtools',
        '@nuxt/content',
        '@nuxt/image-edge',
        '@nuxtjs/supabase',
        // '@nuxtjs/fontaine',
        // '@nuxtjs/html-validator',
    ],
    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://nuxt-dashboard.com',
        }
    },
})
