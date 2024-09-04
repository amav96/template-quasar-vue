<template>

      <q-dialog v-model="((openDialog) as boolean)">
        <q-card class="bg-white q-pa-md flex row items-center">
            <q-spinner
            color="gray"
            size="3em"
            :thickness="2"
            />
            <div v-if="text" class="q-mx-sm">
                {{ text }}
            </div>
        </q-card>
      </q-dialog>

  </template>

<script setup lang="ts">
import { toRefs } from "vue";
import { ref, watch } from "vue"

const props = defineProps({
    open: {
      type: Boolean,
    },
    text: {
      type: String,
      default: '',
    }
})

const {
    open,
    text
} = toRefs(props)

const openDialog = ref<Boolean>(false)

watch(open, (newVal: Boolean) => {
    openDialog.value = newVal
})

</script>