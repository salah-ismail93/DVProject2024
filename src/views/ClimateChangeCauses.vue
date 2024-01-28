<template>
  <!-- GHG Chart -->
  <div class="bg-white px-6 py-16 lg:px-8 py-22 main" id="ClimateChangeCauses">
    <div class="mx-auto max-w-5xl text-center">
      <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">Climate Change Causes</h2>
    </div>
    <div class="mx-auto max-w-5xl">
      <div class="bg-white px-6 lg:px-8 text-center">
        <div class="mx-auto max-w-5xl">
          <p class="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 text-center">
            Human activities since the beginning of the Industrial Revolution have increased atmospheric methane
            concentrations
            by over 150% and carbon dioxide by over 50%, up to a level not seen in over 3 million years.
            <strong>Greenhouse gases(GHG)</strong> are the gases in the atmosphere that raise the surface temperature of
            planets such as the Earth.
            What distinguishes them from other gases is that they absorb the wavelengths of radiation that a planet emits,
            resulting in the greenhouse effect.
          </p>
          <p class="mt-4 text-base leading-7 text-indigo-600 sm:text-2xl">1900-2020</p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <GHGSectors />
      </div>
    </div>
  </div>
  <div class="bg-indigo-100">
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <GHGCountries />
      </div>
    </div>
  </div>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 pt-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <GHGGases />
      </div>
    </div>
  </div>
  <div class="bg-indigo-100">
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <CO2EmissionsRace />
      </div>
    </div>
  </div>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <CO2EmissionsVSGDP />
      </div>
    </div>
  </div>
  <div class="bg-indigo-100">
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8 flex justify-center">
      <div class="flex justify-center">
        <CO2AverageCapitaEmissions />
      </div>
    </div>
  </div>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8 flex justify-center">
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

<style></style>