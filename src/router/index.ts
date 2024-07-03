import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { useNProgress } from '@vueuse/integrations/useNProgress';

const { start: startProgress, done: stopProgress } = useNProgress();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: routes => setupLayouts(routes)
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

export default router;
