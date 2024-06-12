import { LoginRequest } from 'src/models/Autenticacion.model';
import { UsuarioModel } from 'src/models/Usuario.model';
import request from 'src/utils/ApiResponse.helper';

import { API_BASE_URL } from 'src/utils/BaseUrl'

export default class AutenticacionRepository {

   async login (form : LoginRequest){
        try {
            const response = await request({
                url: API_BASE_URL + '/v1/authentication/login',
                method: 'POST',
                data: form
            });
            return response.data;
        } catch (error: any) {
            throw error
        }
   }

   async autenticado () : Promise<{
    user: UsuarioModel,
    token: string;
    abilities: string[]
   }> {
        try {
            const response = await request({
                url: API_BASE_URL + '/v1/authentication/checkToken',
                method: 'GET',
                auth: true
            });
            return response.data;
        } catch (error: any) {
            throw error
        }
    }

    async logout () : Promise<any> {
        try {
            const response = await request({
                url: API_BASE_URL + '/v1/authentication/logout',
                method: 'GET',
                auth: true
            });
            return response.data;
        } catch (error: any) {
            throw error
        }
    }


}