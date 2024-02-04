<template>
    <div class="flex items-center justify-center " style="margin-top:50px">
      <div class="flex-auto flex-auto max-w-sm mx-10 mx-10" >
        <h1 class="text-4xl font-bold mb-4 text-center text-green-800">Climate Change & Global Warming</h1>
        <p class="text-lg leading-7 text-left text-gray-600">
          Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels (like coal, oil and gas), which produces heat-trapping gases.
        </p>
      </div>
      <div class="flex-auto mx-10">
        <img src="@/assets/infograph2.png" alt="Infographic"  />
      </div>
    </div>

     
  </template>
  
  <script>
  export default {
    name: 'IntroToStory',
  }
  </script>
  
  <style>
  /* Add your component-specific styles here */
  h1 {
    font-family: 'Fantasy', sans-serif;
  }
  
  .text-4xl {
    font-size: 2.5rem;
  }
  
  .text-lg {
    font-size: 1.125rem;
  }
  
  .text-green-800 {
    color: rgb(1, 81, 48);
  }
  
  .text-gray-600 {
    color: rgb(108, 117, 125);
  }
/*   img {
  max-width: 100%;
  height: auto;
  max-height: 1000px; 
} 
*/

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
  