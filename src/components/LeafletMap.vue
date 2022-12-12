<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Leaflet from 'leaflet';
import { DataMarker } from '@/lib/DataMarker';

import type { PropType } from 'vue';
import type { Location } from '@/types/location';

const props = defineProps({
  locations: { type: Array as PropType<Location[]>, default: () => [] }
})

const center = ref([51.186917505979025, 3.2031807018500427] as Leaflet.LatLngTuple)
const zoom = ref(13)    // Max = 19

const setup_Leaflet = function() {
  const container = Leaflet.map("map_container").setView(center.value, zoom.value);
  Leaflet.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      maxZoom: 19,
    }
  ).addTo(container);

  // Add markers
  props.locations.forEach((loc) => {
    // Leaflet.marker([loc.lat, loc.lng]).bindPopup(loc.name).addTo(container).on('click', (e) => {
    //   console.log("Someone clicked the marker at " + e.latlng);
    // });
    (new DataMarker([loc.lat, loc.lng], loc)).bindPopup(loc.name).addTo(container).on('click', (e) => {
      console.log("Someone clicked the marker at " + e.latlng);
      console.log(e.target.data)
    });
  })
}

onMounted(() => {
  console.log("Setting up the Leaflet map");
  setup_Leaflet();
})
</script>

<template>
  <v-sheet class="text-center">
    <h1>Welcome to the wonderoes world of Leaflet maps</h1>
    <div id="map_container">
    </div>
  </v-sheet>
</template>

<style scoped>
#map_container {
  height: 50vh;
}
</style>