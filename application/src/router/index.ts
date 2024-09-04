import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useUsuarioStore } from 'src/modules/Usuario/store/Usuario.store'
import { Preferences } from '@capacitor/preferences';
import { toMercator } from '@turf/turf';
import { storeToRefs } from 'pinia';

let currentPath = '/';

const setPath = async (path: any) => {
  currentPath = path;
  await Preferences.set({ key: '_path', value: currentPath });
};

const getPath = async () : Promise<any> => {
  return await Preferences.get({ key: '_path'});
};


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

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
    
    // @ts-ignore
    window.document.title = to.meta && to.meta.title ? to.meta.title : 'App';
    if(to.path && to.path !== "/"){
      setPath(to.path);
    }
    
    const usuarioStore = useUsuarioStore()
    const {
      usuarioAutenticado,
      getUsuario,
      logout,
      autorizado
    } = usuarioStore

    if(to.meta.requiresAuth ){
      if(await usuarioAutenticado()){
          if(!await getUsuario()){
            logout()
            next('/autenticacion/login')
          } else {
            if(to.meta.gate) {
              if(autorizado(to.meta.gate as string)){
                next()
              } else {
                next('/sin-permisos')
              }
            } else {
              next()
            }
          }

      } else {
        next('/autenticacion/login')
      }
    } else {
      if (to.path === "/") {
        let storedPath = await getPath();
        if(storedPath.value){
          next(storedPath.value);
        } else {
          next();
        }
      } else {
        next();
      }
    }
  })

  return Router;
});
