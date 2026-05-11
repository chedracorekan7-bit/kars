<script setup>
import { useSmoothScroll } from './composables/useSmoothScroll'
import Herosection from './components/sections/Herosection.vue'
import AboutUs from './components/sections/AboutUs.vue'
import Discover from './components/sections/Discover.vue'
import MainCars from './components/sections/MainCars.vue'
import ModelsSection from './components/sections/ModelsSection.vue'
import HeritageSection from './components/sections/HeritageSection.vue'
import DriftCars from './components/sections/DriftCars.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import ContactsSection from './components/sections/ContactsSection.vue'
import NavBar from './components/layouts/NavBar.vue'
import MenuOverlay from './components/layouts/MenuOverlay.vue'

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
