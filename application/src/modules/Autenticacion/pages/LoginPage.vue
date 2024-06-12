<template>
    <div>
        <div
        class="flex justify-start tw-ml-8 tw-mt-4 text-lg tw-cursor-pointer"
        >
        <q-icon 
        size="md"
        color="blue-11"
        name="arrow_back" />
        </div>
        <main class="container mx-auto container-center-section">
        <div class="box-section">
            <div class="box-section__logo tw-mt-8">
            <img :src="logo_app" />
            </div>
            <div class="box-section__title tw-my-5">
                <h2>{{ $t('Iniciar sesión') }}</h2>
                <span>Por favor, introduce tus datos</span>
            </div>
            <div class="box-section__form">
                <q-form 
                @submit.prevent="iniciarSesion"
                class="tw-gap-2 tw-flex tw-flex-col"
                >
                    <q-input
                    v-model="formLogin.email"
                    placeholder="Email"
                    outlined
                    dense
                    />
            
                    <q-input
                    v-model="formLogin.password"
                    placeholder="Contraseña"
                    type="password"
                    outlined
                    dense
                    />
                
                <div class="my-2 flex flex-row justify-between">
                    <div @click="recuperarPassword" class="tw-mx-1 tw-cursor-pointer">
                        <span class="tw-text-blue-400 tw-font-bold text-xs">Olvidé mi contraseña</span>
                    </div>
                </div>
                <div class="my-3">
                 
                  <q-btn 
                  type="submit" 
                  color="blue-11" 
                  class="q-mb-md tw-w-full"
                  :loading="iniciandoSesion"
                  :disabled="iniciandoSesion"
                  >
                      Ingresar
                  </q-btn>
                </div>
                </q-form>
            </div>
        </div>
        </main>
  </div>
</template>

<script setup lang="ts">
import { API_BASE_URL } from 'src/utils/BaseUrl';
import { reactive, ref } from 'vue';
import AutenticacionRepository from 'src/repositories/Autenticacion.repository'
import { useUsuarioStore } from 'src/stores/Usuario.store'
import { useRouter } from 'vue-router';
import { useHelper } from 'src/composables/Helper';
import logo_app from 'src/assets/images/logo_app.svg'

const router = useRouter();
const { $q, breakpoint } = useHelper()

const usuarioStore = useUsuarioStore()
const { setUsuario, setToken, setAbilities } = usuarioStore

const autenticacionRepository = new AutenticacionRepository()

const formLogin = reactive({
    email: '',
    password: ''
})

const iniciandoSesion = ref<boolean>(false)
const iniciarSesion = async () => {
    try {
        iniciandoSesion.value =  true
        const response = await autenticacionRepository.login(formLogin);
        const { token} = response;
        setToken(token);
        router.push({name: 'dashboard'})
        
    } catch(error : any) {
      let mensaje = error.data?.errors?.message?.[0] ?? 'Error al iniciar sesión'
        $q.notify({
            color: 'negative',
            message: mensaje,
            icon: 'report_problem'
        })
    } finally { 
      iniciandoSesion.value =  false
    }
}

const recuperarPassword = () => {
  window.location.href = `${process.env.VITE_VUE_APP}/recuperar-clave`
}

</script>

<style scoped>

.container-center-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 1rem auto;
    max-width: 23rem;
    height: 100%;
    padding: 24px;
    width: 100%;
    margin: auto;
  }
  
  .box-section {
    width: 100%;
    margin: auto;
    padding: 10px
  }
  
  .box-section__logo {
    width: 8rem;
    height: 2.5rem;
  }
  
  .box-section__title h2 {
    font-size: 1.3rem;
    font-weight: 500;

  }
  
  .box-section__title span {
    font-weight: 300;
    font-size: 1.2rem;
  }
  
  .box-section__form {
    display: block;
  }
  
  @media (min-width: 620px) {
    .container-center-section {
      height: 90vh;
      margin: 0rem auto;
    }
  }

</style>