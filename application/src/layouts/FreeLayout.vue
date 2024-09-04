<template>
    <q-layout view="hHh Lpr lff" class="AppRoot-fullPage bg-grey-2">
      <q-page-container class="AppMain__layer__PageAndTopBar">
        <router-view />
      </q-page-container>
    </q-layout>
  </template>
  
  <style>
  .q-layout__section--marginal{
    background-color: #fafafa !important;
  }
  .q-toolbar {
    padding: 0 9px;
  }
  </style>