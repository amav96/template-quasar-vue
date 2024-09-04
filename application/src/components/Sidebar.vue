<template>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <q-list>
            <!-- usuarios -->
            <template v-if="autorizado(Permisos.ADMINISTRACION_USUARIOS_LISTADO)">
              <q-item @click="router.push({name: 'listado-recorridos-usuarios'})" clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="deep-purple-13" name="people" />
                </q-item-section>

                <q-item-section>
                  Usuarios
                </q-item-section>
              </q-item>
              <q-separator />
            </template>

          
            <!-- perfil -->
            <q-item @click="router.push({name: 'me' , params: { usuario_id : usuarioStore.usuario.id}})" clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="deep-purple-13" name="person" />
              </q-item-section>

              <q-item-section>
                Perfil
              </q-item-section>
            </q-item>
            <q-separator /> 

            <!-- configuraciones -->
            <q-item @click="router.push({name: 'usuario-configuracion'})" clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="deep-purple-13" name="settings" />
              </q-item-section>

              <q-item-section>
                Configuraciones
              </q-item-section>
            </q-item>
            <q-separator />

            <q-item @click="cerrarSesion" clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="deep-purple-13" name="logout" />
              </q-item-section>

              <q-item-section>
                Salir
              </q-item-section>
            </q-item>
           
          </q-list>

        </q-scroll-area>
    </q-drawer>
</template>

<script setup lang="ts">
import {useRouter } from 'vue-router';
import { useUsuarioStore } from 'src/modules/Usuario/store/Usuario.store'
import Permisos from 'src/utils/Permisos';
import AutenticacionRepository from 'src/repositories/Autenticacion.repository';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { useDataProvider } from 'src/composables/DataProvider';
const { t } = useI18n()

const autenticacionRepository = new AutenticacionRepository();

const {
    resetearDataProviders
} = useDataProvider()

const usuarioStore = useUsuarioStore()
const { logout, autorizado } = usuarioStore
const {leftDrawerOpen } = storeToRefs(usuarioStore);

const router = useRouter();

const cerrandoSesion = ref<boolean>(false)
const cerrarSesion = async () => {
  if(cerrandoSesion.value) return

  try {
    cerrandoSesion.value = true;
    await autenticacionRepository.logout()
    logout()
    resetearDataProviders()
    router.push({name: 'login'})
    
  } catch (error) {
    
  } finally{
    cerrandoSesion.value = false;
    
  }
}

</script>

<style scoped>

</style>