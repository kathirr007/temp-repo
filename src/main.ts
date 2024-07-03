import app from '@/app';
import router from '@/router';
import { Icon } from '@iconify/vue';
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import './styles/main.scss';

app.use(router);
app.component('Icon', Icon);
app.use(
  Vue3Toasity,
  {
    autoClose: 3000
  } as ToastContainerOptions
);
app.mount('#app');
