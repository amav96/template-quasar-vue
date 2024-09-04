
import { ref } from 'vue'


// const tiposDocumentos = ref<TipoDocumentoModel>([])

export function useDataProvider() {

    // const getTipoDocumentos = async () => {
    //     if(tiposDocumentos.value.length === 0){
    //         const response = await dataProviderRepository.getTiposDocumentos();
    //         tiposDocumentos.value = response;
    //         return tiposDocumentos.value
    //     } else {
    //         return tiposDocumentos.value
    //     }
    // } 

    const resetearDataProviders = () => {
        // tiposDocumentos.value = []
    }

  return { 
    resetearDataProviders
   }
}