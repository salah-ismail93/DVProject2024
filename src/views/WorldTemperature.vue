<template>
    <!-- World Temperature Map Chart -->
    <div class="bg-white px-6 lg:px-8 pt-16 main" id="WorldTemperature">
      <div class="mx-auto max-w-5xl text-center">
        <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">World Temperature</h2>
      </div>
      <div class="mx-auto max-w-5xl">
        <div class="bg-white px-6 lg:px-8 text-center">
          <div class="mx-auto max-w-5xl">
            <p class="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 text-center">
             Let's start with a global look at the world temperature over the last 120 years,
             in the below dynamic map, you can notice the changing in the average temperature over the years in each country, you can pause the slider to 
             select the country and year you want to investigate more.
            </p>
            <p class="mt-4 text-base leading-7 text-black-600 sm:text-2xl">1900-2020</p>
          </div>
        </div>
      </div>
    </div>
  
    <div class="bg-white">
      <div class="mx-auto max-w-10xl px-6 lg:px-8 flex justify-center">
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
    <div class="bg-white">
      <div class="flex justify-center">
        <div class="flex justify-center">
          <SeaLevelRising />
        </div>
      </div>
    </div>
  </template>
  <script>
  import WorldTemperatureMap from '../components/WorldTemperatureMap.vue';
  import WorldTemperatureTimeline from '../components/WorldTemperatureTimeline.vue';
  import SeaLevelRising from '../components/SeaLevelRising.vue';
  export default {
    name: 'WorldTemperature',
    components: {
      WorldTemperatureMap,
      SeaLevelRising,
      WorldTemperatureTimeline
    },
  };
  </script>
  
  <style>
  
  </style>