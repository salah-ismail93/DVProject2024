<template>
    <!-- World Temperature Map Chart -->
    <div class="bg-white px-6 lg:px-8 py-16 main" id="WorldTemperature">
      <div class="mx-auto max-w-5xl text-center">
        <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">World Temperature</h2>
      </div>
      <div class="mx-auto max-w-5xl">
        <div class="bg-white px-6 lg:px-8 text-center">
          <div class="mx-auto max-w-5xl">
            <p class="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 text-center">
              A new dataset containing information on 5.6 million trees from 63 major US cities has been compiled, including
              details on location, species, nativity, health, and more.
            </p>
            <p class="mt-4 text-base leading-7 text-indigo-600 sm:text-2xl">1900-2020</p>
          </div>
        </div>
      </div>
    </div>
  
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8 flex justify-center">
        <div class="flex justify-center">
          <WorldTemperatureMap />
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="flex justify-center">
        <div class="flex justify-center">
          <WorldTemperatureTimeline />
        </div>
      </div>
    </div>
  </template>
  <script>
  import WorldTemperatureMap from '../components/WorldTemperatureMap.vue';
  import WorldTemperatureTimeline from '../components/WorldTemperatureTimeline.vue';
  export default {
    name: 'WorldTemperature',
    components: {
      WorldTemperatureMap,
      WorldTemperatureTimeline
    },
  };
  </script>
  
  <style>
  
  </style>