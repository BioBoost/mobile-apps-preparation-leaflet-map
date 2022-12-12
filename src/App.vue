<script setup lang="ts">
import LeafletMap from '@/components/LeafletMap.vue'
import { ref } from 'vue';
import type { Location } from '@/types/location';

const locations = ref([
  { id: '1', name: 'VIVES Xaverianen', lat: 51.18721897883223, lng: 3.2029320966172814 },
  { id: '2', name: 'Frituur Bosrand', lat: 51.187986416742454, lng: 3.209243333778497 },
  { id: '3', name: 'VIVES Station', lat: 51.1940399495556, lng: 3.2180740271685564 },
] as Location[]);

const add_location = () => {
  locations.value.push({
    id: `${locations.value.length+1}`,
    name: 'Who Knows',
    lat: locations.value[locations.value.length-1].lat + 0.005,
    lng: locations.value[locations.value.length-1].lng + 0.005
  });

  console.log(locations.value)
}
</script>

<template>
  <v-app>
    <v-main>
      <leaflet-map :locations="locations" />

      <v-card>
        <v-card-title>Add a location</v-card-title>
        <v-card-actions>
          <v-btn color="primary" @click="add_location">Add Location</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>
