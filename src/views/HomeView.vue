
<template>
  <main>
    <div class="flex screen	justify-center items-center my-6">
      <div class="flex-auto hero m-auto self-center">
        <h1 class="Text">Climate change & Global warming <img src="../assets/developer.png" class="king"></h1>
      </div>
      <div class="flex-auto my-auto mx-10 self-center">
        <p class="text-center">Climate change refers to long-term shifts in temperatures and weather patterns.
          These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change,
           primarily due to the burning of fossil fuels (like coal, oil and gas), which produces heat-trapping gases.</p>
      </div>
      <info />
    </div>
  </main>
</template>
<script>
import info from "../components/info.vue";

export default {
  name: "HomeView",
  components: {
    info
  },
};
</script>
<style>
.screen {
  height: 70vh;
}

.hero {
  margin-top: 5px;
  width: 100rem;
}

.hero h1 {
  text-align: center;
  font-family: fantasy;
  font-size: 2em;
  color: brown
}

.arrow {
  text-align: center;
  display: relative;
  width: 10%;
  margin-left: 80%;
  transform: rotate(-45deg);

}

.king {
  text-align: center;
  display: relative;
  width: 20%;
  margin-left: 40%;

}
</style>