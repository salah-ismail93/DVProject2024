<template>
  <!-- Heat Map Contribution Chart -->
  <div class="bg-white px-6 lg:px-8 py-22 main">
    <div class="mx-auto max-w-5xl text-center">
      <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">World Contribution</h2>
    </div>
    <div class="mx-auto max-w-5xl">
      <div class="bg-white px-6 lg:px-8 text-center">
        <div class="mx-auto max-w-5xl">
          <p class="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 text-center">
            A new dataset containing information on 5.6 million trees from 63 major US cities has been compiled, including
            details on location, species, nativity, health, and more.
          </p>
          <p class="mt-4 text-base leading-7 text-indigo-600 sm:text-2xl">In Europe</p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-16 lg:flex lg:items-center lg:justify-between lg:px-8">
      <div class="flex">
        <div class="charts">
          <!-- Content for Heat Map Contribution Tab -->
          <HeatMapContribution />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeatMapContribution from '../components/HeatMapContribution.vue';
export default {
  name: 'WorldContribution',
  components: {
    HeatMapContribution
  }
};
</script>

<style></style>