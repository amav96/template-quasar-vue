import {  ref, watch } from "vue"

export function useListAutocomplete() {
    
    const geoDireccion = ref<string>('');
    const pacInput = ref<HTMLInputElement | null | any>(null);
    const seteandoDireccion = ref<boolean>(false)
    const predictionList = ref<any[]>([]);
    const configuraciones = ref<any>({
        componentRestrictions: {
            country: 'arg'
        }
    })
    const initService = (): void => {
      if (!pacInput.value) return
      googleService.value = new google.maps.places.AutocompleteService();
    };
  
    const displaySuggestions = function (
    predictions: google.maps.places.QueryAutocompletePrediction[] | null,
    status: google.maps.places.PlacesServiceStatus
    ) {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) return;
      predictionList.value = predictions;
    };
    
    const googleService = ref<any>(null)
    watch(geoDireccion, async (newVal: string, oldValue) => {
        if(newVal !== oldValue && !seteandoDireccion.value){
            const inputValue = pacInput.value.getNativeElement().value;
            if(inputValue){
            const request : any = {
                input: newVal,
            };
            if(configuraciones.value.componentRestrictions){
                request.componentRestrictions = configuraciones.value.componentRestrictions
            }
            googleService.value.getPlacePredictions(request, displaySuggestions);
            } else {
            predictionList.value = []
            }
        }
    })

    return { 
        geoDireccion,
        pacInput,
        predictionList,
        displaySuggestions,
        googleService,
        initService,
        seteandoDireccion,
        configuraciones,
     }
  }