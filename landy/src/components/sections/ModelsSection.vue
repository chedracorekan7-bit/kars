<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/vue';

import car1 from "../../assets/cars/car1.png";
import car3 from "../../assets/cars/car3.png";
import car4 from "../../assets/cars/car4.png";
import car5 from "../../assets/cars/car5.png";
import car6 from "../../assets/cars/car6.png";
import car7 from "../../assets/cars/car7.png";
import car8 from "../../assets/cars/car8.png";
import car10 from "../../assets/cars/car10.png";
import car11 from "../../assets/cars/car11.png";
import car12 from "../../assets/cars/car12.png";
import car14 from "../../assets/cars/car14.png"; 
import car16 from "../../assets/cars/car16.png"; 
import car18 from "../../assets/cars/car18.png";
import car20 from "../../assets/cars/car20.png";
import car36 from "../../assets/cars/car36.png";
import car29 from "../../assets/cars/car29.png";
import car32 from "../../assets/cars/car32.png";
import car40 from "../../assets/cars/car40.png";
import car42 from "../../assets/cars/car42.png";
import car17 from "../../assets/cars/car17.png";
import car19 from "../../assets/cars/car19.png";
import car21 from "../../assets/cars/car21.png";
import car22 from "../../assets/cars/car22.png";
import car27 from "../../assets/cars/car27.png";
import car28 from "../../assets/cars/car28.png";
import car33 from "../../assets/cars/car33.png";
import car43 from "../../assets/cars/car43.png";
import car44 from "../../assets/cars/car44.png";
import car46 from "../../assets/cars/car46.png";
import car47 from "../../assets/cars/car47.png";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const sliderRef = ref(null);
const bgTextRef = ref(null);
const wrapperRef = ref(null);

// Les modèles d'exposition (intégration complète du garage /cars)
const models = [
  { id: 1, name: "Valkyrie AMR Pro", brand: "ASTON MARTIN", img: car1, hp: "1000", zeroTo100: "2.5s" },
  { id: 2, name: "Continental GT", brand: "BENTLEY", img: car3, hp: "650", zeroTo100: "3.5s" },
  { id: 3, name: "Chiron", brand: "BUGATTI", img: car4, hp: "1500", zeroTo100: "2.4s" },
  { id: 4, name: "Phantom Serenity", brand: "ROLLS-ROYCE", img: car5, hp: "620", zeroTo100: "4.5s" },
  { id: 5, name: "SF90 Stradale", brand: "FERRARI", img: car6, hp: "986", zeroTo100: "2.5s" },
  { id: 6, name: "911 GT3 RS", brand: "PORSCHE", img: car7, hp: "525", zeroTo100: "3.2s" },
  { id: 8, name: "P1", brand: "MCLAREN", img: car8, hp: "916", zeroTo100: "2.8s" },
  { id: 9, name: "Sián FKP 37", brand: "LAMBORGHINI", img: car10, hp: "819", zeroTo100: "2.8s" },
  { id: 10, name: "Aventador SVJ", brand: "LAMBORGHINI", img: car11, hp: "770", zeroTo100: "2.8s" },
  { id: 11, name: "CLA 45 S", brand: "MERCEDES BENZ", img: car14, hp: "421", zeroTo100: "4.0s" },
  { id: 12, name: "A110 Premier Édition", brand: "ALPINE", img: car16, hp: "252", zeroTo100: "4.5s" },
  { id: 13, name: "SF90 XX Stradale", brand: "FERRARI", img: car18, hp: "1016", zeroTo100: "2.3s" },
  { id: 14, name: "U9", brand: "Yangwang", img: car32, hp: "1300", zeroTo100: "2.1s" },
  { id: 15, name: "MC20", brand: "MASERATI", img: car29, hp: "630", zeroTo100: "3.4s" },
  { id: 16, name: "P1 GTR", brand: "MCLAREN", img: car20, hp: "986", zeroTo100: "2.5s" },
  { id: 17, name: "R8 V10 performance", brand: "AUDI", img: car36, hp: "620", zeroTo100: "3.2s" },
  { id: 18, name: "Pista", brand: "FERRARI", img: car40, hp: "720", zeroTo100: "2.85s" },
  { id: 19, name: "765LT Coupé", brand: "MCLAREN", img: car42, hp: "765", zeroTo100: "2.8s" },
  { id: 21, name: "Utopia", brand: "PAGANI", img: car20, hp: "864", zeroTo100: "2.8s" },
  { id: 22, name: "Venom F5", brand: "HENNESSEY", img: car19, hp: "1817", zeroTo100: "2.6s" },
  { id: 23, name: "Jesko Absolut", brand: "KOENIGSEGG", img: car21, hp: "1600", zeroTo100: "2.5s" },
  { id: 24, name: "Evija", brand: "LOTUS", img: car22, hp: "2000", zeroTo100: "2.9s" },
  { id: 26, name: "Nevera", brand: "RIMAC", img: car27, hp: "1914", zeroTo100: "1.85s" },
  { id: 27, name: "Zonda Cinque", brand: "PAGANI", img: car28, hp: "678", zeroTo100: "3.4s" },
  { id: 28, name: "Gemera", brand: "KOENIGSEGG", img: car33, hp: "1700", zeroTo100: "1.9s" },
  { id: 29, name: "Daytona SP3", brand: "FERRARI", img: car43, hp: "840", zeroTo100: "2.85s" },
  { id: 30, name: "Centodieci", brand: "BUGATTI", img: car44, hp: "1600", zeroTo100: "2.4s" },
  { id: 31, name: "LaFerrari", brand: "FERRARI", img: car46, hp: "963", zeroTo100: "2.4s" },
  { id: 32, name: "Huayra BC", brand: "PAGANI", img: car47, hp: "790", zeroTo100: "2.8s" },
  { id: 33, name: "Speedtail", brand: "MCLAREN", img: car17, hp: "1036", zeroTo100: "3.0s" },
  { id: 34, name: "Divo", brand: "BUGATTI", img: car12, hp: "1500", zeroTo100: "2.4s" },
];

