import { EmpresaModel } from "./Empresa.model";
import { PaisModel } from "./Pais.model";
import { RolModel } from "./Rol.model";
import { UsuarioEmpresaModel } from "./UsuarioEmpresa.model";


export interface UsuarioConsumoModel {
    id: number;
    cantidad_optimizar: number;
    consumo_optimizar: number;
    cantidad_detectar: number;
    consumo_detectar: number;
    cantidad_polyline: number;
    consumo_polyline: number;
    paradas_hoy: number;
    paradas_total: number;
    usuario_id: string;
    created_at: string;
    updated_at: string
}

export interface UsuarioModel {
    id: string;
    nombre: string;
    email :string;
    created_at: string;
    updated_at: string;
    empresas: UsuarioEmpresaModel[];
    pais_id: number;
    rol_id: number;
    rol?: RolModel;
    pais: PaisModel,
    usuarioConsumo : UsuarioConsumoModel,
    actualizacion: string,
    version: string,
    permisos: string[],
    configuraciones : UsuarioConfiguracionModel
}


export interface UsuarioResponseWithPagination {
    data: UsuarioModel[],
    has_more: boolean;
    last_page: number;
    page: number;
    total_pages: number;
    total_results: number;
}

export interface UsuarioRequest {
    empresaId?: number;
}

export interface UpdateUsuarioRequest {
    nombre: string;
    pais_id: number
}
export interface UpdateUsuarioResponse extends UpdateUsuarioRequest {
    pais: PaisModel
}

export interface UsuarioConfiguracionModel {
    id: number;
    precio_item: number;
    total_valor_items_acumulado: number;
    empresa_operativa_id: number;
    empresa_operativa: EmpresaModel;
   
}
export interface UsuarioConfiguracionForm {
    precio_item: boolean | number;
    total_valor_items_acumulado: boolean | number; 
}

export interface UsuarioConfiguracionRequest {
    precio_item: boolean | number;
    total_valor_items_acumulado: boolean | number; 
    usuario_id: number
}