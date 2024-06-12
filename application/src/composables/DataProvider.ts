
import { LocalidadModel, PostalCodeModel, ProvinciaModel } from 'src/models/DataProvider.model';
import { EmpresaModel } from 'src/models/Empresa.model';
import { RolModel } from 'src/models/Usuario.model';
import DataProviderRepository from 'src/repositories/DataProvider.repository';
import { ref } from 'vue'

const dataProviderRepository = new DataProviderRepository();

const paises = ref<any>([])
const provincias = ref<ProvinciaModel[]>([])
const localidades = ref<LocalidadModel[]>([])
const codigosPostales = ref<any[]>([])
const areaCodes = ref<any[]>([])
const contactChannels = ref<any[]>([])
const estadosEquipos = ref<any[]>([])
const empresas = ref<EmpresaModel[]>([])
const roles = ref<RolModel[]>([])

export function useDataProvider() {

   const getEstadosEquipos = async (params: any = {}) => {
    if(estadosEquipos.value.length === 0){
       
        const response = await dataProviderRepository.getEstadosEquipos(params);
        estadosEquipos.value = response.equipment_states
        return estadosEquipos.value
    } else {
        return estadosEquipos.value
    }
   }

   const getPaises = async (params: any = {}) => {
    if(paises.value.length === 0){
        const response = await dataProviderRepository.getPaises(params);
        paises.value = response.countries;
        return paises.value
    } else {
        return paises.value
    }
   }
   const provinciasPorPaisId = async (params: any = {}) : Promise<ProvinciaModel[]> => {
    if(provincias.value?.length === 0){
        const response = await dataProviderRepository.provinciasPorPaisId(params);
        provincias.value = response.provinces;
        return provincias.value
    } else {
        return provincias.value
    }
   }

   const getLocalidadesPorProvinciaId = async (params: any = {}) : Promise<ProvinciaModel[]> => {
    if(localidades.value?.length === 0){
        const response = await dataProviderRepository.getLocalidadesPorProvinciaId(params);
        localidades.value = response.localities;
        return localidades.value
    } else {
        return localidades.value
    }
   }

   const getCodigosPostales = async (params: any = {}) : Promise<PostalCodeModel[]> => {
    if(codigosPostales.value?.length === 0){
        const response = await dataProviderRepository.getCodigosPostales(params);
        codigosPostales.value = response.postalCodes;
        return codigosPostales.value
    } else {
        return codigosPostales.value
    }
   }

   const getAreaCodes  = async (params: any = {}) : Promise<ProvinciaModel[]> => {
    if(areaCodes.value?.length === 0){
        const response = await dataProviderRepository.getAreaCodes(params);
        areaCodes.value = response.areaCodes;
        return areaCodes.value
    } else {
        return areaCodes.value
    }
   }

   const getContactChannels  = async (params: any = {}) : Promise<ProvinciaModel[]> => {
    if(contactChannels.value?.length === 0){
        const response = await dataProviderRepository.getContactChannels(params);
        contactChannels.value = response.contact_channels;
        return contactChannels.value
    } else {
        return contactChannels.value
    }
   }

   const getEmpresas  = async (params: any = {}) : Promise<EmpresaModel[]> => {
    if(empresas.value?.length === 0){
        const response = await dataProviderRepository.getEmpresas(params);
        empresas.value = response;
        return empresas.value
    } else {
        return empresas.value
    }
   }

   const getRoles  = async (params: any = {}) : Promise<RolModel[]> => {
    if(roles.value?.length === 0){
        const response = await dataProviderRepository.getRoles(params);
        roles.value = response;
        return roles.value
    } else {
        return roles.value
    }
   }    


  return { 
    paises,
    getPaises,
    provinciasPorPaisId,
    provincias,
    getLocalidadesPorProvinciaId,
    localidades,
    codigosPostales,
    getCodigosPostales,
    areaCodes,
    getAreaCodes,
    getContactChannels,
    contactChannels,
    estadosEquipos,
    getEstadosEquipos,
    empresas,
    getEmpresas,
    roles,
    getRoles

   }
}