onMounted(() => {
  const slider = sliderRef.value;
  
  // Fonction dynamique pour calculer de combien de pixels on doit "translater" horizontalement
  const getScrollAmount = () => -(slider.scrollWidth - window.innerWidth);

  // 1. Le Tween horizontal (le mouvement de droite à gauche)
  const tween = gsap.to(slider, {
    x: getScrollAmount,
    ease: "none",
  });

  // 2. L'animation "Reveal / Disappear" unifiée (Même mécanique que AboutUs)
  const introOutroTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 25%", // Apparaît quand on entre par le bas (75%)
      // On calcule la fin pour que la disparition s'enclenche uniquement
      // après la distance totale du pinning + le moment où la section quitte le haut
      end: () => `bottom+=${-(getScrollAmount())} 25%`, 
      toggleActions: "play reverse play reverse",
    }
  });

  // Le wrapper complet apparaît en glissant vers le haut
  introOutroTl.fromTo(wrapperRef.value,
    { opacity: 0, y: 120 },
    { opacity: 1, y: 0, duration: 1.8, ease: "power4.out" },
    0
  );

  // 3. Le Pin ! Cette fonction "gèle" la section à l'écran et la lie au scroll
  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: "top top", // Dès que la navbar touche le haut de l'écran
    end: () => `+=${slider.scrollWidth - window.innerWidth}`, // Le pinning durera le temps exact du scroll horizontal
    pin: true,        // Active le freeze de la page
    animation: tween, // Lie le mouvement horizontal de la timeline
    scrub: 0.1,      // "true" évite le "double-smoothing" avec Lenis, le défilement sera 100% instantané sur desktop
    invalidateOnRefresh: true, // Recalcule les positions lors du changement de taille d'écran
  });

  // 4. Typographie d'arrière-plan en parallaxe inverse pour la profondeur
  gsap.to(bgTextRef.value, {
    x: () => window.innerWidth * 0.5, // Bouge de la gauche vers la droite pendant le scroll
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top top",
      end: () => `+=${slider.scrollWidth - window.innerWidth}`,
      scrub: 0.1,
      invalidateOnRefresh: true,
    }
  });

});
</script>

