<template>
    <template v-if="hasCoordinates">
      <div style="height: 100%" class="map">
        <iframe
        :onload="render"
        width="100%"
        :height="height"
        style="border:0"
        loading="lazy"
        allowfullscreen
        class="mx-auto"
        :src="srcMap">
        </iframe>
        <template v-if="loading" >

          <div :class="['flex justify-center items-center', `${textColor}`, 'loader-map']">
            <q-spinner
            color="primary"
            size="3em"
            :thickness="2"
          />
          </div>
        </template>
      </div>
    </template>
</template>

<script setup>
import {
  toRefs, computed, ref, watch, defineEmits,
  onMounted,
} from 'vue';

const props = defineProps({
  lat: [String, Number],
  lng: [String, Number],
  height: {
    type: String,
    default: '200px',
  },
  textColor: {
    type: String,
    default: 'text-blue',
  },
});

const { lat, lng } = toRefs(props);
const key  = process.env.VUE_APP_GOOGLE_MAPS_API_KEY_COTO 
const baseUrl = `https://www.google.com/maps/embed/v1/place?key=${key}&q=`;
const srcMap = ref('');
const loading = ref(true);
const emit = defineEmits(['renderMap']);

const hasCoordinates = computed(() => {
  if (!lat.value || !lng.value) {
    return false;
  }
  return true;
});

const render = () => {
  loading.value = false;
  emit('renderMap', true);
};

const verifyCoordinates = () => {
  if (lat.value !== '' || lng.value !== '') {
    srcMap.value = `${baseUrl}${lat.value},${lng.value}`;
  }
};

onMounted(() => {
  verifyCoordinates();
})
watch(() => props.lat, (newVal) => {
  if (newVal) {
    srcMap.value = `${baseUrl}${lat.value},${lng.value}`;
  }
});

</script>

<style>

.map{
  position:relative;
}

.loader-map{
  position:absolute;
  top: 50%;
  left: 50%;
  transform:translate(-50%,-50%);
}

</style>
