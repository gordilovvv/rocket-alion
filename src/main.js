import { ViteSSG } from 'vite-ssg';
// import { createApp } from 'vue';

import App from './App.vue';
import { routes } from './router';

// const app = createAppClient(App);

// app.use(router);
// app.mount('#app');

export const createApp = ViteSSG(
    App,
    { routes }
);