<template>
  <header class="sticky z-30 top-0">
    <nav class="mx-auto flex items-center justify-between px-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        
        <div class="names">
          <router-link to="/">
            <p>Salah Ismail</p>
            <p>Husam Jenidi</p>
           
          </router-link>
        </div>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a @click="scrollToSection('WorldTemperature')" class="text-sm font-semibold leading-6 text-gray-900 butt"
          to="/WorldTemperature">World Temperature</a>
        <a @click="scrollToSection('ClimateChangeCauses')" class="text-sm font-semibold leading-6 text-gray-900 butt"
          to="/ClimateChangeCauses">Climate Change Causes</a>
        <a @click="scrollToSection('WorldContribution')" class="text-sm font-semibold leading-6 text-gray-900 butt">Europe
          contribution</a>
      </div>
      <div class="hidden lg:flex lg:gap-x-12 lg:flex-1 lg:justify-end">
        <a href="https://github.com/salah-ismail93/DVProject2024" target="_blank"
          class="text-sm font-semibold leading-6 text-gray-900 butt1"> Github <span aria-hidden="true">&rarr;</span></a>
        <a href="https://colab.research.google.com/drive/1TLsxtEaEJ_46qsB5GgplFFGG8l37FRmA" target="_blank"
          class="text-sm font-semibold leading-6 text-gray-900 butt1">Colab<span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <router-link to="/">Husam Jenidi and Salah Ismail</router-link>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a @click="scrollToSection('WorldTemperature')"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 butt"
                to="/WorldTemperature">World Temperature</a>
            </div>
            <div class="space-y-2 py-6">
              <a @click="scrollToSection('ClimateChangeCauses')"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 butt"
                to="/ClimateChangeCauses">Climate Change Causes</a>
            </div>
            <div class="space-y-2 py-6">
              <a @click="scrollToSection('WorldContribution')"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 butt">Europe
                Contribution</a>
            </div>
            <div class="py-6">
              <a href="https://github.com/salah-ismail93/DVProject2024"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Github</a>
            </div>
            <div class="py-6">
              <a href="https://colab.research.google.com/drive/1TLsxtEaEJ_46qsB5GgplFFGG8l37FRmA"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Data
                processing and manipulation</a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)
const scrollToSection = (sectionId) => {
  const sectionElement = document.getElementById(sectionId);

  if (sectionElement) {
    sectionElement.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.logo {
  width: 170px;
  height: 110px;
}

.names {
  margin-top: 1px;
  color: white;
}

.butt {
  background: none;
  border: 0;
  padding: 10px 20px;

  color: white;
  border-radius: 15px;
}

.butt:hover {
  
  background: rgba(15, 78, 12, 0.964);
}

.butt:selected {
  background: grey;

}

.butt1 {
  
  border: 0;
  padding: 10px 20px;

  color: white;
  border-radius: 15px;
}

.butt1:hover {
  background: rgba(15, 78, 12, 0.964);

}

header{
  background-color: rgb(0, 0, 0);
}
</style>
