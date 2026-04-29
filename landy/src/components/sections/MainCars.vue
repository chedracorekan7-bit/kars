<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import car18 from "../../assets/cars/car18.png";
import car1 from "../../assets/cars/car1.png";
import car10 from "../../assets/cars/car10.png";
import car3 from "../../assets/cars/car3.png";
import car4 from "../../assets/cars/car4.png";
import car5 from "../../assets/cars/car5.png";
import car6 from "../../assets/cars/car6.png";
import car7 from "../../assets/cars/car7.png";
import car25 from "../../assets/cars/car25.png";
import car26 from "../../assets/cars/car26.png";
import car34 from "../../assets/cars/car34.png";
import car35 from "../../assets/cars/car35.png";
import car22 from "../../assets/cars/car22.png";
import car43 from "../../assets/cars/car43.png";
import car17 from "../../assets/cars/car17.png";
import car24 from "../../assets/cars/car24.png";
import car44 from "../../assets/cars/car44.png";
import car36 from "../../assets/cars/car36.png";
import car14 from "../../assets/cars/car14.png";
import car16 from "../../assets/cars/car16.png";


gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const containerRef = ref(null);
const topSlider = ref(null);
const bottomSlider = ref(null);

const topCars = [car18, car10, car4, car5, car6, car7, car1, car10, car3, car4, car5, car6, car7];
const bottomCars = [car25, car26,car3, car34, car35, car22, car43, car17, car24, car44, car36, car14, car16];

const sentence1 = "Parce qu'il n'a jamais été question de voiture mais du statut social auquel vous aspirez.";
const sentence2 = "Chaque véhicule est concu pour ceux qui veulent élever leurs standards et affirmer leur personnalité.";

const words1 = sentence1.split(' ');
const words2 = sentence2.split(' ');

onMounted(() => {
  const wordElements = gsap.utils.toArray('.reveal-word');
  
  // Timeline maîtresse avec épinglage (La section est bloquée pendant 4x sa hauteur)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      pin: true,
      start: "top top",
      end: "+=400%", // Durée du scroll prolongée pour laisser le temps de lire
      scrub: 1, // Fluidité liée au défilement
    }
  });

  // 1. Défilement Infini des Galeries (Sliders) - Tournent pendant toute la première partie de la timeline (durée: 80)
  // TOP Slider : Se déplace de la droite vers la gauche
  tl.fromTo(topSlider.value, 
    { x: "30vw" }, 
    { x: "-80vw", ease: "none", duration: 80 }, 
  0);

  // BOTTOM Slider : Se déplace de la gauche vers la droite
  tl.fromTo(bottomSlider.value, 
    { x: "-80vw" }, 
    { x: "30vw", ease: "none", duration: 80 }, 
  0);

  // 2. Surbrillance Séquentielle des Mots (Sans brillant extrême)
  tl.fromTo(wordElements, 
    { color: "#1a1a1a" }, 
    { 
      color: "#ffffff", 
      stagger: { each: 80 / wordElements.length }, 
      ease: "power2.inOut",
      duration: 5
    }, 
  0);

  // 3. Disparition Évanescente de la Section complète
  // Se déclenche à la fin de la timeline (au marqueur temporel 80 sur 100)
  tl.to(containerRef.value, {
    opacity: 0,
    filter: "blur(10px)", // Petit effet de flou luxueux avant disparition
    duration: 20,
    ease: "power2.inOut"
  }, 80);

});
</script>

<template>
  <!-- On applique l'épinglage sur la <section> mère -->
  <section ref="sectionRef" id="maincars" class="relative w-full h-screen bg-transparent text-white overflow-hidden z-20">
    
    <!-- On applique les opacités/flous sur le container interne pour préserver la structure GSAP -->
    <div ref="containerRef" class="relative w-full h-full flex flex-col justify-center items-center">
      
      <!-- TOP SLIDER -->
      <div class="absolute top-12 md:top-16 left-0 flex gap-4 md:gap-8 px-4 w-max pointer-events-none" ref="topSlider">
        <div v-for="(car, index) in topCars" :key="'top-'+index" class="w-[65vw] sm:w-[40vw] md:w-[25vw] h-[18vh] md:h-[22vh] shrink-0 overflow-hidden border border-white/5 rounded-sm flex items-center justify-center p-2 bg-gradient-to-tr from-white/5 to-transparent">
          <img :src="car" class="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      <!-- CENTRE : Blocs de Texte Reveal -->
      <div class="relative z-10 w-full max-w-[90vw] md:max-w-6xl mx-auto px-4 md:px-12 flex flex-col justify-center items-center h-[50vh] text-center gap-6 md:gap-12 mt-12 md:mt-0">
        
        <!-- Premier Paragraphe GÉANT -->
        <p class="flex flex-wrap justify-center gap-x-2 gap-y-1 md:gap-x-4 md:gap-y-2 text-xl sm:text-2xl md:text-2xl lg:text-4xl font-black uppercase tracking-tighter" style="font-family: 'Clash Display', sans-serif;">
          <span v-for="(word, index) in words1" :key="'w1-'+index" class="reveal-word text-[#1a1a1a]">{{ word }}</span>
        </p>
        
        <!-- Deuxième Paragraphe PLUS FIN -->
        <p class="flex flex-wrap justify-center gap-x-2 gap-y-1 md:gap-x-3 md:gap-y-2 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight" style="font-family: 'Clash Display', sans-serif;">
          <span v-for="(word, index) in words2" :key="'w2-'+index" class="reveal-word text-[#1a1a1a]">{{ word }}</span>
        </p>
      </div>

      <!-- BOTTOM SLIDER -->
      <div class="absolute bottom-12 md:bottom-16 left-0 flex gap-4 md:gap-8 px-4 w-max pointer-events-none" ref="bottomSlider">
        <div v-for="(car, index) in bottomCars" :key="'bot-'+index" class="w-[65vw] sm:w-[40vw] md:w-[25vw] h-[18vh] md:h-[22vh] shrink-0 overflow-hidden border border-white/5 rounded-sm relative flex items-center justify-center p-2 bg-gradient-to-tr from-white/5 to-transparent">
          <img :src="car" class="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Transition matérielle douce pour l'illumination du texte */
.reveal-word {
  transition: color 0.1s ease-out;
  will-change: color;
}
</style>
