/// <reference types="vitest" />

import path from 'node:path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import VueMacros from 'unplugin-vue-macros/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import Layouts from 'vite-plugin-vue-layouts';

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true
          }
        })
      }
    }),

    // https://github.com/posva/unplugin-vue-router
    VueRouter(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink']
        }
      ],
      // dts: true,
      dts: './src/auto-imports.d.ts',
      dirs: [
        './src/composables'
      ],
      vueTemplate: true
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      // dts: true,
      dts: './src/components.d.ts',
      directoryAsNamespace: true,
      deep: true
    })
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom'
  }
});
