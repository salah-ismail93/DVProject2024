
<template>
  <main>
    <div class="flex screen	justify-center items-center my-6">
      <h1>"Climate Insights Hub: Explore, Understand, Act"</h1>
      <!-- <info /> -->
    </div>
  </main>
</template>
<script>
//import info from "../components/info.vue";

export default {
  name: "HomeView",
  components: {
    //info
  },
};
</script>
<style scoped>
::v-deep .screen {
  height: 70.7vh;
}

::v-deep h1 {
  font-size: 4.5rem !important;
  color: #FFFFFF;
  font-family: fantasy, sans-serif;
  font-weight: 1000;
  text-shadow: 20px 20px 40px rgba(0, 0, 0, 1);
}

</style>