<template>
    <q-header style="position: relative !important;" >
      <q-toolbar class="tw-shadow-sm bg-white flex row justify-between no-border ">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="blue-12"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <div v-if="logo1 || logo2" class="flex row items-center justify-center tw-gap-2" >
          <img
          v-if="logo1"
          :src="logo1"
          
          :style="`max-width: ${breakpoint.xs ? '110px' : '130px'}`"
          />
          <img
          v-if="logo2"
            :src="logo2"
            
            :style="`max-width: ${breakpoint.xs ? '110px' : '130px'};margin-bottom:6px;`"
          />
        </div>
    
      </q-toolbar>
    </q-header>
</template>

<script setup lang="ts">

import { ref, toRefs, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useUsuarioStore } from 'src/stores/Usuario.store';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  logo1?: string,
  logo2?: string
}>()

const { logo1, logo2 } = toRefs(props)

const $q = useQuasar()
const breakpoint = computed(() => $q.screen)

const usuarioStore = useUsuarioStore()
const {  leftDrawerOpen } = storeToRefs(usuarioStore);

</script>

<style scoped>

</style>