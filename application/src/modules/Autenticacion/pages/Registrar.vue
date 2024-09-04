<template>
    <center-layout>
        <div class="q-pa-md">
            <q-form 
            @submit="onSubmit"
            class="flex column q-px-md "
            >
                <div class="flex column flex-center full-width">
                    <q-img
                        :src="logo"
                        style="max-width: 250px"
                        class="q-mb-lg q-mt-md"
                    />
                    <div class="full-width text-h6 q-mb-lg text-deep-purple-14 text-center">
                        Registrar mi cuenta
                    </div>
                    
                    <div :class="['full-width']" >
                        <q-select
                        label="Tipo de cuenta"
                        color="deep-purple-6"
                        v-model="formLogin.rol_id"
                        :options="roles"
                        option-label="label"
                        option-value="id"
                        emit-value
                        map-options
                        />
                      
                    </div>

                    <div :class="['full-width']" >
                        <q-input 
                        v-model="formLogin.nombre" 
                        color="deep-purple-6" 
                        label="Nombre"
                        autocomplete="off"
                        :rules="[ val => val && val.length > 0 || 'Ingrese nombre']" 
                         />
                    </div>
                    <div :class="['full-width']" >
                        <q-input 
                        v-model="formLogin.email" 
                        color="deep-purple-6" 
                        label="Email"
                        autocomplete="off"
                        :rules="[ val => val && isValidEmail(val) || 'Ingrese email válido']" 
                         />
                    </div>
                    <div :class="['full-width', 'q-my-md']">
                        <q-input 
                        v-model="formLogin.password" 
                        color="deep-purple-6" 
                        label="Clave" 
                        autocomplete="off"
                        :type="isPwd ? 'password' : 'text'"
                        :rules="[ val => val && val.length > 0 || 'Ingrese contraseña']" 
                        >
                            <template v-slot:append>
                                <q-icon
                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd = !isPwd"
                                />
                            </template>
                        </q-input>
                    </div>

                    <div :class="['full-width']" >
                        <q-select
                        label="Pais"
                        color="deep-purple-6"
                        v-model="formLogin.pais_id"
                        :options="paises"
                        option-label="nombre"
                        option-value="id"
                        emit-value
                        map-options
                        >
                        <template v-slot:option="scope">
                            <q-item v-bind="scope.itemProps">
                                <q-item-section>
                                    <q-item-label>{{ scope.opt.nombre }}</q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-avatar>
                                        <img :src="`https://flagsapi.com/${scope.opt.bandera}/flat/64.png`">
                                    </q-avatar>
                                </q-item-section>
                            </q-item>
                        </template>
                        </q-select>
                    </div>


                    <div @click="router.push({name: 'login'})" :class="['text-deep-purple-13 row full-width text-subtitle1 q-mt-sm', breakpoint.xs ? 'justify-end' : 'justify-center']">
                        <strong>¿Ya tenes cuenta? Iniciar sesión</strong>
                    </div>
                    
                </div>

                <div class="flex justify-center q-my-lg ">
                    <q-btn
                    :class="['full-width']"
                    unelevated 
                    rounded 
                    color="deep-purple-13"
                    label="Crear mi cuenta" 
                    type="submit"
                    :disabled="formularioVacio || formLoading"
                    />
                </div>

                <div :class="['full-width flex justify-center']" >
                    <q-btn
                    :class="['full-width text-black']"
                    rounded 
                    color="white"
                    label="Registrarme con Google" 
                    type="button"
                    @click="callback"
                    :disabled="formLoading"
                    >
                        <img style="width: 25px;margin-left: 10px;" :src="google" />
                    </q-btn>
                </div>

                <q-card v-if="mostrarErrores"  class="q-my-md">
                    <q-card-section class="flex column">
                        <q-chip outline color="red" text-color="white" icon="public">
                            Pais es obligatorio
                        </q-chip>
                        <q-chip outline color="red" text-color="white" icon="work">
                            Tipo de cuenta es obligatorio
                        </q-chip>
                    </q-card-section>
                </q-card>
            </q-form>

            <DialogLoading :open="formLoading" text="Registrando..." />
        </div>
    </center-layout>
