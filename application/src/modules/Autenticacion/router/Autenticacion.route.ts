import { RouteRecordRaw } from 'vue-router';

const AutenticacionRoute : RouteRecordRaw[] = [
    {
        path: '/autenticacion/login',
        name: 'login',
        component: () => import('src/modules/Autenticacion/pages/LoginPage.vue'),
      },
]

export default AutenticacionRoute;