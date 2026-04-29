<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';


gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);

onMounted(() => {
  // Un léger délai permet de s'assurer que les polices (Clash Display) sont 
  // parfaitement chargées avant de calculer la largeur des mots. C'est crucial avec SplitType !
  setTimeout(() => {
    
    // --- 1. CONFIGURATION DU SPLIT TEXT ---
    // On demande à la librairie de transformer nos balises de texte en divs (chars, words, lines)
    const titleSplit = new SplitType('.split-title', { types: 'lines, words, chars' });
    const descSplit = new SplitType('.split-desc', { types: 'lines, words' });
    const itemsSplit = new SplitType('.split-item', { types: 'lines, words' });

    // Le secret de l'effet Awwwards : On applique 'overflow: hidden' sur les 'lines'
    // Ainsi, quand on anime les 'chars' ou les 'words' en Y (vers le haut), ils donnent 
    // l'impression de surgir de derrière une ligne invisible.
    gsap.set('.split-title .line, .split-desc .line, .split-item .line', { overflow: 'hidden', paddingBottom: '0.1em' });

    // --- 2. THE TIMELINE ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 75%", // Se déclenche quand la section arrive à 75% du viewport
        end: "bottom 10%",
        toggleActions: "play reverse play reverse",
      }
    });

    // A. Apparition théâtrale du Titre (Lettre par Lettre)
    tl.from(titleSplit.chars, {
      y: "100%",        // Part de l'extérieur en bas
      rotateZ: 5,       // Légère inclinaison pour le style dynamique
      opacity: 0,
      stagger: 0.03,    // Effet cascade lettre par lettre
      duration: 1.2,
      ease: "power4.out",
    })
    
    // B. Apparition de la description (Mot par Mot)
    .from(descSplit.words, {
      y: "100%",
      opacity: 0,
      stagger: 0.015,
      duration: 0.9,
      ease: "power3.out",
    }, "-=0.9") // Démarre en même temps que la fin du titre
    
    // C. Animation des bordures séparatrices de services
    .from('.service-line', {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1,
      ease: "power3.inOut",
      stagger: 0.15
    }, "-=0.6")
    
    // D. Apparition des chiffres (01, 02...)
    .from('.service-number', {
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.15
    }, "-=0.9")
    
    // E. Apparition des titres de service (Mot par Mot)
    .from(itemsSplit.words, {
      y: "100%",
      opacity: 0,
      stagger: 0.02,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.8");

    // --- 3. ANIMATION DES COMPTEURS (STATS) ---
    // On crée un ScrollTrigger séparé car les stats sont tout en bas de la section
    const statBlocks = document.querySelectorAll('.stat-block');
    gsap.from(statBlocks, {
      scrollTrigger: {
        trigger: ".stats-container",
        start: "top 85%", // Déclenchement quand le bloc entre dans le viewport
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out"
    });

    const counters = document.querySelectorAll('.counter-val');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const zero = { val: 0 };
      
      ScrollTrigger.create({
        trigger: ".stats-container",
        start: "top 85%",
        onEnter: () => {
          gsap.to(zero, {
            val: target,
            duration: 2.5,
            ease: "power3.out",
            onUpdate: function() {
              counter.innerHTML = Math.floor(zero.val);
            }
          });
        }
      });
    });

  }, 100);
});
</script>

