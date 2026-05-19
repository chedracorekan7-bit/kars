<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import car48 from "../../assets/cars/car48.png";
import car49 from "../../assets/cars/car49.png";
import car50 from "../../assets/cars/car50.png";
import car51 from "../../assets/cars/car51.png";
import car52 from "../../assets/cars/car52.png";
import car53 from "../../assets/cars/car53.png";
import car54 from "../../assets/cars/car54.png";
import car55 from "../../assets/cars/car55.png";
import car56 from "../../assets/cars/car56.png";


gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const wrapperRef = ref(null);
const activeId = ref(null);

// Collection Héritage (Sélection des véhicules cultes, avec décalages artistiques)
const models = [
  { id: 1, name: "GTO", brand: "Pontiac", img: car51, align: "md:-ml-[25vw]" },
  { id: 2, name: "SS 454", brand: "Chevrolet", img: car49, align: "md:ml-[25vw] md:mt-8" },
  { id: 3, name: "Mustang 429", brand: "Ford", img: car52, align: "md:-ml-[15vw] md:mt-20 z-20" },
  { id: 4, name: "SRT Demon", brand: "Dodge", img: car53, align: "md:ml-[30vw] md:-mt-12 z-10" },
  { id: 5, name: "Camaro ZL1", brand: "Chevrolet", img: car54, align: "md:-ml-[20vw] md:mt-12 z-30" },
  { id: 6, name: "Daytona EV", brand: "Dodge", img: car56, align: "md:ml-[10vw] md:mt-24 z-20" },
  { id: 7, name: "RT", brand: "Dodge", img: car50, align: "md:ml-[10vw] md:mt-24 z-20" },
  { id: 8, name: "Mustang", brand: "Ford", img: car55, align: "md:ml-[10vw] md:mt-24 z-20" },
  { id: 9, name: "Charger RT", brand: "Dodge", img: car48, align: "md:ml-[10vw] md:mt-24 z-20" },
];

let xTo, yTo;

onMounted(() => {
  // --- 1. MOUSE TRAIL REVEAL (GSAP QUICK-TO) ---
  // Configuration pour un suivi de curseur à 60fps, souple et hyper-réactif
  xTo = gsap.quickTo(wrapperRef.value, "x", { duration: 0.8, ease: "power3.out" });
  yTo = gsap.quickTo(wrapperRef.value, "y", { duration: 0.8, ease: "power3.out" });

  const handleMouseMove = (e) => {
    if (!sectionRef.value) return;
    
    // Position relative calculée dynamiquement dans la section
    const rect = sectionRef.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Assigne les coordonnées avec inertie
    xTo(x);
    yTo(y);
  };

  // Écoute exclusivement dans la section pour préserver les ressources CPU
  sectionRef.value.addEventListener("mousemove", handleMouseMove);

  // --- 2. ANIMATION GLOBALE D'ENTRÉE/SORTIE AU SCROLL ---
  // Apparition / Disparition générale de la section (façon AboutUs)
  const introOutroTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 75%", 
      end: "bottom 25%", 
      toggleActions: "play reverse play reverse",
    }
  });

  // Apparition en fondu et rotation 3D des lignes de typographie
  const listItems = sectionRef.value.querySelectorAll('.heritage-item');
  introOutroTl.fromTo(listItems, 
    { opacity: 0, y: 120, rotateX: -20 }, 
    { opacity: 1, y: 0, rotateX: 0, duration: 1.5, stagger: 0.1, ease: "power4.out" }
  );
});

