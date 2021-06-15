export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "FreeFlexr",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  router: {
    middleware: ["authWall"],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyBlcaO1CUfUwZIVEGha1WJg-Dozp6TgdGY",
          authDomain: "freeflexr-22893.firebaseapp.com",
          projectId: "freeflexr-22893",
          storageBucket: "freeflexr-22893.appspot.com",
          messagingSenderId: "919599346784",
          appId: "1:919599346784:web:95afcd63cd8343cfa63f05",
          measurementId: "G-YEJBCXMLK1",
        },
        services: {
          analytics: true,
          auth: {
            initialize: {
              onAuthStateChangedMutation: "onAuthStateChangedMutation",
              onAuthStateChangedAction: "onAuthStateChangedAction",
            },
          },
        },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
