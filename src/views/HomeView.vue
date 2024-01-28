
<template>
  <main>
    <div class="flex screen	justify-center items-center my-6">
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

h1 {
  text-align: center;
  font-family: fantasy;
  font-size: 2em !important;
  color: rgb(1, 81, 48)
}

.mText {
  font-size: 2em !important;
  color: rgb(3, 67, 3)
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
  width: 60%;
  margin-left: 20%;

}
</style>