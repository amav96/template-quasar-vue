export default [
    {
        path: '/autenticacion',
        redirect: '/autenticacion/login',
        component:  () => import('src/modules/Autenticacion/layouts/AutenticarLayout.vue'), 
        children:[ 
          {
            path: 'login',
            name: 'login',
            component: () => import('src/modules/Autenticacion/pages/Login.vue'), 
            
          },
          {
            path: 'registrar',
            name: 'registrar',
            component: () => import('src/modules/Autenticacion/pages/Registrar.vue'), 
          }
        ]
      }
]