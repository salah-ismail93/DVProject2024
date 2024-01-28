
<template>
  <main>
    <div class="flex screen	justify-center items-center">
      <div class="flex-auto hero m-auto self-center">
       <img src="../assets/globe2.gif" class="king">
      </div>
      <div class="flex-auto my-auto mx-10 self-center">
        <h1 class="Text">Climate change & Global warming </h1>
        <p class="text-left"><br>
          Climate change refers to long-term shifts in temperatures and weather patterns.
          These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change,
           primarily due to the burning of fossil fuels (like coal, oil and gas), which produces heat-trapping gases.</p>
      </div>
      
    </div>
    <h1 class="text-center mText">What a long time!</h1>
    <div class="flex-auto my-auto mx-10 self-center">
      <img src="/src/assets/infograph2.png" alt="">
      </div>
  </main>
</template>

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
.mText{
  font-size:2em !important;
  color:rgb(3, 67, 3)
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
  margin-left:20%;

}
</style>