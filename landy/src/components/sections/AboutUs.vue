<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import car1 from "../../assets/cars/car1.png";

// Enregistrement strict du plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const titleRef = ref(null);
const textRef = ref(null);
const imageWrapperRef = ref(null);
const imageRef = ref(null);

onMounted(() => {
  // L'animation unifiée "Aller-Retour" pour les éléments au scroll.
  // Grâce aux toggleActions, GSAP gère l'ordre et le reverse automatiquement !
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 25%",   // Déclenche l'entrée quand le haut atteint 80%
      end: "bottom 50%",  // Déclenche la sortie quand le bas atteint 20%
      toggleActions: "play reverse play reverse",
    }
  });

  // 1. Apparition Séquencée du Titre (avec Opacité pour sécurité anti-clipping absolue)
  const titleLines = titleRef.value.querySelectorAll('.reveal-line');
  tl.fromTo(titleLines, 
    { y: "50%", opacity: 0, rotateZ: 3 }, 
    { y: "0%", opacity: 1, rotateZ: 0, duration: 1.2, ease: "power4.out", stagger: 0.15 },
    0 // Démarre au temps 0
  );

  // 2. Paragraphes : Fondu vers le haut naturel
  tl.fromTo(textRef.value,
    { opacity: 0, y: 70 },
    { opacity: 1, y: 0, duration: 2, ease: "power3.out" },
    "-=0.9" // chevauche l'animation précédente (le titre)
  );

  // 3. Révélation et Disparition Dynamique de l'image au Scroll (Awwwards Style)
  const imageRevealTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 80%",   // Commence la révélation quand la section apparait
      end: "bottom top",  // Termine la disparition quand la section sort
      scrub: 1.5          // Scrub soyeux et doux (Lié à Lenis)
    }
  });

  // Étape 1 : Apparition de bas en haut
  imageRevealTl.fromTo(imageWrapperRef.value,
    { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
    { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease: "none" }
  );

  // Étape 2 : Maintien de l'image affichée au centre de l'écran
  imageRevealTl.to(imageWrapperRef.value, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5 });

  // Étape 3 : Disparition de l'image (se referme vers le haut)
  imageRevealTl.to(imageWrapperRef.value,
    { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", duration: 1, ease: "none" }
  );
  
  // 4. Parallaxe Scale/Y Continu
  gsap.fromTo(imageRef.value, 
    { scale: 1.2, yPercent: -15 },
    { 
      scale: 1, 
      yPercent: 15, 
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    }
  );

});
</script>

<template>
  <section 
    ref="sectionRef" 
    id="about" 
    class="relative w-full min-h-screen bg-transparent text-white py-24 md:py-32 px-6 md:px-12 flex flex-col justify-center overflow-hidden z-20"
  >
    <div class="max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
      
      <!-- Bloc Texte (Gauche sur bureau, Haut sur mobile) -->
      <!-- 'relative z-20' assure que le grand texte passe par-dessus la div de l'image s'il déborde de sa colonne -->
      <div class="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative z-20 pointer-events-none">
        
        <!-- Surtitre avec ligne -->
        
        
        <!-- Titre Premium sécurisé (tailles dynamiques fluides vw, pas de 'overflow-hidden') -->
        <h2 
          ref="titleRef" 
          class="text-[12vw] md:text-[9vw] lg:text-[6vw] xl:text-[5.5vw] font-black uppercase tracking-tighter leading-[0.95] mb-12 whitespace-nowrap pointer-events-auto" 
          style="font-family: 'Clash Display', 'Satoshi', sans-serif;"
        >
          <span class="block">
            <span class="reveal-line block origin-top-left">Redéfinir</span>
          </span>
          <span class="block mt-1">
            <span class="reveal-line block origin-top-left text-transparent z-20" style="-webkit-text-stroke: 1px rgba(255,255,255,0.9);">
              L'Exception
            </span>
          </span>
        </h2>
        
        <!-- Paragraphe et Bouton -->
        <div ref="textRef" class="space-y-6">
          <p class="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
           La vie est beaucoup trop belle pour conduire n'importe quelle voiture. Kars croit que chaque voiture que vous conduisez doit refléter votre personnalité, votre identité, vos ambitions. C'est pourquoi chaque modèle de notre collection répond aux standards les plus élevés.
          </p>
          <p class="text-gray-400 text-sm md:text-base leading-relaxed font-regular max-w-lg">
            S'inspirant des références incontournables du luxe, notre mission est de vous offrir non seulement des véhicules aux performances époustouflantes, mais également une expérience cinématique immersive qui transcende l'imagination.
          </p>
          
         
        </div>
      </div>

      <!-- Bloc Image Parallaxe (Droite sur bureau, Bas sur mobile) -->
      <div class="lg:col-span-7 w-full h-[45vh] lg:h-[70vh] flex items-center justify-center relative order-1 lg:order-2">
        <div 
          ref="imageWrapperRef" 
          class="relative w-full h-full overflow-hidden  rounded-sm"
        >
          <!-- Utilisation d'object-contain et suppression de scale-110 pour voir la voiture en entier -->
          <img 
            ref="imageRef" 
            :src="car1" 
            alt="Voiture de luxe Karz Excellence" 
            width="800"
            height="600"
            loading="lazy"
            class="absolute inset-0 w-full h-full object-contain object-center p-4 md:p-8"
            style="will-change: transform;"
          />
          <!-- Dégradé interne subtil (vignettage) pour donner de la profondeur à l'image -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none hidden lg:block"></div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<style scoped>
/* Force la fluidité sur le rendu 3D du ScrollTrigger pour éviter le 'jitter' Safari/Chrome */
img {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>