<template>
  <section ref="sectionRef" id="services" class="relative w-full min-h-screen bg-transparent text-white flex flex-col items-center justify-center py-24 md:py-40 overflow-hidden z-20">
     
    <!-- Surtitre Premium dans le flux normal pour éviter les overlaps sur Safari mobile -->
    <div class="w-full flex items-center justify-center gap-3 sm:gap-4 opacity-50 mb-12 md:mb-20">
       <span class="w-6 sm:w-8 md:w-12 h-[1px] bg-white/60"></span>
       <p class="text-gray-400 uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[8px] sm:text-[10px] md:text-xs font-bold">Services</p>
       <span class="w-6 sm:w-8 md:w-12 h-[1px] bg-white/60"></span>
    </div>

    <!-- Container Grid -->
    <div class="w-full max-w-screen-2xl px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
      
      <!-- Colonne Gauche : Gros titre et Paragraphe -->
      <div class="flex flex-col gap-10">
        <!-- class 'split-title' servira de cible au moteur de JS -->
        <h2 
          class="split-title text-5xl md:text-7xl lg:text-[6vw] font-black uppercase tracking-tighter leading-[0.9]"
          style="font-family: 'Clash Display', 'Satoshi', sans-serif;"
        >
          L'Art<br>
          <span class="text-transparent mix-blend-exclusion" style="-webkit-text-stroke: 1px rgba(255,255,255,1);">de Servir</span><br>
          L'Unique.
        </h2>
        
        <p class="split-desc text-base md:text-xl font-light text-gray-400 leading-relaxed max-w-lg">
          L'acquisition d'un chef-d'œuvre mécanique n'est que le commencement d'une relation. Nous vous accompagnons à travers un écosystème de services exclusifs, pensés pour les collectionneurs les plus exigeants de la planète.
        </p>
      </div>

      <!-- Colonne Droite : Liste des engagements/services -->
      <div class="flex flex-col gap-6 md:gap-10 mt-12 lg:mt-0">
        
        <!-- Service 1 -->
        <div class="group relative pb-8 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
          <p class="service-number text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-500 mb-4 font-bold">01</p>
          <h3 class="split-item text-2xl md:text-4xl font-bold uppercase tracking-tight text-gray-300 group-hover:text-white transition-colors duration-500" style="font-family: 'Clash Display', sans-serif;">Personnalisation Absolue</h3>
          <!-- Ligne animée (Border) -->
          <div class="service-line absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-hover:bg-white/50 transition-colors duration-500"></div>
        </div>

        <!-- Service 2 -->
        <div class="group relative pb-8 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
          <p class="service-number text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-500 mb-4 font-bold">02</p>
          <h3 class="split-item text-2xl md:text-4xl font-bold uppercase tracking-tight text-gray-300 group-hover:text-white transition-colors duration-500" style="font-family: 'Clash Display', sans-serif;">Conciergerie Sans Limites</h3>
          <div class="service-line absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-hover:bg-white/50 transition-colors duration-500"></div>
        </div>

        <!-- Service 3 -->
        <div class="group relative pb-8 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
          <p class="service-number text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-500 mb-4 font-bold">03</p>
          <h3 class="split-item text-2xl md:text-4xl font-bold uppercase tracking-tight text-gray-300 group-hover:text-white transition-colors duration-500" style="font-family: 'Clash Display', sans-serif;">Héritage & Restauration</h3>
          <div class="service-line absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-hover:bg-white/50 transition-colors duration-500"></div>
        </div>
        
      </div>
      
    </div>

    <!-- STATISTIQUES / COMPTEURS -->
    <div class="stats-container w-full max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-16 mt-20 md:mt-32 pt-12 md:pt-20 border-t border-white/5">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-8 text-left">
        
        <div class="stat-block flex flex-col gap-3">
          <p class="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold">Clients Satisfaits</p>
          <div class="flex items-baseline gap-2">
            <span class="text-xl text-gray-400 font-light ml-7 md:ml-0">+</span>
             <h4 class="counter-val  md:ml-0 text-4xl sm:text-5xl md:text-6xl font-black text-white" style="font-family: 'Clash Display', sans-serif;" data-target="280">0</h4>
             
          </div>
        </div>

        <div class="stat-block flex flex-col gap-3">
          <p class="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold">Véhicules Vendus</p>
          <div class="flex items-baseline gap-2">
             <h4 class="counter-val  md:ml-5 text-4xl sm:text-5xl md:text-6xl font-black text-white" style="font-family: 'Clash Display', sans-serif;" data-target="320">0</h4>
          </div>
        </div>

        <div class="stat-block flex flex-col gap-3">
          <p class="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold">Heures d'Artisanat</p>
          <div class="flex items-baseline gap-2">
             <h4 class="counter-val ml-5 md:ml-7 text-4xl sm:text-5xl md:text-6xl font-black text-white" style="font-family: 'Clash Display', sans-serif;" data-target="86">0</h4>
             <span class="text-xl text-gray-400 font-light">K</span>
          </div>
        </div>

        <div class="stat-block flex flex-col gap-3">
          <p class="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold">Distinctions Officielles</p>
          <div class="flex items-baseline gap-2">
             <h4 class="counter-val ml-5 md:ml-12 text-4xl sm:text-5xl md:text-6xl font-black text-white" style="font-family: 'Clash Display', sans-serif;" data-target="24">0</h4>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* 
Aucun style spécifique nécessaire ici grâce aux GSAP.set injectés par JavaScript !
Cela garde l'architecture SCSS propre.
*/
</style>
