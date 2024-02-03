<template>
  <!-- GHG Chart -->
  <div class="bg-white px-6 py-16 lg:px-8 py-22 main ClimateChangeCauses" id="ClimateChangeCauses">
    <div class="max-w-10xl text-left">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">Climate Change Causes</h1>
    </div>
    <div class="max-w-10xl">
      <div class="mt-16 text-left flex justify-between">
        <div class="max-w-5xl ml-auto">
          <p class="mt-6 pl-16 max-w-2xl font-bold text-base leading-8 text-white text-left">
            Human activities since the beginning of the Industrial Revolution have increased atmospheric methane
            concentrations
            by over 150% and carbon dioxide by over 50%, up to a level not seen in over 3 million years.
            <strong>Greenhouse gases(GHG)</strong> are the gases in the atmosphere that raise the surface temperature of
            planets such as the Earth.
            What distinguishes them from other gases is that they absorb the wavelengths of radiation that a planet emits,
            resulting in the greenhouse effect.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white">
    <div class="mx-auto max-w-10xl px-6 py-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <GHGSectors />
      </div>
    </div>
  </div>
  <div class="bg-green-100">
    <div class="mx-auto max-w-10xl px-6 py-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <GHGCountries />
      </div>
    </div>
  </div>
  <div class="bg-white">
    <div class="mx-auto max-w-10xl px-6 pt-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <GHGGases />
      </div>
    </div>
  </div>
  <div class="bg-green-100">
    <div class="mx-auto max-w-10xl px-6 py-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <CO2EmissionsRace />
      </div>
    </div>
  </div>
  <div class="bg-white">
    <div class="mx-auto max-w-10xl px-6 py-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <CO2EmissionsVSGDP />
      </div>
    </div>
  </div>
  <div class="bg-green-100">
    <div class="mx-auto max-w-10xl px-6 py-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <CO2AverageCapitaEmissions />
      </div>
    </div>
  </div>
  <div class="bg-white">
    <div class="mx-auto max-w-10xl px-6 py-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <GlobalFossilFuelConsumption />
      </div>
    </div>
  </div>
</template>
<script>
import GHGSectors from '../components/GHGSectors.vue';
import GHGCountries from '../components/GHGCountries.vue';
import GHGGases from '../components/GHGGases.vue';
import CO2EmissionsRace from '../components/CO2EmissionsRace.vue';
import CO2EmissionsVSGDP from '../components/CO2EmissionsVSGDP.vue';
import CO2AverageCapitaEmissions from '../components/CO2AverageCapitaEmissions.vue';
import GlobalFossilFuelConsumption from '../components/GlobalFossilFuelConsumption.vue';
export default {
  name: 'ClimateChangeCauses',
  components: {
    GHGSectors,
    GHGCountries,
    GHGGases,
    CO2EmissionsRace,
    CO2EmissionsVSGDP,
    CO2AverageCapitaEmissions,
    GlobalFossilFuelConsumption
  },
};
</script>

<style>
.ClimateChangeCauses {
  background-image: url('/causes.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 600px;
  position: relative;
}

/*.ClimateChangeCauses::before,
.ClimateChangeCauses::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 5%;
}

.ClimateChangeCauses::before {
  top: 0; 
  background: linear-gradient(to top, transparent, #ffffff);
}

.ClimateChangeCauses::after {
  bottom: 0; 
  background: linear-gradient(to bottom, transparent, #ffffff);
}*/

.ClimateChangeCauses h1 {
  color: #fff; /* Text color */
  font-size: 4em !important; /* Adjust the font size */
  font-weight: bold;
  text-align: right;
  text-shadow: 20px 20px 40px rgba(0, 0, 0, 1); /* Add a subtle text shadow for better visibility */
}
.bg-green-100{
  --tw-bg-opacity: 1;
  background-color: rgb(221 249 226 / var(--tw-bg-opacity));
}
</style>