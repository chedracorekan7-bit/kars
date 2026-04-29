<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const textGroupRef = ref(null)
const videoRef = ref(null)

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=400%',
        scrub: 1,
        pin: true,
      }
    })

    // On zoome maintenant exactement au centre (50% 50%)
    // car le mot "THE" est parfaitement centré au milieu de l'écran grâce aux tspan.
    tl.fromTo(textGroupRef.value, 
      { 
        scale: 80, 
        transformOrigin: "50% 50%" 
      },
      { 
        scale: 1, 
        ease: 'power2.inOut', 
        duration: 1 
      }
    )

    tl.fromTo(videoRef.value,
      { scale: 1.2 },
      { scale: 1, ease: 'power2.inOut', duration: 1 },
      0 
    )

  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section 
    ref="sectionRef" 
    class="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center font-clash"
  >
    <!-- Background Fallback -->
    <div class="absolute inset-0 w-full h-full bg-gradient-to-br from-red-900 via-[#111] to-black z-0"></div>

    <!-- Couche Vidéo / Image -->
    <video
      ref="videoRef"
      src="../../assets/cars/cinematic.mp4" 
      class="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      alt="Cinematic Car"
      autoplay
      loop
      muted
      playsinline
      preload="meta"
    />

    <!-- Masque SVG -->
    <svg class="absolute inset-0 w-full h-full z-10 pointer-events-none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <mask id="textMask">
          <!-- Fond blanc : garde le rectangle noir -->
          <rect width="100%" height="100%" fill="white" />
          
          <!-- Texte noir : perce un trou pour révéler l'image -->
          <g ref="textGroupRef">
            <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="black" class="svg-text">
              <!-- L'utilisation de tspan avec dy garantit que les lignes restent groupées -->
              <!-- FEEL est poussé vers le haut, THE est au centre, VIBE est poussé vers le bas -->
              <tspan x="50%" dy="-0.9em">FEEL</tspan>
              <tspan x="50%" dy="0.9em">THE</tspan>
              <tspan x="50%" dy="0.9em">VIBE</tspan>
            </text>
          </g>
        </mask>
      </defs>

      <!-- Rectangle noir découpé -->
      <rect width="100%" height="100%" fill="black" mask="url(#textMask)" />
    </svg>

  </section>
</template>

<style scoped>
.svg-text {
  font-family: 'Clash Display', sans-serif;
  text-transform: uppercase;
  /* Utilisation de clamp pour être sûr que le texte ne déborde ni sur mobile, ni sur un grand écran */
  font-size: clamp(3rem, 11vw, 12rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}
</style>
