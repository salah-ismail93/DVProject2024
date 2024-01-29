<template>
  <!-- Heat Map Contribution Chart -->
  <div class="bg-white px-6 lg:px-8 py-22 main" id="WorldContribution">
    <div class="mx-auto max-w-5xl text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">------------------ World Contribution ------------------</h1>
    </div>
    <div class="mx-auto max-w-5xl">
      <div class="bg-white px-6 lg:px-8 text-center">
        <div class="mx-auto max-w-5xl">
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

<style scoped>
h1{
  font-family: "Roboto";
  color:green
}
</style>