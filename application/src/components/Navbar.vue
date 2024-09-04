<template>
    <q-header style="position: relative !important;" >
      <q-toolbar class="tw-shadow-sm bg-white flex row justify-between no-border">
        <div class="tw-flex tw-flex-row">
          <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="deep-purple-13"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        </div>
        
        <q-img
          :src="logo"
          style="max-width: 160px"
        />
        
        <q-btn
        v-if="breakpoint.xs"
        flat
        dense
        round
        color="deep-purple-13"
        />
        
       
      </q-toolbar>
    </q-header>

</template>

<script setup lang="ts">
const logo = 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Sistema_plastics_logo.png?20210418135040'
import {  computed } from 'vue';
import { useQuasar } from 'quasar';
import { useUsuarioStore } from 'src/modules/Usuario/store/Usuario.store';
import { storeToRefs } from 'pinia';

const $q = useQuasar()
const breakpoint = computed(() => $q.screen)
const usuarioStore = useUsuarioStore()

const {leftDrawerOpen, } = storeToRefs(usuarioStore);

</script>