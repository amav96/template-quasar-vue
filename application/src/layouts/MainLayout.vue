<template>
  <q-layout view="hHh Lpr lff" class="AppRoot-fullPage bg-grey-2">
    <navbar
    :logo1="logo_app"
    :logo2="devolvoja"
    />
    <sidebar
    />
    <q-page-container class="AppMain__layer__PageAndTopBar">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import Sidebar from 'src/components/Sidebar.vue'
import Navbar from 'src/components/Navbar.vue'
import logo_app from 'src/assets/images/logo_app.svg'
import devolvoja from 'src/assets/images/devolvoja.svg'


</script>

<style>
.q-layout__section--marginal{
  background-color: #fafafa !important;
}
.q-toolbar {
  padding: 0 9px;
}
</style>