import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { useNProgress } from '@vueuse/integrations/useNProgress';
import { routes } from 'vue-router/auto-routes';

const { start: startProgress, done: stopProgress } = useNProgress();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes)
});

router.beforeEach(async (to, from, next) => {
  // Add page loading progress bar
  if (to.path) {
    startProgress();
  }

  next();
});

router.afterEach(() => {
  // Stop page loading progress bar
  stopProgress();
});

/* declare module 'vue-router/auto-routes' {
  export interface RouteNamedMap {
    'custom-dynamic-name': RouteRecordInfo<
      'custom-dynamic-name',
      '/added-during-runtime/[...path]',
      { path: ParamValue<true> },
      { path: ParamValue<false> }
    >;
  }
} */

export default router;
