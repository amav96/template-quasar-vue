<template>
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="200"
        :breakpoint="500"
        class="bg-grey-10"
      >
        <q-scroll-area class="fit">
          <div v-if="usuarioStore.usuario" 
          class="tw-flex tw-flex-col tw-flex-justify-center tw-items-center " >
            <img 
            :class="[
                'inline-block rounded-full ring-2 ring-white tw-my-2',
                esEmpresa ? '' : 'tw-h-12 tw-w-28'
                ]" 
            :src="getLogo(usuarioStore.usuario)"
            >
            <div 
            class="tw-h-12 bg-grey-7 text-white tw-text-lg tw-text-center tw-flex tw-items-center" 
            style="width: 100%">
              <span class="tw-font-semibold tw-capitalize" style="margin: auto;" >
                {{ usuarioStore.usuario.firstName ? usuarioStore.usuario.firstName : usuarioStore.usuario.email.split("@")[0] }}
             </span>
            </div>
          </div>

          <q-list>
            <template v-for="item in menuItems">
              <template 
              v-if="item.type === 'expansion' && item.show"
              >
                  <q-expansion-item 
                  :default-opened="item.defaultOpened ?? false"
                  >
                      <template v-slot:header>
                          <q-item-section avatar>
                              <q-icon 
                              :color="colorIcon"
                              :name="item.icon"
                               />
                          </q-item-section>
                          <q-item-section 
                          :class="`text-${colorText}`"
                          >
                          {{ item.text }}
                          </q-item-section>
                      </template>
                      <template v-for="child in item.children">
                          <q-item 
                          v-if="child.show" 
                          @click="router.push(child.route)" 
                          clickable v-ripple
                          class="tw-ml-1"
                          >
                              <q-item-section avatar>
                                  <q-icon
                                  :color="colorIconChild"
                                  :name="child.icon"
                                   />
                              </q-item-section>
                              <q-item-section
                              :class="`text-${colorTextChild}`"
                              >
                                {{ child.text }}
                              </q-item-section>
                          </q-item>
                      </template>
                  </q-expansion-item>
                  <q-separator />
              </template>
              <template v-else-if="item.type === 'separator' && (!item.hasOwnProperty('show') || item.show)">
                  <q-separator />
              </template>
              <template v-else>
                  <q-item 
                  v-if="item.show" 
                  @click="navegar(item)" 
                  clickable 
                  v-ripple
                  >
                      <q-item-section avatar>
                          <q-icon 
                          :color="colorIcon"
                          :name="item.icon" 
                          />
                      </q-item-section>
                      <q-item-section
                      :class="`text-${colorText}`"
                      >
                      {{ item.text }}
                      </q-item-section>
                  </q-item>
              </template>
            </template>
           
          </q-list>

        </q-scroll-area>
    </q-drawer>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import {useRouter } from 'vue-router';
import Permisos from 'src/utils/Permisos';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUsuarioStore } from 'src/stores/Usuario.store'
import AutenticacionRepository from 'src/repositories/Autenticacion.repository';
import { API_BASE_URL } from 'src/utils/BaseUrl';
import logo_app from 'src/assets/images/logo_app.svg'
import { UsuarioModel } from 'src/models/Usuario.model';

const autenticacionRepository  = new AutenticacionRepository();

const usuarioStore = useUsuarioStore()
const { logout, autorizado, esOperador, esEmpresa } = usuarioStore
const { usuario, leftDrawerOpen } = storeToRefs(usuarioStore);

const colorIcon = ref<string>('white')
const colorText = ref<string>('white')

const colorIconChild = ref<string>('grey-13') 
const colorTextChild = ref<string>('grey-13')

const router = useRouter();

const cerrandoSesion = ref<boolean>(false)
const cerrarSesion = async () => {

  if(cerrandoSesion.value) return

  try {
    cerrandoSesion.value = true;
    await autenticacionRepository.logout()
    logout()
    router.push({name: 'login'})
    
  } catch (error) {
    
  } finally{
    cerrandoSesion.value = false;
    
  }
}

const menuItems = ref<any>([
    {
        type: 'expansion',
        icon: 'business',
        text: 'Equipos',
        show:  autorizado(Permisos.GESTIONAR_EQUIPOS),
        defaultOpened: true,
        children: [
            {
                icon: 'send_time_extension',
                text: 'Gestionar equipos',
                route: { name: 'elegir-cliente' },
                show:  autorizado(Permisos.GESTIONAR_EQUIPOS) // Aquí podrías colocar la lógica para mostrar u ocultar el ítem
            },
            {
                icon: 'local_shipping',
                text: 'Equipos gestionados',
                route: { name: 'gestion-equipos' },
                show:  autorizado(Permisos.GESTIONAR_EQUIPOS_BUSQUEDA)
            },
            {
                icon: 'people_outline',
                text: 'Clientes',
                route: { name: 'equipos' },
                show: autorizado(Permisos.EQUIPOS_BUSQUEDA)
            }
        ]
    },
    {
        type: 'separator'
    },
    {
        type: 'expansion',
        icon: 'people',
        text: 'Usuarios',
        show: autorizado(Permisos.SUCURSAL_EMPRESA_USUARIO_LISTAR_TODS),
        children: [
            {
                icon: 'business',
                text: 'Empresas',
                route: { name: 'usuarios-empresas' },
                show: true // Aquí podrías colocar la lógica para mostrar u ocultar el ítem
            },

        ]
    },
    {
        type: 'expansion',
        icon: 'apartment',
        text: 'Empresas',
        show: autorizado(Permisos.SUCURSAL_EMPRESA_LISTAR_TODOS),
        children: [
            {
                icon: 'device_hub',
                text: 'Sucursales',
                route: { name: 'sucursales-empresas' },
                show: autorizado(Permisos.SUCURSAL_EMPRESA_LISTAR_TODOS) // Aquí podrías colocar la lógica para mostrar u ocultar el ítem
            },

        ]
    },
    {
        type: 'separator'
    },
    {
        icon: 'local_shipping',
        text: 'Colectas',
        route: { name: 'colecta-construccion'},
        show: true
    },
    {
        type: 'separator',
        show: esOperador
    },
    {
        icon: 'admin_panel_settings',
        text: 'Portal Operador',
        href : process.env.VITE_VUE_ADMIN,
        show: esOperador
    },
    
    {
        type: 'separator'
    },
    {
        icon: 'logout',
        text: 'Salir',
        function: cerrarSesion,
        show: true
    }
])

const navegar = (item: any) => {
    if(item.function){
        item.function()
    } else if(item.route){
        router.push(item.route)
    } else if(item.href){
        window.location.href = item.href
    }
}

const getLogo = (usuario: UsuarioModel) => {
    return usuario.enterprise?.logo ? `${API_BASE_URL}/${usuario.enterprise.logo}` : logo_app
}


</script>
