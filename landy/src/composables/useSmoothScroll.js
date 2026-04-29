import { onMounted, onUnmounted } from 'vue';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  let lenis;

  onMounted(() => {
    // 1. Initialiser Lenis avec des paramètres "premium"
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Courbe d'accélération typique des sites Awwwards
      direction: 'vertical', // direction du scroll
      gestureDirection: 'vertical', // direction de l'interaction
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // souvent on garde le scroll natif sur mobile pour l'UX
      touchMultiplier: 2,
      infinite: false,
    });

    // 2. Synchroniser Lenis avec ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Connecter Lenis au ticker de GSAP pour une synchronisation parfaite à l'écran
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Éviter les sauts inattendus si le navigateur ralentit
    gsap.ticker.lagSmoothing(0);
  });

  onUnmounted(() => {
    if (lenis) {
      lenis.destroy();
    }
    gsap.ticker.remove(lenis.raf);
  });

  return { lenis };
}
