import AutenticacionRoute from 'src/modules/Autenticacion/router/Autenticacion.route';
import { RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  ...AutenticacionRoute,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/sin-permisos',
    component: () => import('pages/403.vue'),
  },
  {
    path: '/home',
    component: () => import('src/layouts/MainLayout.vue'),
  }
];

export default routes;
