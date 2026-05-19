<script setup>
import { ref } from 'vue'
import { useSmoothScroll } from './composables/useSmoothScroll'
import { isAppLoaded } from './composables/useLoader'
import Preloader from './components/layouts/Preloader.vue'
import Herosection from './components/sections/Herosection.vue'
import NavBar from './components/layouts/NavBar.vue'
import MenuOverlay from './components/layouts/MenuOverlay.vue'

import AboutUs from './components/sections/AboutUs.vue'
import Discover from './components/sections/Discover.vue'
import MainCars from './components/sections/MainCars.vue'
import ModelsSection from './components/sections/ModelsSection.vue'
import HeritageSection from './components/sections/HeritageSection.vue'
import DriftCars from './components/sections/DriftCars.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import ContactsSection from './components/sections/ContactsSection.vue'

// État local pour démonter le preloader
const showPreloader = ref(true)

const handlePreloaderComplete = () => {
  isAppLoaded.value = true;
  setTimeout(() => {
    showPreloader.value = false;
  }, 500);
}

// Initialisation globale du défilement fluide et de la synchro GSAP
useSmoothScroll()
</script>

<template>
  <Preloader v-if="showPreloader" @complete="handlePreloaderComplete" />
  
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
