<template>
  <div ref="preloaderRef" class="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
    
    <!-- SVG Gauge (Compte-tours) -->
    <div class="relative w-full max-w-[600px] px-6 scale-anim">
      <svg viewBox="0 0 400 230" class="w-full h-auto drop-shadow-[0_0_30px_rgba(2,132,199,0.3)]">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur1" />
            <feGaussianBlur stdDeviation="4" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <radialGradient id="centerGlow" cx="50%" cy="100%" r="100%">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
          </radialGradient>

          <linearGradient id="needleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.1)" />
            <stop offset="70%" stop-color="rgba(255,255,255,0.8)" />
            <stop offset="100%" stop-color="rgba(255,255,255,1)" />
          </linearGradient>
        </defs>

        <!-- Lueur de fond centrale -->
        <path d="M 40 200 A 160 160 0 0 1 360 200 Z" fill="url(#centerGlow)" />

        <!-- Arcs concentriques (Grille) -->
        <g stroke="#1e293b" stroke-width="1.5" fill="none">
          <path d="M 45 200 A 155 155 0 0 1 355 200" />
          <path d="M 85 200 A 115 115 0 0 1 315 200" />
          <path d="M 125 200 A 75 75 0 0 1 275 200" />
          
          <!-- Lignes radiales de la grille -->
          <line v-for="(tick, i) in majorTicks" :key="'rad'+i"
                :x1="200 + 75 * Math.cos(tick.angleRad)" 
                :y1="200 + 75 * Math.sin(tick.angleRad)"
                :x2="200 + 155 * Math.cos(tick.angleRad)" 
                :y2="200 + 155 * Math.sin(tick.angleRad)" />
        </g>
        
        <!-- Zone Rouge (Redline) en bleu lumineux de 6.5 à 8 -->
        <path :d="redlinePath" fill="none" stroke="#0ea5e9" stroke-width="6" opacity="0.9" filter="url(#glow)"/>

        <!-- Ticks Mineurs (Bleus) -->
        <line v-for="(tick, i) in minorTicks" :key="'min'+i" 
              :x1="tick.x1" :y1="tick.y1" :x2="tick.x2" :y2="tick.y2" 
              stroke="#38bdf8" stroke-width="1.5" opacity="0.8"/>

        <!-- Ticks Majeurs (Blancs) -->
        <line v-for="(tick, i) in majorTicks" :key="'maj'+i" 
              :x1="tick.x1" :y1="tick.y1" :x2="tick.x2" :y2="tick.y2" 
              stroke="white" stroke-width="3.5" filter="url(#glow)"/>
              
        <!-- Nombres (0 à 8) -->
        <text v-for="(num, i) in numbers" :key="'num'+i"
              :x="num.x" :y="num.y" fill="white" font-size="24" font-family="'Satoshi', 'Inter', sans-serif" font-weight="700" 
              text-anchor="middle" dominant-baseline="central">
              {{ num.text }}
        </text>
        
        <!-- Texte Central -->
        <text x="200" y="100" fill="white" font-family="'Satoshi', sans-serif" text-anchor="middle">
          <tspan x="200" dy="0" font-size="16" font-weight="700" class="tracking-widest"></tspan>
          <tspan x="200" dy="28" font-size="10" font-weight="500" fill="#94a3b8" class="tracking-[0.3em]" id="loading-text">CHARGEMENT...</tspan>
        </text>
        
        <!-- Aiguille (Needle) -->
        <g ref="needleRef">
          <path d="M 197 200 L 365 198 L 365 202 L 203 200 Z" fill="url(#needleGrad)" filter="url(#glow)"/>
          <line x1="200" y1="200" x2="368" y2="200" stroke="#ffffff" stroke-width="1.5" />
        </g>
        
        <!-- Cache Central -->
        <circle cx="200" cy="200" r="18" fill="#0f172a" stroke="#334155" stroke-width="2"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import gsap from 'gsap';

const emit = defineEmits(['complete']);

const preloaderRef = ref(null);
const needleRef = ref(null);

