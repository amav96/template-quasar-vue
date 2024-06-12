import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';

import AutenticacionRoute from '../modules/Autenticacion/router/Autenticacion.route';
import { useUsuarioStore } from 'src/stores/Usuario.store';


const routes: any[] = [
  ...AutenticacionRoute,

  // Always leave this as last one,
  // but you can also remove it,
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children : [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/Dashboard.vue'),
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/sin-permisos',
    meta: { requiresAuth: true, },
    component: () => import('pages/403.vue'),
  },
] 

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
   
    const usuarioStore = useUsuarioStore()
    const {
      usuarioAutenticado,
      getUsuario,
      logout,
      autorizado
    } = usuarioStore

    if(to.name === 'login' && await usuarioAutenticado()){
      next('/dashboard')
      return;
    } 
    
    if(to.meta.requiresAuth ){
      
      if(await usuarioAutenticado()){
          if(!await getUsuario()){
            logout()
            next('/autenticacion/login')
          } else {

            if(!to.meta.gate){
              next()
            } else {
              if(autorizado(to.meta.gate as string)){
                next()
              } else {
                next('/sin-permisos')
              }
            }
          }

      } else {
        next('/autenticacion/login')
      }
    } else {
        next();
    }

  })

  return Router;
});
