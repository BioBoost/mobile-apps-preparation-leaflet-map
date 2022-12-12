<script setup lang="ts">
import { ref, toRefs, onMounted, watch } from 'vue';
import Leaflet from 'leaflet';
import { DataMarker } from '@/lib/DataMarker';

import type { PropType } from 'vue';
import type { Location } from '@/types/location';

const props = defineProps({
  locations: { type: Array as PropType<Location[]>, default: () => [] },
  refreshTicker: { type: Number, default: 0 }
})

const center = ref([51.186917505979025, 3.2031807018500427] as Leaflet.LatLngTuple)
const zoom = ref(13)    // Max = 19

const map = {
  container: {} as Leaflet.Map,
  markers: {} as Leaflet.LayerGroup,
}

const add_markers_to_map = function() {
  // Remove old layer of markers
  if (map.markers) map.container.removeLayer(map.markers)

  // Create layer with markers
  map.markers = Leaflet.layerGroup();

  // Add markers to the layer group
  props.locations.forEach((loc) => {
    (new DataMarker([loc.lat, loc.lng], loc)).bindPopup(loc.name).addTo(map.markers).on('click', (e) => {
      console.log("Someone clicked the marker at " + e.latlng);
      console.log(e.target.data)
    });
  });

  // Add the layer to the map
  map.markers.addTo(map.container);
}

const setup_leaflet = function() {
  map.container = Leaflet.map("map_container").setView(center.value, zoom.value);
  Leaflet.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      maxZoom: 19,
    }
  ).addTo(map.container);

  add_markers_to_map();

  // Renew the markers when locations change
  // watch(
  //   () => props.locations,    // Can't watch property of reactive object
  //   (locations) => {
  //     console.log('Locations changed')
  //     add_markers_to_map();
  //   },
  //   { deep: true }      // Force deep watcher
  // )

  watch(
    () => props.refreshTicker,    // Can't watch property of reactive object
    (refreshTicker) => {
      console.log('Refresh of map markers required')
      add_markers_to_map();
    },
  )
}

onMounted(() => {
  console.log("Setting up the Leaflet map");
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