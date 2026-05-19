import { ref } from 'vue';

// État global pour savoir si le preloader a terminé son animation de sortie
// et si l'application est prête à lancer ses animations d'introduction
export const isAppLoaded = ref(false);
