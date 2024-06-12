<template>
    <q-dialog 
      v-model="localOpenModal" 
      :persistent="persistent"
      :maximized="maximized"
    >
      <div  :class="['flex ', !breakpoint.xs? 'justify-center items-center border-radius-md' : '']">
          <div gray-background 
          :class="['full-height bg-white q-pa-md']"
          >
              <div class="full-width q-mb-lg tw-flex tw-flex-row tw-justify-between">
                  <q-icon 
                  @click="closeModal"
                  name="arrow_back" 
                  color="blue"
                  size="sm"
                  class="tw-cursor-pointer"
                  />
                  <div v-if="titulo" class="tw-text-lg tw-font-normal">
                        {{ titulo }}
                  </div>
              </div>
              <slot></slot>
          </div>
      </div>
    </q-dialog>
  </template>
  
  <script setup lang="ts">
  import { useHelper } from 'src/composables/Helper';
  import { ref, toRef, toRefs, watch } from 'vue';
  
  const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
  
const { $q, breakpoint } = useHelper()

interface Props {
    modelValue: boolean;
    persistent?: boolean;
    maximized?: boolean;
    titulo?: string
}

const props = withDefaults(defineProps<Props>(), {
    persistent: false,
    maximized: false
})  

const { persistent, maximized, titulo } = toRefs(props)

const localOpenModal = ref<boolean>(props.modelValue)

watch(() => props.modelValue, (newValue) => {
    localOpenModal.value = newValue
})

const closeModal = () => {
    emit('update:modelValue', false)
}

</script>

<style scoped>

</style>