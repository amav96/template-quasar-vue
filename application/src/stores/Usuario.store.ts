import { defineStore } from 'pinia';
import { UsuarioModel } from 'src/models/Usuario.model';
import AutenticacionRepository from 'src/repositories/Autenticacion.repository';

import { _KEY_TOKEN } from 'src/utils/Keys';
import { getPreference, removePreference, setPreference } from 'src/utils/Preferences';
import { ROLES } from 'src/utils/Roles';

interface UsuarioStore {
    token: string;
    usuario: null | UsuarioModel,
    loadingAuth: boolean;
    abilities: string[],
    leftDrawerOpen: boolean
}

const autenticacionRepository = new AutenticacionRepository()

export const useUsuarioStore = defineStore('usuario', {
  state: () : UsuarioStore => ({
    token: '',
    usuario: null,
    loadingAuth: false,
    abilities: [],
    leftDrawerOpen: false
  }) ,
  getters: {
    esEmpresa(state){
      if(state.usuario?.role_id){
        return [ROLES.ADMINISTRADOR_EMPRESA, ROLES.CAC_EMPRESA].includes(state.usuario.role_id)
      } else {
        return false;
      }
    },
    esOperador(state){
      if(state.usuario?.role_id){
        return [ROLES.ADMINISTRADOR, ROLES.OPERADOR_ZONA].includes(state.usuario.role_id)
      } else {
        return false;
      }
    }
  },
  actions: {
    setUsuario (usuario: UsuarioModel) {
        this.usuario = usuario
    },
    async getToken(){
      if(!this.token){
        let tokenAutenticado = await getPreference(_KEY_TOKEN)
        if(tokenAutenticado){
          this.setToken(tokenAutenticado);
        } else {
          console.error("Empty token");
        }
      }
    },
    setToken (token: string) {
        this.token = token
        setPreference(_KEY_TOKEN, token)
    },
    setAbilities (permisos: string[]) {
      this.abilities = permisos;
    },
    async logout(){
      this.token = ''
      // @ts-ignore
      this.usuario = null
      await removePreference(_KEY_TOKEN)
    },
    autorizado(permiso?: string | string[]){

      return this.abilities?.some((p: any) => p.name === permiso)
    },
    async usuarioAutenticado(): Promise<boolean> {
      
      if(!this.usuario || !this.token){
        let tokenAutenticado = await getPreference(_KEY_TOKEN)
        if(!tokenAutenticado){
          return false
        } 
        return true
      } else {
        return true
      }
    },
    
    async getUsuario(){
      if(!this.usuario){
        try {
          this.loadingAuth = true;
          const response = await autenticacionRepository.autenticado()
          const { user, token, abilities } = response;
          this.setUsuario(user)
          this.setToken(token)
          this.setAbilities(abilities)
          return this.usuario
        } catch (error) {
            console.log(error)
        } finally {
            this.loadingAuth = false;
        }
      } else {
        return this.usuario
      }

    },

  },
});
