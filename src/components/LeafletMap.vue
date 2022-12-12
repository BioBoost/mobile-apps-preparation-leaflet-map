<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LeafLet from 'leaflet';

const center = ref([51.186917505979025, 3.2031807018500427] as LeafLet.LatLngTuple)
const zoom = ref(13)    // Max = 19

const setup_leaflet = function() {
  const container = LeafLet.map("map_container").setView(center.value, zoom.value);
  LeafLet.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      maxZoom: 19,
    }
  ).addTo(container);
}

onMounted(() => {
  console.log("Setting up the leaflet map");
  setup_leaflet();
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