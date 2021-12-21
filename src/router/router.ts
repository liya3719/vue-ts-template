import Vue from 'vue';
import Router from 'vue-router';
import HelpView from '../views/help/app.vue';
import { isDev } from '@/common/global-data';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: isDev ? '/' : '/name/view',
  routes: [
    {
      path: '/',
      name: 'main',
      component: HelpView,
    },
    {
      path: '/tsx',
      name: 'tsx',
      component: () => import(/* webpackChunkName: "tsx" */ '../views/support-tsx/app')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
