# Mobile Apps - Preparation - Leaflet Maps

Leaflet is an open-source JavaScript library for mobile-friendly interactive maps.

More info can be found at [https://Leafletjs.com/](https://Leafletjs.com/).

OpenStreetMap is a collaborative project to create a free editable geographic database of the world. The geodata underlying the maps is considered the primary output of the project.

More info can be found at [https://www.openstreetmap.org/](https://www.openstreetmap.org/)

Basically while Leaflet is a framework for showing interactive maps, you still need a map provider. This is where openstreetmap comes in. Alternatives are for example GoogleMaps and Mapbox. 

## Leaflet dependency

Start by installing Leaflet as a dependency for your Vue3 project:

```bash
npm install Leaflet
```

At the moment of this writing, that would be Leaflet v1.9.3.

## Setting up a Map

The first thing we need to do is setup a component with a container where the map can be mounted.

Let's start by creating a new component called `LeafletMap`.

```vue
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
```

Important! Don't forget to add the import of the CSS file in the `main.ts` file. Otherwise the tiles will render all over the place and in the wrong order.

```ts
// ...
import "leaflet/dist/leaflet.css";
// ...
```

Next make sure to display the component somewhere and allow access to it via a route.