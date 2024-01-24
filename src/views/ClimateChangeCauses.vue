<template>
    <!-- GHG Chart -->
    <div class="bg-white px-6 lg:px-8 py-22 main">
      <div class="mx-auto max-w-5xl text-center">
        <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">Climate Change Causes</h2>
      </div>
      <div class="mx-auto max-w-5xl">
        <div class="bg-white px-6 lg:px-8 text-center">
          <div class="mx-auto max-w-5xl">
            <p class="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 text-center">
              Human activities since the beginning of the Industrial Revolution have increased atmospheric methane concentrations
              by over 150% and carbon dioxide by over 50%, up to a level not seen in over 3 million years.
              <strong>Greenhouse gases(GHG)</strong> are the gases in the atmosphere that raise the surface temperature of planets such as the Earth.
              What distinguishes them from other gases is that they absorb the wavelengths of radiation that a planet emits,
              resulting in the greenhouse effect.
            </p>
            <p class="mt-4 text-base leading-7 text-indigo-600 sm:text-2xl">1900-2020</p>
          </div>
        </div>
      </div>
    </div>
  
    <div>
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">
          Select a tab
        </label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select id="tabs" name="tabs" v-model="selectedTab"
          class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <option v-for="tab in tabs" :key="tab.name" :value="tab.name">
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="{
              'border-indigo-500 text-indigo-600': tab.current,
              'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !tab.current,
              'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium': true,
            }" :aria-current="tab.current ? 'page' : undefined" @click.prevent="selectTab(tab)">
              {{ tab.name }}
            </a>
          </nav>
        </div>
      </div>
      <!-- Your tab content goes here -->
      <div v-show="selectedTab === 'GHG by Sectors'">
        <!-- Content for GHG by Sectors Tab -->
        <GHGSectors />
      </div>
      <div v-show="selectedTab === 'GHG by Countries'">
        <!-- Content for GHG by Countries Tab -->
        <GHGCountries />
      </div>
      <div v-show="selectedTab === 'GHG by Gases'">
        <!-- Content for GHG by Gases Tab -->
        <GHGGases />
      </div>
      <div v-show="selectedTab === 'CO2 Emissions Race'">
        <!-- Content for CO2 Emissions Race Tab -->
        <CO2EmissionsRace />
      </div>
      <div v-show="selectedTab === 'CO2 Emissions VS GDP'">
        <!-- Content for CO2 Emissions VS GDP Tab -->
        <CO2EmissionsVSGDP />
      </div>
    </div>
  </template>
  <script>
  import GHGSectors from '../components/GHGSectors.vue';
  import GHGCountries from '../components/GHGCountries.vue';
  import GHGGases from '../components/GHGGases.vue';
  import CO2EmissionsRace from '../components/CO2EmissionsRace.vue';
  import CO2EmissionsVSGDP from '../components/CO2EmissionsVSGDP.vue';
  export default {
    name: 'ClimateChangeCauses',
    components: {
      GHGSectors,
      GHGCountries,
      GHGGases,
      CO2EmissionsRace,
      CO2EmissionsVSGDP
    },
    data() {
      return {
        tabs: [
          { name: 'GHG by Sectors', href: '#', current: true },
          { name: 'GHG by Countries', href: '#', current: false },
          { name: 'GHG by Gases', href: '#', current: false },
          { name: 'CO2 Emissions Race', href: '#', current: false },
          { name: 'CO2 Emissions VS GDP', href: '#', current: false },
        ],
        selectedTab: 'GHG by Sectors',
      };
    },
    methods: {
      selectTab(tab) {
        this.tabs.forEach((t) => {
          t.current = t.name === tab.name;
          this.selectedTab = tab.name;
        });
      },
    },
  };
  </script>
  
  <style>
  
  </style>