import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

let API_URL
const env = process.env.NODE_ENV || 'development';
if (env === 'development' || env === 'test') {
  API_URL = 'http://3.113.114.91/api/v1'
} else {
  API_URL = process.env.API_URL
}

export default {
  mode: 'universal',
  srcDir: 'app/',
  router: {
    middleware: [
      'auth'
    ]
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    // { src: '@/plugins/persistedstate', ssr: false },
    '@/plugins/axios',
    '@/plugins/selectId'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    ['@nuxtjs/moment', ['ja']]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: 'http://3.113.114.91/api/v1'
    // eslint-disable-next-line no-undef
    baseURL: API_URL
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  toast: {
    position: 'top-center',
    duration: 3000,
    theme: 'bubble'
  }
}
