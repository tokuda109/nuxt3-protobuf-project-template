import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  srcDir: 'src',
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:3000',
    },
  },
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/base.css',
  ],
});
