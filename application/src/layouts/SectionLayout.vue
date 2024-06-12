<template>
    <q-page class="bg-white q-pa-md tw-gap-4 flex column no-wrap full-height tw-max-h-full">
        <div class="tw-text-xl tw-font-semibold ">
            {{ titulo }}
        </div>
        <slot></slot>
    </q-page>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

interface Props {
    titulo: string
}
const props = defineProps<Props>();
const { titulo } = toRefs(props)

</script>

<style scoped>

</style>