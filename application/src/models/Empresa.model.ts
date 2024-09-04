export interface EmpresaModel {
    id: number;
    razon_social: string;
    codigo: string;
    numero_documento: string;
    tipo_documento_id: number;
    tipo_empresa_id: number;
    usuario_rol_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string
    usuario_id: number
    depositos: DepositoModel[]
}

export interface DepositoModel {
    id: string;
    empresa_id: string;
    direccion: string;
    codigo_postal: string;
    observacion:string;
    lat: number;
    lng: number;
    created_at: string;
    updated_at: string;
}

export interface EmpresaCreateRequestModel {
    nombre: string
}