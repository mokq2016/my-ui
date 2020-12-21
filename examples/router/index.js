/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import Router from 'vue-router';
// eslint-disable-next-line import/extensions
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/button',
      name: 'button',
      component: () => import('@/views/button.vue'),
    },
  ],
});
