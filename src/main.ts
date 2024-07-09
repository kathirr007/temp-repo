import app from '@/app';
import router from '@/router';
import { Icon } from '@iconify/vue';
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query';
import VSelect from 'vue-select';

import 'vue3-toastify/dist/index.css';
import './styles/main.scss';
import '@bhplugin/vue3-datatable/dist/style.css';
import 'vue-select/dist/vue-select.css';
import 'vue-multiselect/dist/vue-multiselect.css';

const vueQueryConfig: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false
      }
    }
  }
};

app.use(router);
app.component('Icon', Icon);
app.component('Vue3Datatable', Vue3Datatable);
app.component('VSelect', VSelect);

app.use(
  Vue3Toasity,
  {
    autoClose: 3000
  } as ToastContainerOptions
);
app.use(VueQueryPlugin, vueQueryConfig);
app.mount('#app');
