import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorldTemperature from '../views/WorldTemperature.vue'
import ClimateChangeCauses from '../views/ClimateChangeCauses.vue'
import WorldContribution from '../views/WorldContribution.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/WorldTemperature',
      name: 'WorldTemperature',
      component: WorldTemperature
    },
    {
      path: '/ClimateChangeCauses',
      name: 'ClimateChangeCauses',
      component: ClimateChangeCauses
    }
    ,
    {
      path: '/WorldContribution',
      name: 'WorldContribution',
      component: WorldContribution
    }
  ]
})

export default router
