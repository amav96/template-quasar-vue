import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { boot } from 'quasar/wrappers';
import { computed, watch } from 'vue';
import BootLoading from 'src/components/BootLoading.vue'

// import vue3GoogleLogin from 'vue3-google-login'
// Llama al cargador de elementos personalizados antes de que se realice la llamada a render
defineCustomElements(window);

import { App as CapacitorApp } from '@capacitor/app';



export default boot(({ app, router, store }) => {

    // CapacitorApp.addListener('backButton', ({canGoBack}: any) => {
    //     if(!canGoBack){
    //       CapacitorApp.exitApp();
    //     } else {
    //         console.log("tras")
    //         router.go(-1);
    //     }
    //   });

    const obeserverUsuario = computed(() => store.state.value?.usuario?.autenticandoUsuario)
    watch(obeserverUsuario, (autenticando: any) => {
        if (autenticando) {
            app.config.globalProperties.$q.loading.show({
                spinner: BootLoading,
                backgroundColor: "white"
            });
        } else {
            
            app.config.globalProperties.$q.loading.hide();
        }
    });
});
