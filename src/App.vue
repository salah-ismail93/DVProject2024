<template>
  <div class="flex flex-col min-h-screen font-Roboto mr-30 main">
    <div class="background-div">
      <HeaderComponent />
      <HomeView />
    </div>
    <WorldTemperature />
    <ClimateChangeCauses />
    <WorldContribution />
  </div>
  <button v-show="isButtonVisible" @click="scrollToTop"
    class="fixed bottom-5 right-5 rounded-full bg-red-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg"
    id="btn-back-to-top">
    <svg aria-hidden="true" focusable="false" data-prefix="fas" class="h-4 w-4" role="img"
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill="currentColor"
        d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z">
      </path>
    </svg>
  </button>
</template>
<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import HomeView from './views/HomeView.vue'
import WorldTemperature from './views/WorldTemperature.vue'
import ClimateChangeCauses from './views/ClimateChangeCauses.vue'
import WorldContribution from './views/WorldContribution.vue'

export default {
  name: "App",
  components: {
    HeaderComponent,
    HomeView,
    WorldTemperature,
    ClimateChangeCauses,
    WorldContribution
  },
  data() {
    return {
      isButtonVisible: false,
    };
  },
  mounted() {
    // Add a scroll event listener to the window to trigger the scrollFunction
    window.addEventListener("scroll", this.scrollFunction);
  },
  beforeMount() {
    // Remove the scroll event listener when the component is destroyed
    window.removeEventListener("scroll", this.scrollFunction);
  },
  methods: {
    // Function to handle the scroll behavior
    scrollFunction() {
      this.isButtonVisible =
        document.body.scrollTop > 6000 ||
        document.documentElement.scrollTop > 6000;
    },
    // Function to scroll back to the top
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.mr-20 {
  margin-right: 10rem;

}

.main {
  background: #f4f4f4;


}

.background-div {
  background-image: url('/intro_image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.background-div::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5%;
  background: linear-gradient(to bottom, transparent, #ffffff);
}
</style>