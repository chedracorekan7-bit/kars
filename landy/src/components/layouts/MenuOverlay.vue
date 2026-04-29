<script setup>
import { isMenuOpen, toggleMenu } from '../../composables/useMenu';
import gsap from 'gsap';
import { Icon } from '@iconify/vue';

// Liens de navigation du site
const links = [
  { name: 'A propos', url: '#about' },
  { name: 'Modèles', url: '#models' },
  { name: 'Héritage', url: '#heritage' },
  { name: 'Services', url: '#services' },
  { name: 'Contacts', url: '#contacts' }
];

// Vue <Transition> hooks avec GSAP
const onEnter = (el, done) => {
  const backdrop = el.querySelector('.menu-backdrop');
  const panel = el.querySelector('.menu-panel');
  const menuLinks = el.querySelectorAll('.menu-link-item');
  const footerLinks = el.querySelectorAll('.menu-footer-item');

  // Animation globale (assure la visibilité du composant principal)
  gsap.set(el, { opacity: 1 });
  
  // Fondu de l'arrière-plan flouté
  gsap.fromTo(backdrop, 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.8, ease: 'power2.out' }
  );

  // Glissement du panneau depuis la gauche
  gsap.fromTo(panel, 
    { x: '-100%' }, 
    { x: '0%', duration: 1, ease: 'power4.out' }
  );

  // Apparition 3D séquentielle des liens principaux
  gsap.fromTo(menuLinks,
    { y: 60, opacity: 0, rotateX: -45, z: -50 },
    { 
      y: 0, 
      opacity: 1, 
      rotateX: 0, 
      z: 0,
      duration: 1, 
      stagger: 0.1, 
      ease: 'power4.out', 
      delay: 0.3 
    }
  );

  // Apparition du footer du menu (contacts, etc)
  gsap.fromTo(footerLinks,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.6, onComplete: done }
  );
};

const onLeave = (el, done) => {
  const backdrop = el.querySelector('.menu-backdrop');
  const panel = el.querySelector('.menu-panel');

  // Glissement inverse du panneau
  gsap.to(panel, { x: '-100%', duration: 0.8, ease: 'power4.inOut' });
  
  // Disparition du flou de l'arrière-plan
  gsap.to(backdrop, { opacity: 0, duration: 0.8, ease: 'power3.inOut' });

  // Disparition globale de l'élément pour nettoyer
  gsap.to(el, { opacity: 0, duration: 0.8, ease: 'power3.inOut', delay: 0.2, onComplete: done });
};
</script>

<template>
  <Transition @enter="onEnter" @leave="onLeave" :css="false">
    <div v-show="isMenuOpen" class="fixed inset-0 z-40 flex pointer-events-auto">
      
      <!-- Arrière-plan flouté (Backdrop) -->
      <div 
        class="menu-backdrop absolute inset-0 bg-black/60 backdrop-blur-xl cursor-pointer" 
        @click="toggleMenu"
        title="Fermer le menu"
      ></div>
      
      <!-- Panneau du menu (coulisse de la gauche) -->
      <div class="menu-panel relative w-full md:w-3/5 lg:w-[45%] bg-[#080808]/90 border-r border-white/10 text-white h-full flex flex-col justify-center px-10 md:px-24 pt-20">
        
        <nav class="flex flex-col gap-6 md:gap-8">
          <a 
            v-for="(link, index) in links" 
            :key="index"
            :href="link.url"
            @click="toggleMenu"
            class="group relative block w-fit"
            style="perspective: 1000px;"
          >
            <!-- L'élément qui s'anime à l'apparition -->
            <div class="menu-link-item w-full" style="transform-style: preserve-3d; transform-origin: left center;">
              
              <!-- Effet 3D et augmentation de taille au hover -->
              <span class="block text-5xl md:text-7xl font-black uppercase tracking-tighter transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-8 group-hover:scale-110 group-hover:text-transparent group-hover:-rotate-y-12"
                    style="font-family: 'Clash Display', 'Satoshi', sans-serif; transform-style: preserve-3d; transform-origin: left center; -webkit-text-stroke: 1px rgba(255,255,255,0.8);">
                <!-- Le texte prend une couleur transparente avec un contour (stroke) pour un effet premium absolu -->
                {{ link.name }}
              </span>
              
            </div>
          </a>
        </nav>

        <!-- Bas de page du menu (Infos de contact & Réseaux Sociaux) -->
        <div class="mt-20 flex flex-wrap gap-8 items-center  pt-12">
          <a href="#" class="group flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] font-medium text-gray-500 uppercase hover:text-white transition-all duration-300">
            <div class="w-10 h-10 mb-4 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
               <Icon icon="simple-icons:instagram" class="w-7 h-7" />
            </div>
            
          </a>

          <a href="#" class="group flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] font-medium text-gray-500 uppercase hover:text-white transition-all duration-300">
            <div class="w-10 h-10 mb-4 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white group-hover:border-[#1877F2] transition-all duration-500">
               <Icon icon="simple-icons:facebook" class="w-7 h-7" />
            </div>
            
          </a>

          <a href="#" class="group flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] font-medium text-gray-500 uppercase hover:text-white transition-all duration-300">
            <div class="w-10 h-10 mb-4 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#0A66C2] group-hover:text-white group-hover:border-[#0A66C2] transition-all duration-500">
               <Icon icon="simple-icons:linkedin" class="w-6 h-6" />
            </div>
            
          </a>

          <a href="#" class="group flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] font-medium text-gray-500 uppercase hover:text-white transition-all duration-300">
            <div class="w-10 h-10 mb-4 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366] transition-all duration-500">
               <Icon icon="simple-icons:whatsapp" class="w-7 h-7" />
            </div>
           
          </a>
        </div>
        
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Astuce CSS pour le hover effect "Outline" (texte transparent bordé de blanc) */
span:hover {
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: rgba(255, 255, 255, 1);
  text-shadow: 10px 10px 30px rgba(0,0,0,0.5); /* Renforce l'effet 3D */
}
</style>
