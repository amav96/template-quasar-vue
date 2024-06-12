
import { LocalidadModel } from 'src/models/DataProvider.model';
import request from 'src/utils/ApiResponse.helper';
import { API_BASE_URL } from 'src/utils/BaseUrl'

export default class DataProviderRepository {

    async getCodigosArea() {
        try {
          const response = await request({
            url: API_BASE_URL + `/api/codigos-area`,
            method: 'GET',
            auth: true
          });
     
          return response.data;
    
        } catch (error) {
          throw error
        }
    }

    async getPaises(params: any){
      try {
        const response = await request({
          url: API_BASE_URL + `/v1/location/countries`,
          method: 'GET',
          auth: true,
          params
        });
   
        return response.data;
  
      } catch (error) {
        throw error
      }
    }

    async provinciasPorPaisId(params: any) : Promise<any>{
      try {
        const response = await request({
          url: API_BASE_URL + `/v1/location/provincesByCountryId`,
          method: 'GET',
          auth: true,
          params
        });
       
        return response.data;
  
      } catch (error) {
        throw error
      }
    }

    async getLocalidadesPorProvinciaId(params: any) : Promise<{ localities: LocalidadModel[]}>{
      try {
        const response = await request({
          url: API_BASE_URL + `/v1/location/localitiesByProvinceId`,
          method: 'GET',
          auth: true,
          params
        });
   
        return response.data;
  
      } catch (error) {
        throw error
      }
    }

    async getCodigosPostales(params: any) : Promise<any>{
      try {
        const response = await request({
          url: API_BASE_URL + `/v1/location/postalCodes`,
          method: 'GET',
          auth: true,
          params
        });
   
        return response.data;
  
      } catch (error) {
        throw error
      }
    }

    async getAreaCodes(params: any) : Promise<any>{
      try {
        const response = await request({
          url: API_BASE_URL + `/v1/location/areaCodes`,
          method: 'GET',
          auth: true,
          params
        });
   
        return response.data;
  
      } catch (error) {
        throw error
      }
    }

    async getContactChannels(params: any) : Promise<any>{
      try {
        const response = await request({
          url: API_BASE_URL + `/v1/contact-channels`,
          method: 'GET',
          auth: true,
          params
        });
   
        return response.data;
  
      } catch (error) {
        throw error
      }
    }

    async getEstadosEquipos(params: any) : Promise<any>{
      try {
        const response = await request({
          url: API_BASE_URL + `/v1/equipmentStates`,
          method: 'GET',
          auth: true,
          params
        });
   
        return response.data;
  
      } catch (error) {
        throw error
      }
      
    }

    async getEmpresas(params: any) : Promise<any>{
      try {
        const response = await request({
          url: API_BASE_URL + `/v2/empresas`,
          method: 'GET',
          auth: true,
          params
        });
   
        return response.data;
  
      } catch (error) {
        throw error
      }
    }

    async getRoles(params: any) : Promise<any>{
      try {
        const response = await request({
          url: API_BASE_URL + `/v2/roles`,
          method: 'GET',
          auth: true,
          params
        });
   
        return response.data;
  
      } catch (error) {
        throw error
      }
    }
}