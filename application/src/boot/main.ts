import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { boot } from 'quasar/wrappers';

import { DatePicker } from 'v-calendar';

// import vue3GoogleLogin from 'vue3-google-login'
// Llama al cargador de elementos personalizados antes de que se realice la llamada a render
defineCustomElements(window);
export default boot(({ app, router, store }) => {
   
    app.component('VDatePicker', DatePicker)
   
});
