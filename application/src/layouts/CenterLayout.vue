<template>
    <q-page :class="['full-height flex column contenedor-section ']">
        <div  
        :style="`${ !breakpoint.xs? 'border-radius: 15px;' : ''}`"
        :class="['full-height', customClass]"
        >            <slot></slot>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, toRefs } from 'vue';

const $q = useQuasar()
const breakpoint = computed(() => $q.screen)

const props = withDefaults(defineProps<{
    customClass?: string
}>(), {
    customClass: '',
});

const { customClass } = toRefs(props)

</script>

<style scoped>

</style>