// Génération SVG paramétrique
const center = { x: 200, y: 200 };
const rOuter = 180;
const rInner = 162;
const rText = 130;

const majorTicks = [];
const minorTicks = [];
const numbers = [];

for (let i = 0; i <= 10; i++) {
  const angleDeg = -180 + (i * 18);
  const angleRad = (angleDeg * Math.PI) / 180;
  
  // Ticks Majeurs
  majorTicks.push({
    x1: center.x + rInner * Math.cos(angleRad),
    y1: center.y + rInner * Math.sin(angleRad),
    x2: center.x + rOuter * Math.cos(angleRad),
    y2: center.y + rOuter * Math.sin(angleRad),
    angleRad
  });
  
  // Nombres (0, 10, 20... 100)
  numbers.push({
    text: (i * 10).toString(),
    x: center.x + rText * Math.cos(angleRad),
    y: center.y + rText * Math.sin(angleRad)
  });
  
  // Ticks Mineurs
  if (i < 10) {
    for (let j = 1; j < 10; j++) {
      const minAngleDeg = angleDeg + (j * 1.8);
      const minAngleRad = (minAngleDeg * Math.PI) / 180;
      
      const isHalfway = j === 5;
      const innerM = isHalfway ? 168 : 173;
      
      minorTicks.push({
        x1: center.x + innerM * Math.cos(minAngleRad),
        y1: center.y + innerM * Math.sin(minAngleRad),
        x2: center.x + rOuter * Math.cos(minAngleRad),
        y2: center.y + rOuter * Math.sin(minAngleRad)
      });
    }
  }
}

// Ligne rouge (bleue ici) de la jauge (80 à 100%)
const redlinePath = computed(() => {
  const r = 171;
  const a1 = (-180 + 80 * 1.8) * Math.PI / 180; // -36 deg (représente 80%)
  const a2 = 0;
  const x1 = center.x + r * Math.cos(a1);
  const y1 = center.y + r * Math.sin(a1);
  const x2 = center.x + r * Math.cos(a2);
  const y2 = center.y + r * Math.sin(a2);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
});

onMounted(() => {
  // Initialisation GSAP de l'aiguille à 0
  gsap.set(needleRef.value, { svgOrigin: "200 200", rotation: -180 });

  gsap.fromTo('.scale-anim', 
    { scale: 0.85, opacity: 0, filter: 'blur(15px)' }, 
    { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' }
  );

  const state = { progress: 0 };
  let isLoaded = false;

  window.addEventListener('load', () => { isLoaded = true; });
  if (document.readyState === 'complete') isLoaded = true;

  const tl = gsap.timeline();

  // Phase 1 : Montée en régime (Attente du réseau)
  tl.to(state, {
    progress: 85,
    duration: 3, // Temps minimum d'attente
    ease: "power2.inOut",
    onUpdate: () => {
      const angle = -180 + (state.progress / 100) * 180;
      gsap.set(needleRef.value, { rotation: angle });
    },
    onComplete: () => {
      const finishLoading = () => {
        // Phase 2 : Coup d'accélérateur final vers 100% (x1000 = 8000 tours)
        gsap.to(state, {
          progress: 100,
          duration: 0.6,
          ease: "power4.in",
          onUpdate: () => {
            const angle = -180 + (state.progress / 100) * 180;
            gsap.set(needleRef.value, { rotation: angle });
          },
          onComplete: () => {
            document.getElementById('loading-text').textContent = "PLEINS GAZ";
            
            const outroTl = gsap.timeline({
              onComplete: () => emit('complete')
            });
            
            outroTl.to('.scale-anim', { scale: 1.15, opacity: 0, filter: 'blur(20px)', duration: 0.8, ease: "power3.in" }, "+=0.3")
                   .to(preloaderRef.value, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.2");
          }
        });
      };

      if (isLoaded) finishLoading();
      else {
        let check = setInterval(() => {
          if (isLoaded) { clearInterval(check); finishLoading(); }
        }, 100);
        // Force l'arrêt après un maximum de 7s
        setTimeout(() => { clearInterval(check); finishLoading(); }, 7000);
      }
    }
  });
});
</script>