// Lorsqu'on survole un nom de voiture
const showImage = (id) => {
  activeId.value = id;
  
  models.forEach(m => {
    const imgEl = document.getElementById(`float-img-${m.id}`);
    if (!imgEl) return;
    
    if (m.id === id) {
      // Apparition de l'image sélectionnée (Dé-floutage, Opacité, Scale up)
      gsap.to(imgEl, { opacity: 0.95, scale: 1, rotateZ: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
      gsap.to(imgEl, { filter: "blur(0px)", duration: 0.4, overwrite: "auto" });
    } else {
      // Disparition et flou théatral pour les autres (style Notch)
      gsap.to(imgEl, { opacity: 0, scale: 0.4, rotateZ: 5, duration: 0.6, ease: "power3.out", overwrite: "auto" });
      gsap.to(imgEl, { filter: "blur(15px)", duration: 0.4, overwrite: "auto" });
    }
  });
};

// Quand la souris quitte totalement la section
const hideAll = () => {
  activeId.value = null;
  
  models.forEach(m => {
    const imgEl = document.getElementById(`float-img-${m.id}`);
    if (imgEl) {
      gsap.to(imgEl, { opacity: 0, scale: 0.4, duration: 0.6, ease: "power3.out", overwrite: "auto" });
      gsap.to(imgEl, { filter: "blur(0px)", duration: 0.4, overwrite: "auto" }); // On retire le blur pour la prochaine appariton
    }
  });
};
</script>

<template>
  <section 
    ref="sectionRef" 
    id="heritage" 
    class="relative w-full min-h-screen md:min-h-[140vh] bg-transparent text-white flex flex-col justify-center items-center overflow-hidden py-32 z-20" 
    @mouseleave="hideAll"
  >
    
    <!-- Surtitre Premium -->
    <div class="absolute top-[10%] left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-50">
       <span class="w-8 h-[1px] bg-white"></span>
       <p class="text-gray-400 uppercase tracking-[0.3em] text-[10px] md:text-xs  font-bold"> modeles</p>
       <span class="w-8 h-[1px] bg-white"></span>
    </div>

    <!-- WRAPPER DES IMAGES (Flotte au bout du pointeur - Masqué sur Mobile) -->
    <!-- z-0 pour se retrouver DERRIERE les textes -->
    <div 
      ref="wrapperRef" 
      class="hidden md:block absolute top-0 left-0 w-0 h-0 pointer-events-none z-0"
    >
      <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px]">
        <img 
          v-for="model in models" 
          :key="'bg-'+model.id"
          :id="'float-img-'+model.id"
          :src="model.img" 
          class="absolute inset-0 w-full h-full object-contain opacity-0 scale-50 drop-shadow-[0_40px_70px_rgba(0,0,0,0.9)]"
          style="will-change: transform, opacity, filter;"
        />
      </div>
    </div>

    <!-- LA LISTE TYPOGRAPHIQUE INTERACTIVE -->
    <!-- z-10 pour passer devant les images. 'group/list' permet de griser la liste entière quand un élément est survolé -->
    <ul class="flex flex-col items-center justify-center w-full z-10 mt-12 md:mt-24 group/list">
      <li 
        v-for="model in models" 
        :key="model.id"
        @mouseenter="showImage(model.id)"
        :class="[
          'heritage-item group relative text-center w-full cursor-pointer py-3 md:py-5 transition-[opacity,transform] duration-500 hover:!opacity-100 group-hover/list:opacity-[0.10]',
          model.align
        ]"
        style="perspective: 1000px; transform-style: preserve-3d;"
      >
        <!-- Texte Desktop (Énorme, asymétrique et épuré) -->
        <h3 
          class="text-[14vw] md:text-[9vw] font-black uppercase tracking-tighter leading-[0.85] mix-blend-difference" 
          style="font-family: 'Clash Display', 'Satoshi', sans-serif; position: relative; z-index: 50;"
        >
          <!-- Animation de Stroke et de l'espacement (Tracking) au hover combinée au GSAP image reveal -->
          <span 
            class="block transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] text-transparent group-hover:scale-[1.03] group-hover:tracking-widest"
            style="-webkit-text-stroke: 1px rgba(255,255,255,0.3);"
            :class="{'!text-transparent': activeId === model.id}"
            :style="activeId === model.id ? '-webkit-text-stroke: 1px rgba(255,255,255,1);' : ''"
          >
            {{ model.name }}
          </span>
        </h3>
        
        <!-- Variante Mobile : Sous-titre Marque -->
        <p v-show="activeId === model.id" class="md:hidden text-xs text-gray-400 uppercase tracking-widest mt-3 opacity-0 animate-fade-in pointer-events-none">
          {{ model.brand }}
        </p>
        
        <!-- Variante Mobile : Image apparaît organiquement sous le texte -->
        <div 
          class="md:hidden overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] flex justify-center" 
          :class="activeId === model.id ? 'h-[250px] mt-6 opacity-100' : 'h-0 mt-0 opacity-0'"
        >
          <img :src="model.img" class="h-full object-contain pointer-events-none drop-shadow-2xl" />
        </div>
      </li>
    </ul>

  </section>
</template>

<style scoped>
/* Keyframe CSS locale pour un fondu asynchrone sur les petits textes mobiles */
.animate-fade-in {
  animation: fadeIn 1s forwards cubic-bezier(0.76, 0, 0.24, 1) 0.3s;
}
@keyframes fadeIn {
  to { opacity: 1; }
}

/* Optimisation de la performance de mix-blend pour les configurations lourdes */
h3 {
  will-change: transform;
  backface-visibility: hidden;
}
</style>
