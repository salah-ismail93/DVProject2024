<template>
  <!-- Heat Map Contribution Chart -->
  <div class="bg-white px-6 lg:px-8 py-22 main WorldContribution" id="WorldContribution">
    <div class="max-w-5xl text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">World Contribution</h1>
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
  <div class="bg-white">
    <div class="mx-auto max-w-full px-6 py-16 lg:flex lg:items-center lg:justify-between lg:px-8">
      <div class="flex">
        <div class="charts">
          <!-- Content for Heat Map Contribution Tab -->
          <waffleChart />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeatMapContribution from '../components/HeatMapContribution.vue';
import waffleChart from '../components/waffleChart.vue';
export default {
  name: 'WorldContribution',
  components: {
    waffleChart,
    HeatMapContribution
  }
};
</script>

<style scoped>
h1{
  font-family: "Roboto";
  color:green
}
.WorldContribution {
  background-image: url('/contribution_image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 600px;
  position: relative;
}

/*.WorldContribution::before,
.WorldContribution::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 5%;
}

.WorldContribution::before {
  top: 0;
  background: linear-gradient(to top, transparent, #ffffff);
}

.WorldContribution::after {
  bottom: 0;
  background: linear-gradient(to bottom, transparent, #ffffff);
}*/

.WorldContribution h1 {
  margin-top: 25%;
  color: #fff; /* Text color */
  font-size: 4em !important; /* Adjust the font size */
  font-weight: bold;
  text-align: left;
  text-shadow: 20px 20px 40px rgba(0, 0, 0, 1); /* Add a subtle text shadow for better visibility */
}
</style>