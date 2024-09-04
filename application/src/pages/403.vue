<template>
    <div class="full-height">
      <div class="error-container">
        <div class="error-message">
          <h1>Oops!</h1>
          <p>Parece que no tienes permisos para acceder a esta página.</p>
          <div @click="router.push({name: nombreRutaBack})" class="flex justify-center q-ma-lg ">
                <q-btn
                :class="[breakpoint.xs ? 'full-width' : '']"
                unelevated 
                rounded 
                color="deep-purple-6"
                label="Volver atras" 
                type="button"
                />
            </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">

import { useQuasar } from 'quasar'
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const nombreRutaBack = computed(() => {
  return 'pedidos-list'
})

const $q = useQuasar()
const breakpoint = computed(() => $q.screen)

const router = useRouter()

</script>
  
  <style scoped>
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .error-message {
    text-align: center;
  }
  
  .error-message h1 {
    font-size: 3em;
    color: #f44336; /* Red */
  }
  
  .error-message p {
    font-size: 1.5em;
    color: #333;
  }
  </style>