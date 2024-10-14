import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  srcDir: 'src',
  // ssr: false,
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:4000',
    },
  },
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/base.css',
  ],
});
