import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  srcDir: 'src',
  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/base.css',
  ],
});
