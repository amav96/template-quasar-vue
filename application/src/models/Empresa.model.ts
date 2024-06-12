import { LocalidadModel, PaisModel, ProvinciaModel } from "./DataProvider.model";

export interface EmpresaModel {
    id: number;
    country_id: number;
    name: string;
    logo: string;
    enterprise_contact: string | null;
    country_contact: string;
    signature: number;
    image: number;
    created_at: string;
    updated_at: string;
}

export interface SucursalEmpresaForm {
    paisId: number | null;
    provinciaId: number | null;
    localidadId: number | null;
    direccion: string;
    nombre: string;
    empresaId: number | null;
}


export interface SucursalEmpresaModel {
    id: number;
    empresa_id: number;
    nombre: string;
    pais_id: number;
    pais: PaisModel;
    provincia_id: number;
    provincia: ProvinciaModel;
    localidad_id: number;
    localidad: LocalidadModel;
    direccion: string;
    created_at: string;
    updated_at: string;
}

export interface SucursalEmpresaUsuarioModel {
    id: number;
    sucursal_id: number;
    created_at: string;
    updated_at: string;
    sucursal_empresa: SucursalEmpresaModel;
}


export interface SucursalEmpresaPaginationModel {
    current_page: number;
    data: SucursalEmpresaModel[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}