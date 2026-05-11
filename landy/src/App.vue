<script setup>
import { useSmoothScroll } from './composables/useSmoothScroll'
import { defineAsyncComponent } from 'vue'

import Herosection from './components/sections/Herosection.vue'
import NavBar from './components/layouts/NavBar.vue'
import MenuOverlay from './components/layouts/MenuOverlay.vue'

// Lazy load components below the fold
const AboutUs = defineAsyncComponent(() => import('./components/sections/AboutUs.vue'))
const Discover = defineAsyncComponent(() => import('./components/sections/Discover.vue'))
const MainCars = defineAsyncComponent(() => import('./components/sections/MainCars.vue'))
const ModelsSection = defineAsyncComponent(() => import('./components/sections/ModelsSection.vue'))
const HeritageSection = defineAsyncComponent(() => import('./components/sections/HeritageSection.vue'))
const DriftCars = defineAsyncComponent(() => import('./components/sections/DriftCars.vue'))
const ServicesSection = defineAsyncComponent(() => import('./components/sections/ServicesSection.vue'))
const ContactsSection = defineAsyncComponent(() => import('./components/sections/ContactsSection.vue'))

// Initialisation globale du défilement fluide et de la synchro GSAP
useSmoothScroll()
</script>

<template>
  <MenuOverlay />
  <NavBar />
  <Herosection />
  <AboutUs />
  <Discover />
  <ModelsSection />
  <MainCars />
  <HeritageSection />
  <DriftCars />
  <ServicesSection />
  <ContactsSection />
</template>
