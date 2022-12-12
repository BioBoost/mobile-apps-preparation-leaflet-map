<script setup lang="ts">
import LeafletMap from '@/components/LeafletMap.vue'
import { ref } from 'vue';
import type { Location } from '@/types/location';

const locations = ref([
  { id: '1', name: 'VIVES Xaverianen', lat: 51.18721897883223, lng: 3.2029320966172814 },
  { id: '2', name: 'Frituur Bosrand', lat: 51.187986416742454, lng: 3.209243333778497 },
  { id: '3', name: 'VIVES Station', lat: 51.1940399495556, lng: 3.2180740271685564 },
] as Location[]);
</script>

<template>
  <v-app>
    <v-main>
      <leaflet-map :locations="locations" />
    </v-main>
  </v-app>
</template>
