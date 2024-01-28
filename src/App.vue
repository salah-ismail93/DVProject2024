<template>
  <div class="flex flex-col min-h-screen font-Roboto mr-30 main background-div">
    <HeaderComponent />
    <info />
  </div>

  <div class="flex flex-col min-h-screen font-Roboto mr-30 main">
    <RouterView />
  </div>
</template>
<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import info from "./components/info.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    info
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