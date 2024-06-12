import { useQuasar } from "quasar"
import { computed } from "vue"

export function useHelper() {
    
    const $q = useQuasar()
    const breakpoint = computed(() => $q.screen)

    return { 
        $q,
        breakpoint
     }
  }