<template>
  <!-- 
    h-screen est obligatoire pour le pinning afin que la portion épinglée 
    prenne tout l'écran, ce qui rend l'effet immersif (full size container).
  -->
  <section ref="sectionRef" id="models" class="relative w-full h-screen bg-transparent text-white overflow-hidden flex items-center z-20">
    
    <!-- Wrapper global pour l'animation d'entrée/sortie verticale -->
    <div ref="wrapperRef" class="relative w-full h-full flex items-center">
    
      <!-- Typographie géante en arrière plan (Scrolldown text) -->
    <div 
      ref="bgTextRef" 
      class="absolute top-1/2 -translate-y-1/2 left-[-20%] whitespace-nowrap text-[25vw] font-black uppercase tracking-tighter opacity-[0.03] pointer-events-none select-none mix-blend-screen"
      style="font-family: 'Clash Display', 'Satoshi', sans-serif;"
    >
      COLLECTION &nbsp; • &nbsp; KARZ &nbsp; • &nbsp; COLLECTION &nbsp; • &nbsp; KARZ
    </div>

    <!-- Le conteneur PISTE qui va glisser horizontalement -->
    <div ref="sliderRef" class="flex h-full items-center px-6 md:px-24 gap-12 md:gap-32 w-max">
      
      <!-- L'introduction du slider (Titre d'accroche sticky au début) -->
      <div class="w-[80vw] md:w-[40vw] flex flex-col justify-center shrink-0">
        <p class="text-gray-400 uppercase tracking-[0.3em] text-xs font-bold mb-6 flex items-center gap-4">
          <span class="w-8 h-[1px] bg-white"></span> La Flotte
        </p>
        <h2 class="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8" style="font-family: 'Clash Display', 'Satoshi', sans-serif;">
          Ingénierie <br>
          <span class="text-transparent" style="-webkit-text-stroke: 1px rgba(255,255,255,0.9);">Sans Limites</span>
        </h2>
        <p class="text-gray-400 text-lg font-light w-full lg:w-3/4">
          Découvrez nos chefs-d'œuvre mécaniques, des décennies d'innovation et de savoir-faire. Façonnés à la hauteur de vos attentes. Explorez l'inédit.
        </p>
        
        <!-- UI Indicateur de défilement type avion/luxe -->
        <div class="mt-16 flex items-center gap-4 text-xs tracking-widest uppercase opacity-60 w-3/4">
          <span>Défiler pour explorer</span>
          <div class="flex-1 h-[1px] bg-white/20 relative overflow-hidden">
            <div class="absolute top-0 left-0 h-full w-full bg-white origin-left translate-x-[-100%] animate-[slideRight_2s_infinite]"></div>
          </div>
        </div>
      </div>

      <!-- Les Voitures (Cards Luxe) -->
      <div 
        v-for="(model, index) in models" 
        :key="model.id" 
        class="group relative w-[85vw] md:w-[50vw] lg:w-[45vw] h-[65vh] md:h-[75vh] flex flex-col justify-end overflow-hidden cursor-pointer shrink-0"
      >
        <!-- Arrière-plan et Bordures (Effet Glass/Box) -->
        <div class="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-sm group-hover:border-white/30 transition-colors duration-700 overflow-hidden flex items-center justify-center">
          
          <!-- Lignes géométriques décoratives pour le luxe tech -->
          <div class="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20 m-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div class="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20 m-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <!-- Dégradés de fond (spotlight) -->
          <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-black/40 to-black z-0 pointer-events-none"></div>
          
          <!-- Image de la Voiture (Zoom in progressif complet au Hover) -->
          <img 
            :src="model.img" 
            :alt="model.name" 
            width="600"
            height="400"
            loading="lazy"
            class="relative z-10 w-[85%] md:w-[75%] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)] transition-transform duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1" 
          />
        </div>

        <!-- Informations Voiture (Bloc de Métadonnées) -->
        <div class="relative z-20 p-8 md:p-12 pb-10 flex flex-col gap-2 bg-gradient-to-t from-black via-black/80 to-transparent">
          <p class="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-400">{{ model.brand }}</p>
          
          <div class="flex items-end justify-between border-b border-white/10 pb-4 group-hover:border-white/40 transition-colors duration-500">
            <h3 class="text-3xl md:text-5xl font-bold tracking-tight uppercase" style="font-family: 'Clash Display', 'Satoshi', sans-serif;">{{ model.name }}</h3>
            <span class="text-xs md:text-sm font-medium tracking-widest uppercase flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
              Specs <Icon icon="lucide:arrow-up-right" class="inline w-3 h-3 md:w-4 md:h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
          
          <!-- Stats animées : ne se révèlent totalement qu'au passage de la souris ! -->
          <div class="grid grid-cols-2 gap-4 mt-6 pt-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[800ms] ease-out delay-100">
            <div>
              <p class="text-[10px] text-gray-300 uppercase tracking-widest mb-1 font-bold">Puissance brute</p>
              <p class="text-xl md:text-2xl font-light">{{ model.hp }} <span class="text-sm text-gray-300">CH</span></p>
            </div>
            <div class="border-l border-white/10 pl-6">
              <p class="text-[10px] text-gray-300 uppercase tracking-widest mb-1 font-bold">0-100 km/h</p>
              <p class="text-xl md:text-2xl font-light">{{ model.zeroTo100 }}</p>
            </div>
          </div>
        </div>
      </div>
      
      
      <!-- Un espace vide à la fin pour respirer avant la fin du Slider -->
      <div class="w-[10vw] shrink-0"></div>

    </div>
    
    </div> <!-- Fin du wrapperRef -->
  </section>
</template>

<style scoped>
/* Keyframe pure CSS injectées localement pour la ligne animée "Scrollez" */
@keyframes slideRight {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}
</style>
