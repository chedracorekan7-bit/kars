<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/vue';
import car30 from "../../assets/cars/car30.png";
import car45 from "../../assets/cars/car45.png";
import car42 from "../../assets/cars/car42.png";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);

onMounted(() => {
  const texts = gsap.utils.toArray('.slide-text');
  const slides = gsap.utils.toArray('.slide-img');
  const innerImgs = gsap.utils.toArray('.js-img');
  const dots = gsap.utils.toArray('.active-dot');
  
  // 1. Initial State (Masquer tous sauf le premier)
  // 1. Initial State (Masquer tous sauf le premier)
  // Textes
  gsap.set(texts[0], { autoAlpha: 1, y: 0, x: 0 }); // Slide 1 normal
  gsap.set(texts[1], { autoAlpha: 0, y: 0, x: 150 }); // Slide 2 décalé à droite
  gsap.set(texts[2], { autoAlpha: 0, y: 0, x: -150 }); // Slide 3 décalé à gauche

  // Images ClipPaths
  // Slide 1 visuel plein
  gsap.set(slides[0], { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
  // Slide 2 caché sur la bordure DROITE
  gsap.set(slides[1], { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" });
  // Slide 3 caché sur la bordure GAUCHE
  gsap.set(slides[2], { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" });

  gsap.set(innerImgs[0], { scale: 1 });
  gsap.set(innerImgs[1], { scale: 1.2 });
  gsap.set(innerImgs[2], { scale: 1.2 });

  gsap.set(dots, { scale: 0 });
  gsap.set(dots[0], { scale: 1 });

  // 2. Timeline d'Épinglage (Pin)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      pin: true,
      scrub: 1,      // Interopérabilité lisse avec Lenis
      start: "top top",
      // +=400% car on ajoute un espace de scroll supplémentaire pour la disparition complète
      end: "+=400%", 
    }
  });

  // --- 1ère SÉQUENCE : Slide 1 -> Slide 2 (Arrive par la droite) ---
  tl.to(texts[0], { x: -150, autoAlpha: 0, duration: 1 })
    // Le masquage de l'image 1 part vers la gauche
    .to(slides[0], { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", duration: 1 }, "<")
    
    // Révélation de l'image 2 DEPUIS LA DROITE
    .to(slides[1], { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1 }, "<")
    .to(innerImgs[1], { scale: 1, duration: 1 }, "<")
    // Apparition du Texte 2 depuis la droite
    .to(texts[1], { x: 0, autoAlpha: 1, duration: 1 }, "<0.2")
    
    .to(dots[0], { scale: 0, duration: 0.3 }, "<")
    .to(dots[1], { scale: 1, duration: 0.3 }, "<0.5");

  tl.to({}, {duration: 0.5}); // Pause confortable sur le Slide 2

  // --- 2ème SÉQUENCE : Slide 2 (Repart à droite) -> Slide 3 (Arrive par la gauche) ---
  tl.to(texts[1], { x: 150, autoAlpha: 0, duration: 1 })
    // Slide 2 se rétracte vers la DROITE
    .to(slides[1], { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", duration: 1 }, "<")
    
    // Révélation de l'image 3 DEPUIS LA GAUCHE
    .to(slides[2], { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1 }, "<")
    .to(innerImgs[2], { scale: 1, duration: 1 }, "<")
    // Apparition du Texte 3 depuis la gauche
    .to(texts[2], { x: 0, autoAlpha: 1, duration: 1 }, "<0.2")

    .to(dots[1], { scale: 0, duration: 0.3 }, "<")
    .to(dots[2], { scale: 1, duration: 0.3 }, "<0.5");

  tl.to({}, {duration: 0.5}); // Pause confortable sur le Slide 3

  // --- 3ème SÉQUENCE : Slide 3 (Disparition finale vers la gauche) ---
  tl.to(texts[2], { x: -150, autoAlpha: 0, duration: 1 })
    // Slide 3 se rétracte vers la GAUCHE
    .to(slides[2], { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", duration: 1 }, "<")
    .to(dots[2], { scale: 0, duration: 0.3 }, "<");

  // Petite pause avant de laisser l'utilisateur descendre vers la section suivante (dans le vide absolu de cette section)
  tl.to({}, {duration: 0.5}); 

  // 3. Animation du Parallaxe Textuel en arrière-plan massive
  gsap.to(".bg-discover-text", {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    },
    y: -250
  });
});
</script>

<template>
  <section ref="sectionRef" id="discover" class="relative w-full h-screen bg-transparent text-white flex items-center overflow-hidden z-20 ">
     
    <!-- Arrière-plan Typographique Massive (Effet de profondeur) -->
    <div class="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0 overflow-hidden">
      <h2 class="bg-discover-text text-[28vw] md:text-[20vw] font-black uppercase whitespace-nowrap text-white" style="font-family: 'Clash Display', sans-serif;">
        Discover
      </h2>
    </div>

    <!-- Puits de navigation sur la droite (Dots Slider Indicator) -->
    <div class="absolute right-3 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 lg:gap-6 z-30">
      <div v-for="i in 3" :key="i" class="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-white/20 relative">
        <!-- Dot de surbrillance Scale Animé -->
        <div class="active-dot absolute inset-0 bg-white rounded-full"></div>
      </div>
    </div>

    <!-- Grille de structure Centrale (Image Gauche / Texte Droite) -->
    <div class="relative z-10 w-full max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32 items-center h-[80vh]">
      
      <!-- Colonne d'Image -->
      <div class="relative w-full h-[45vh] lg:h-[70vh] overflow-hidden flex items-center justify-center filter drop-shadow-2xl brightness-90">
        
        <!-- Image 1 -->
        <div class="slide-img absolute inset-0 w-full h-full">
          <img :src="car30" alt="Design Premium" class="js-img w-full h-full object-contain">
        </div>
        
        <!-- Image 2 -->
        <div class="slide-img absolute inset-0 w-full h-full">
          <img :src="car45" alt="Ingénierie Moteur" class="js-img w-full h-full object-contain">
        </div>
        
        <!-- Image 3 -->
        <div class="slide-img absolute inset-0 w-full h-full">
          <img :src="car42" alt="Sensation Vitesse" class="js-img w-full h-full object-contain">
        </div>

        <div class="absolute inset-0 bg-black/20 z-10 hidden lg:block"></div>
      </div>

      <!-- Colonne de Texte (Conteneur absolu pour faire le crossfade) -->
      <div class="relative w-full h-[35vh] lg:h-full flex flex-col justify-center text-center lg:text-left">
        
        <!-- Contenu 1 -->
        <div class="slide-text absolute inset-y-0 left-0 w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <div class="flex items-center gap-4 mb-4 lg:mb-8">
            <Icon icon="lucide:gem" class="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
            <h3 class="text-3xl sm:text-4xl lg:text-6xl font-bold uppercase tracking-tighter text-white" style="font-family: 'Clash Display', sans-serif;">Brut</h3>
          </div>
          <p class="text-sm sm:text-base lg:text-xl text-gray-400 font-light leading-relaxed mb-8 max-w-md">
            L'excellence n'admet aucun compromis. Un chef-d'œuvre sculptural pensé pour éblouir et traverser les époques.
          </p>
        </div>

        <!-- Contenu 2 -->
        <div class="slide-text absolute inset-y-0 left-0 w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <div class="flex items-center gap-4 mb-4 lg:mb-8">
            <Icon icon="lucide:cpu" class="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
            <h3 class="text-3xl sm:text-4xl lg:text-6xl font-bold uppercase tracking-tighter text-white" style="font-family: 'Clash Display', sans-serif;">Engineering</h3>
          </div>
          <p class="text-sm sm:text-base lg:text-xl text-gray-400 font-light leading-relaxed mb-8 max-w-md">
            Une architecture mécanique poussée à l'extrême. Chaque composant est calibré au millimètre pour pulvériser l'asphalte.
          </p>
        </div>

        <!-- Contenu 3 -->
        <div class="slide-text absolute inset-y-0 left-0 w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <div class="flex items-center gap-4 mb-4 lg:mb-8">
            <Icon icon="lucide:flame" class="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
            <h3 class="text-3xl sm:text-4xl lg:text-6xl font-bold uppercase tracking-tighter text-white" style="font-family: 'Clash Display', sans-serif;">Adrenaline</h3>
          </div>
          <p class="text-sm sm:text-base lg:text-xl text-gray-400 font-light leading-relaxed mb-8 max-w-md">
            Ressentez l'ivresse et l'insolence de la vitesse pure à chaque accélération. La passion automobile sublimée.
          </p>
        </div>
      </div>

    </div>

    

  </section>
</template>
