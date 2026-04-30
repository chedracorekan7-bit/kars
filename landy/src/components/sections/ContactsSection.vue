<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/vue";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const footerRef = ref(null);
const spacerRef = ref(null);
const backToTopRef = ref(null);
const isSubmitting = ref(false);
const isSuccess = ref(false);

const formData = ref({ name: "", email: "", description: "" });

const socials = [
  {
    icon: "simple-icons:instagram",
    hover: "hover:bg-white hover:text-black hover:border-white",
  },
  {
    icon: "simple-icons:facebook",
    hover: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white",
  },
  {
    icon: "simple-icons:linkedin",
    hover: "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white",
  },
  {
    icon: "simple-icons:whatsapp",
    hover: "hover:bg-[#25D366] hover:border-[#25D366] hover:text-white",
  },
];

onMounted(() => {
  // ── 1. REALISTIC CURTAIN UNVEIL ───────────────────────────────────────
  gsap.fromTo(
    footerRef.value,
    { scale: 0.85, opacity: 0, yPercent: -40 },
    {
      scale: 1,
      opacity: 1,
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: spacerRef.value,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (footerRef.value) {
            // Verrouille l'interaction du footer (et son défilement interne) 
            // TANT QUE l'animation de dévoilement n'est pas terminée (100%).
            footerRef.value.style.pointerEvents = self.progress > 0.98 ? "auto" : "none";
          }
        }
      },
    }
  );

  // ── 2. THE MASSIVE TYPOGRAPHY REVEAL ─────────────────────────────────
  setTimeout(() => {
    // On split le texte pour l'animation de jaillissement
    const massiveSplit = new SplitType(".massive-email", { types: "chars, lines" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.value,
        start: "top 35%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(massiveSplit.chars, {
      y: "120%",
      opacity: 0,
      rotateZ: 10,
      stagger: 0.02,
      duration: 1.2,
      ease: "back.out(1.5)",
    })
    .from(".form-field", {
      y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
      immediateRender: false,
    }, "-=0.7")
    .from(".submit-btn", {
      scale: 0.8, opacity: 0, duration: 0.6, ease: "back.out(2)",
      immediateRender: false,
    }, "-=0.4");
  }, 200);

  // ── 3. INTERACTION MAGNÉTIQUE ────────────────────────────────────────
  const btn = backToTopRef.value;
  if (btn) {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.1, duration: 0.5, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.5, ease: "power2.out" });
    });
  }
});

const handleSubmit = async () => {
  if (isSubmitting.value || isSuccess.value) return;
  
  if (!formData.value.name || !formData.value.email || !formData.value.description) {
    // Si besoin d'ajouter une logique de validation personnalisée ici
    return;
  }

  isSubmitting.value = true;
  try {
    const response = await fetch("https://formspree.io/f/mzdyqoaa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.description // mapped 'description' to 'message' for standard form conventions, but either works.
      })
    });

    if (response.ok) {
      isSubmitting.value = false;
      isSuccess.value = true;
      setTimeout(() => {
        formData.value = { name: "", email: "", description: "" };
        isSuccess.value = false;
      }, 4000);
    } else {
      const data = await response.json();
      let errorMessage = "Oops! Il y a eu un problème lors de l'envoi de votre formulaire.";
      if (Object.hasOwn(data, 'errors')) {
        errorMessage = data["errors"].map(error => error["message"]).join(", ");
      }
      alert(errorMessage);
      isSubmitting.value = false;
    }
  } catch (error) {
    alert("Oops! Une erreur réseau s'est produite lors de l'envoi de votre message.");
    isSubmitting.value = false;
  }
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
</script>