</template>

<script setup lang="ts">

import CenterLayout from 'src/layouts/CenterLayout.vue'
import logo from 'src/assets/logo.png'
import { ref, computed, reactive } from "vue"
import { useQuasar } from 'quasar'
import { isValidEmail } from 'src/utils/Validations'
import AutenticacionRepository from 'src/repositories/Autenticacion.repository';
import { RegistrarRequestModel } from 'src/models/Autenticacion.model';
import DialogLoading from 'src/components/General/DialogLoading.vue'
import { useUsuarioStore } from 'src/modules/Usuario/store/Usuario.store'
import { useRouter } from 'vue-router';
import google from 'src/assets/google.png'
import { UsuarioModel } from 'src/models/Usuario.model';
import { useDataProvider } from 'src/composables/DataProvider';
import { onMounted } from 'vue';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

const GOOGLE_CLIENT_ID : string = process.env.GOOGLE_CLIENT_ID as string
onMounted(() => {
  GoogleAuth.initialize({
    clientId: GOOGLE_CLIENT_ID,
    scopes: ['profile', 'email'],
    grantOfflineAccess: true,
    });
});

const autenticacionRepository = new AutenticacionRepository();
const usuarioStore = useUsuarioStore()

const router = useRouter();

const $q = useQuasar()
const breakpoint = computed(() => $q.screen)

const {
    paises,
    getPaises,
} = useDataProvider()

onMounted(async() => {
    await getPaises()
})

const roles = [
    { id: 3, label : "Quiero entregar y retirar paqueteria" },
    { id: 2, label : "Tengo Agencia / Logística / Mensajeria" },
]

const formLogin = reactive<RegistrarRequestModel>({
    nombre: '',
    email: '',
    password: '',
    pais_id: 1,
    rol_id : 3
})
const formLoading = ref<boolean>(false);

const formularioVacio = computed(() => !formLogin.email || !formLogin.password || !formLogin.nombre || !formLogin.rol_id)

const googleFormValido = computed(() => formLogin.rol_id && formLogin.pais_id)

const isPwd = ref<boolean>(true);

const onSubmit = async () => {
    formLoading.value = true

    try {
        const response = await autenticacionRepository.registrar(formLogin)
        const { token } = response;
        if(token){
            completarRegistro(token)
        }

    } catch (error : any) {
        const { data } = error;
        
        let mensaje = data && data.message ?  data.message : 'No se pudo registrar correctamente';
        $q.notify({
          type: 'negative',
          message: mensaje,
          position: 'top',
          timeout: 1000
        })
    } finally {
        formLoading.value = false
    }
}

const completarRegistro = (token: string) => {
    usuarioStore.setToken(token);
    router.push({name: 'crear-recorrido'})
}

const mostrarErrores = ref<boolean>(false);
const callback = async () => {
  
    if(!googleFormValido.value){
        mostrarErrores.value = true
        return
    }

    mostrarErrores.value = false

    try {
        const googleData = await GoogleAuth.signIn();
       
        formLoading.value = true
        if(googleData && googleData.authentication){
            const {  accessToken }  = googleData.authentication;
            const response = await autenticacionRepository.googleAuthRegistrar({
                token: accessToken,
                ...formLogin
            })

            const { token } = response;
            if(token){
                completarRegistro(token)
            }
        } else {
            $q.notify({
                type: 'negative',
                message: 'No hemos podido iniciar correctamente con google',
                position: 'top',
                timeout: 2000
            })
        }
        
    } catch (error : any) {
        
        $q.notify({
                type: 'negative',
                message: error?.data?.message ?? 'No hemos podido registrar correctamente con google',
                position: 'top',
                timeout: 2000
            })
    } finally {
        formLoading.value = false
    }
}

</script>

<style lang="scss" scoped>


</style>