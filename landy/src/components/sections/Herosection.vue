<template>
  <section ref="heroSection" class="relative w-full h-screen bg-transparent text-white flex items-center justify-center overflow-hidden z-20">
    
    <!-- Image Parallax (Background/Center) sans assombrissement -->
    <div class="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
      <img 
        ref="carImage"
        src="/hero-car.png" 
        alt="Voiture de sport de luxe Karz" 
        width="1200"
        height="800"
        fetchpriority="high"
        class="w-full md:w-full object-cover will-change-transform filter drop-shadow-2xl translate-y-12"
      />
    </div>

    <!-- Contenu Textuel -->
    <div class="relative z-10 w-full px-8 md:px-24 flex flex-col items-center text-center mt-20">
      
      <!-- Subtitle -->
      <div class="overflow-hidden mb-8">
        <p ref="subtitle" class="text-xs md:text-sm tracking-[0.4em] font-sans text-gray-400 uppercase transform translate-y-full will-change-transform">
          Vous n'êtes pas ordinaire
        </p>
      </div>

      <!-- Main Title -->
      <h1 class="font-display text-6xl md:text-[9rem] uppercase font-bold leading-[0.9] flex flex-col items-center gap-0">
        <div class="overflow-hidden">
          <span ref="title1" class="block  transform translate-y-[120%] will-change-transform">CHOISISSEZ</span>
        </div>
        <div class="overflow-hidden">
          <span ref="title2" class="block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 transform translate-y-[120%] will-change-transform pb-4">LA PUISSANCE</span>
        </div>
      </h1>

      <!-- Scroll Indicator -->
      <div class="overflow-hidden mt-16 pb-2">
        <div ref="btn" role="button" aria-label="Défiler vers le bas" tabindex="0" class="group flex flex-col items-center gap-2 cursor-pointer transform translate-y-[150%] will-change-transform opacity-70 hover:opacity-100 transition-opacity duration-500">
          <span class="text-[9px] font-sans tracking-[0.4em] uppercase text-white">Scroll</span>
          <Icon icon="lucide:chevron-down" class="w-5 h-5 text-white group-hover:animate-bounce" />
        </div>
      </div>
      
    </div>
  </section>

 
 
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heroSection = ref(null);
const carImage = ref(null);
const subtitle = ref(null);
const title1 = ref(null);
const title2 = ref(null);
const btn = ref(null);

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    
    // --------------------------------------------------
    // TIMELINE D'INTRODUCTION (Au chargement de la page)
    // --------------------------------------------------
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // 1. Apparition de l'image ("Focus") - Opacité 1 (pleine lumière) et scale normal
    tl.fromTo(carImage.value, 
      { scale: 1.4, opacity: 0, filter: 'blur(20px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 3, ease: 'power3.out' }
    );

    // 2. Révélation dramatique du texte en utilisant le mask HTML (overflow-hidden)
    tl.to([subtitle.value, title1.value, title2.value, btn.value], {
      y: '0%',
      duration: 1.5,
      stagger: 0.15, // Délai entre chaque ligne
      ease: 'expo.out'
    }, "-=2"); // "-=2" signifie "Démarrer 2 secondes avant la fin de l'animation de l'image" -> ça se superpose !

    // --------------------------------------------------
    // ANIMATION AU DÉFILEMENT (Parallaxe)
    // --------------------------------------------------
    
    // Effet Parallaxe très doux sur l'image lors du défilement
    gsap.to(carImage.value, {
      yPercent: 40, // L'image descend pendant qu'on scrolle
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true, // Lie l'animation à la vélocité exacte du scroll !
      }
    });

  }, heroSection.value); // Scope pour être sûr de ne pas cibler d'autres éléments
});

// BEST PRACTICE VUE + GSAP : Nettoyer !
onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>