<template>
  <div class="relative w-full bg-transparent">
    <div ref="spacerRef" class="h-[100dvh] pointer-events-none"></div>

    <footer
      
      ref="footerRef"
      class="sticky bottom-0 w-full h-[100dvh] bg-transparent text-white z-0 flex flex-col overflow-hidden"
    >
      <div class="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent opacity-60 z-10 pointer-events-none"></div>

      <div class="flex-1 overflow-y-auto scrollbar-thin touch-pan-y" data-lenis-prevent>
        <div class="w-full min-h-full flex flex-col justify-start px-5 sm:px-8 md:px-14 lg:px-20 xl:px-28 py-20 lg:py-24">
          
          <!-- TITRE MASSIF AVEC TEXT-STROKE -->
          <div class="mb-14 sm:mb-20">
             <h3 class="massive-email font-black uppercase tracking-tighter leading-[0.85] pt-3 text-[2.8rem] sm:text-7xl md:text-8xl lg:text-[7vw]"
                 style="font-family: 'Clash Display', sans-serif;">
                <span class="text-transparent" style="-webkit-text-stroke: 1px rgba(255,255,255,1)">Réalisons</span> <br>
                <span >ensemble</span> <br> 
                <span class="text-transparent" style="-webkit-text-stroke: 1px rgba(255,255,255,1)">votre rêve</span>
              </h3>
          </div>

          <!-- GRILLE PRINCIPALE -->
          <div class="flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            
            <!-- FORMULAIRE AVEC DESCRIPTION -->
            <div class="relative w-full order-1 lg:order-1">
              <Transition enter-active-class="transition-all duration-700 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100">
                <div v-if="isSuccess" class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#020202] text-center">
                  <Icon icon="lucide:check" class="w-16 h-16 text-white mb-6 animate-pulse" />
                  <h3 class="text-2xl font-bold  tracking-[0.2em]">Message envoyé</h3>
                  <p>Nous vous répondrons dans les plus brefs délais !</p>
                </div>
              </Transition>

              <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 md:gap-8" novalidate>
                
                <div class="form-field flex flex-col gap-2">
                  <label class="text-[9px] uppercase tracking-[0.5em] text-gray-400 font-black">Nom</label>
                  <input v-model="formData.name" type="text" placeholder="ex: Rachade OREKAN" required :disabled="isSubmitting"
                         class="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-white transition-colors duration-500 placeholder:text-gray-300 text-sm md:text-base font-light tracking-wide disabled:opacity-30" />
                </div>

                <div class="form-field flex flex-col gap-2">
                  <label class="text-[9px] uppercase tracking-[0.5em] text-gray-400 font-black">Email</label>
                  <input v-model="formData.email" type="email" placeholder="votre@email.com" required :disabled="isSubmitting"
                         class="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-white transition-colors duration-500 placeholder:text-gray-300 text-sm md:text-base font-light tracking-wide disabled:opacity-30" />
                </div>

                <!-- NOUVEAU CHAMP DESCRIPTION -->
                <div class="form-field flex flex-col gap-2">
                  <label class="text-[9px] uppercase tracking-[0.5em] text-gray-400 font-black">Description du projet</label>
                  <textarea v-model="formData.description" placeholder="Parlez-nous de votre vision..." rows="3" required :disabled="isSubmitting"
                            class="w-full bg-transparent border-b border-white/10 py-3 md:py-4 outline-none focus:border-white transition-colors duration-500 placeholder:text-gray-300 text-sm md:text-base font-light tracking-wide resize-none disabled:opacity-30"></textarea>
                </div>

                <button type="submit" :disabled="isSubmitting"
                        class="submit-btn group relative w-full sm:w-auto sm:self-start py-5 px-16 overflow-hidden border border-white/20 hover:border-white transition-colors duration-700 disabled:cursor-not-allowed cursor-pointer">
                  <span class="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
                  <span class="relative z-10 flex items-center justify-center gap-4">
                    <span class="text-[10px] font-black uppercase tracking-[0.5em] group-hover:text-black transition-colors">Envoyer</span>
                    <Icon icon="lucide:arrow-right" class="w-4 h-4 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </span>
                </button>
              </form>
            </div>

            <!-- BLOC INFOS DE CONTACT -->
            <div class="flex flex-col gap-8 md:gap-12 lg:pl-16 lg:border-l lg:border-white/5 order-2 lg:order-2 pb-16 lg:pb-0 ">
              <div class="info-block flex flex-col gap-5">
                <div class="flex gap-6 pb-5">
                   <a v-for="s in socials" :key="s.icon" href="#" class="text-gray-300 hover:text-white transition-colors duration-500">
                     <Icon :icon="s.icon" class="w-6 h-6" />
                   </a>
                </div>
              </div>
              <div class="info-block flex flex-col gap-3">
                <p class="text-[9px] uppercase tracking-[0.5em] text-gray-600 font-black">Support Client</p>
                <a href="mailto:chedracorekan7@gmail.com" class="text-sm font-light text-gray-400 hover:text-white uppercase transition-colors tracking-widest break-all">chedracorekan7@gmail.com</a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="flex-shrink-0 border-t border-white/5 bg-[#020202] px-5 sm:px-8 md:px-14 lg:px-20 xl:px-28 py-8 flex justify-between items-center z-20">
        <p class="text-[9px] uppercase tracking-[0.5em] text-gray-700 font-black">© 2026 KARS </p>
       
        <button id="contacts" @click="scrollToTop" ref="backToTopRef" class="group flex items-center gap-4 text-gray-300 hover:text-white transition-colors cursor-pointer">
          <span class="text-[10px] uppercase tracking-[0.5em] font-black hidden sm:block">Haut de page</span>
          <div class="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
            <Icon icon="lucide:arrow-up" class="w-5 h-5" />
          </div>
        </button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.massive-email {
  overflow: hidden;
}

.touch-pan-y {
  -webkit-overflow-scrolling: touch;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 2px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
