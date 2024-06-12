import { get } from 'http';
import request from './ApiResponse.helper'
import { FormateadorGoogleAddressModel } from 'src/models/Google.model';

export const formatearGoogleAddress = (addressComponents: any[]) :FormateadorGoogleAddressModel => {

    const ShouldBeComponent : any = {
      street_number: ['street_number'],
      postal_code: ['postal_code'],
      street: ['street_address', 'route'],
      region: [
        'administrative_area_level_1',
        'administrative_area_level_2',
        'administrative_area_level_3',
        'administrative_area_level_4',
        'administrative_area_level_5'
      ],
      city: [
        'political',
        'neighborhood',
        'locality',
        'sublocality',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4'
      ],
      country: ['country']
    };
  
    const formattedAddress : any = {
      street_number: '',
      postal_code: '',
      street: '',
      region: '',
      city: '',
      country: ''
    };
  
    for (const shouldBe in ShouldBeComponent) {
      let consiguioValor = false;
      for(const option of ShouldBeComponent[shouldBe]){
        if(consiguioValor) break
        for(const component of addressComponents){
            if(consiguioValor) break
            if(option.indexOf(component.types[0]) !== -1){
              formattedAddress[shouldBe] = component.short_name && shouldBe !== 'country' ? component.short_name : component.long_name
              consiguioValor = true;
              break;
            }
        }
      }
    }
 
    return {
      formatted_address: `${formattedAddress.street} ${formattedAddress.street_number}, ${formattedAddress.postal_code ?? ''} ${formattedAddress.city ?? formattedAddress.region}`,
      localidad : formattedAddress.city as string,
      provincia : formattedAddress.region as string,
      codigo_postal: formattedAddress.postal_code as string,
      numero: formattedAddress.street_number as string,
      calle: formattedAddress.street as string,
    }
};

export const GPS = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };
  return new Promise(((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  }));
};

export const geoposicionar = async (lat?: string, lng?: string, address?: string) => {
  try {
    const key : string = process.env.VUE_APP_GOOGLE_MAPS_API_KEY as string

    let params : any = {
      key
    }
    if(lat && lng){
      
      params.latlng = `${lat},${lng}`;
    } else if(address){
      params.address = address
    }

    const response = await request({
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      method: 'GET',
      params,
      // @ts-ignore
    })

    return response.data

  } catch (error) {
    
    console.error('Error al obtener información de la ubicación:', error);
  }
};

export const formatearGeposiciones = (data: any) => {
  const [item] = data.results;
  return {
    formatted_address : item.formatted_address,
    lat: item.geometry.location.lat,
    lng: item.geometry.location.lng,
  }
}

export const direccionLegible = ( data: FormateadorGoogleAddressModel, direccionAuxiliar : string) : string => {

  if(data.calle && data.numero){
    return `${data.calle} ${data.numero}`
  }
  return `${direccionAuxiliar}`
}