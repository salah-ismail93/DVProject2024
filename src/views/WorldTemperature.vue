<template>
    <!-- World Temperature Map Chart -->
    <div class="bg-white px-6 lg:px-8 pt-16 main" id="WorldTemperature">
      <div class="mx-auto max-w-5xl text-center">
        <h1 class="text-4xl font-bold tracking-tight sm:text-4xl">World Temperature is rising!</h1>
      </div>
      <div class="mx-auto max-w-5xl">
        <div class="bg-white px-6 lg:px-8 text-center">
          <div class="mx-auto max-w-5xl">
            <p class="mx-auto mt-6 max-w-4xl text-base leading-8 text-gray-600 text-left">
             Let's start with a global look at the world temperature over the last 120 years,
             in the below dynamic map, you can notice the changing in the average temperature over the years for the selected month in each country.
             <br>In the the <b>radar chart</b> we notice that over the years we can notice how differences between temperatures are increasing.
             It's obvious how each year we see a raise in the temperature.
             After the chart finishes drawing, it's clear that the temperature raised by almost 2 degree in the last 120 years.
             <br><b>You can pause the slider to 
             select the month and year you want to investigate more.
            </b></p>
            <p class="mt-4 text-base leading-7 text-black-600 sm:text-2xl">Enjoy our interactive map!</p>
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
    <div class="overlayColor">
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