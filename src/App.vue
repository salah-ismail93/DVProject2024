<template>
  <div class = "flex flex-col min-h-screen font-Roboto mr-30 main" >
    <HeaderComponent/>
    <RouterView/>
  </div>
</template>
<script>
import HeaderComponent from "./components/HeaderComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent
  },
};
</script>

<style scoped>
.mr-20{
      margin-right: 10rem;

}
.main{
  background:#f4f4f4;


}
</style>