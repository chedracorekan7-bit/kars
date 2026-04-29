<script setup>
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMenuOpen, toggleMenu } from '../../composables/useMenu';


// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Référence pour l'animation d'entrée de la navbar
const navbarRef = ref(null);

onMounted(() => {
  // Animation GSAP douce à l'arrivée initiale
  gsap.fromTo(
    navbarRef.value,
    { yPercent: -100, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.1 }
  );

  let lastDirection = 0;

  // Logique de Smart Navbar (Fade-up / Fade-down)
  ScrollTrigger.create({
    start: 100, // S'active seulement après avoir scrollé 100px
    end: "max", // IMPORTANT: S'assure que le trigger ne s'arrête jamais, même avec les sections épinglées géantes
    onUpdate: (self) => {
      // Empêcher la navbar de se cacher si le menu Hamburger Overlay est ouvert
      if (isMenuOpen.value) return;

      // Optimisation : lancer l'animation uniquement lors d'un changement de direction
      if (self.direction !== lastDirection) {
        lastDirection = self.direction;

        if (self.direction === 1) {
          // Scroll vers le bas (+1) -> La navbar disparaît vers le haut (Fade-up)
          gsap.to(navbarRef.value, { 
            yPercent: -100, 
            opacity: 0, 
            duration: 0.4, 
            ease: 'power2.inOut',
            overwrite: 'auto'
          });
        } else {
          // Scroll vers le haut (-1) -> La navbar réapparaît vers le bas (Fade-down)
          gsap.to(navbarRef.value, { 
            yPercent: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      }
    }
  });
});
</script>

<template>
  <!-- 
    Mix-blend-difference est parfait pour les sites premium type "Notorious Ink", 
    le texte s'adapte à la couleur d'arrière plan (blanc sur fond noir, noir sur fond blanc).
  -->
  <header
    ref="navbarRef"
    class="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 flex items-center justify-between mix-blend-difference text-white pointer-events-none"
  >
    <!-- GAUCHE : Menu Hamburger Animé -->
    <div class="flex justify-start w-1/4 sm:w-1/3 pointer-events-auto">
      <button @click="toggleMenu" class="group flex items-center justify-start gap-3 sm:gap-4 cursor-pointer focus:outline-none">
        <!-- Icône Hamburger Premium (Lignes custom) -->
        <div class="relative flex flex-col items-start justify-center h-8 w-10 sm:w-12">
          <!-- Ligne du haut (se convertit en la barre diagonale \ ) -->
          <span class="absolute block h-[1.5px] bg-white w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                :class="isMenuOpen ? 'top-1/2 rotate-45 origin-center' : 'top-[10px] origin-left group-hover:w-8 group-hover:bg-gray-300'"></span>
          <!-- Ligne du bas (se convertit en la barre diagonale / ) -->
          <span class="absolute block h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                :class="isMenuOpen ? 'top-1/2 w-full -rotate-45 origin-center' : 'bottom-[10px] w-2/3 origin-left group-hover:w-full'"></span>
        </div>
        
        <!-- Texte Menu dynamique (Caché sur petits écrans) -->
        <span class="hidden md:block text-xs uppercase tracking-[0.2em] font-medium opacity-0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:opacity-100 group-hover:translate-x-0 w-[60px] text-left">
          {{ isMenuOpen ? 'Fermer' : 'Menu' }}
        </span>
      </button>
    </div>

    <!-- CENTRE : Marque -->
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center">
      <a href="/" class="cursor-pointer transition-transform duration-500 hover:scale-105 flex items-center justify-center">
        <img src="/logo.png" alt="KARZ Logo" class="h-10 md:h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity">
      </a>
    </div>

    <!-- DROITE : Contacts -->
    <div class="flex items-center justify-end w-1/4 sm:w-1/3 pointer-events-auto">
      
      <a href="#contacts" class="flex items-center gap-2 md:gap-3 group cursor-pointer p-2 md:p-0">
        <Icon icon="lucide:shopping-bag" class="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-0.5" />
        <span class="hidden sm:inline-block relative overflow-hidden text-xs lg:text-sm uppercase tracking-[0.2em] font-medium">
          <span class="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">Contacts</span>
          <span class="block absolute top-0 left-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0">Contacts</span>
        </span>
      </a>

    </div>
  </header>
</template>

<style scoped>
/*
 * L'effet 'mix-blend-difference' inverse les couleurs sur l'arrière plan.
 * Utilisé couramment sur Awwwards.
 */
header {
  /* Assure que la barre navigue fluidement entre les couleurs */
  backdrop-filter: blur(0px); /* Juste pour forcer le compositing matériel si besoin */
}

/* Le pointer-events-none sur le header global et pointer-events-auto sur les enfants
   permet de cliquer sous la navbar si on est entre les éléments. */
</style>
