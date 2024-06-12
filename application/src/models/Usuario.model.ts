import { PaisModel, ProvinciaModel } from "./DataProvider.model";
import { SucursalEmpresaUsuarioModel } from "./Empresa.model";
import { Enterprise } from "./Equipo.model";

export interface UsuarioModel {
    id: number;
    firstName: string;
    lastName: string;
    fantasyName: string | null;
    email: string;
    email_verified_at: string;
    documentType: string;
    documentNumber: string;
    taxPayerIdentificationNumber: string;
    street: string;
    streetHeight: string;
    lat: number | null;
    lng: number | null;
    locality_id: number;
    province_id: number;
    country_id: number;
    postalCode: number;
    user_state_id: number;
    role_id: number;
    prefix: string;
    phoneNumber: string;
    tool_id: number;
    brand: string | null;
    patent: string | null;
    down_at: string | null;
    operator_id: number;
    recommended_id: number;
    unsubscribed_motives_id: number | null;
    avatar: string;
    frontDocument: string;
    backDocument: string;
    taxPayer: string;
    proofOfAddress: string;
    local: string | null;
    signature: string;
    enterprise_id: number | null;
    enterprise: Enterprise
    completed_at: string;
    up_at: string;
    created_at: string;
    updated_at: string;
    sucursales_empresas_usuarios: SucursalEmpresaUsuarioModel[],
    country: PaisModel;
    province: ProvinciaModel;
    user_state: {
        color: string;
        id: number;
        name: string
    }
    
}

export interface UsuarioEmpresaForm {
    nombre: string
    apellido: string
    email: string
    paisId: number | null
    empresaId: number | null
    sucursalId: number | null
    rolId: number | null
    password: string | null
}


export interface BranchModel {
    id: number;
    user_id: number;
    operator_id: number | null;
    country_id: number;
    province_id: number;
    locality_id: number;
    coverage_type_id: number;
    address: string;
    postalCode: string;
    lat: number;
    lng: number;
    created_at: string | null;
    updated_at: string;
    deleted_at: string | null;
}

export interface ScheduleModel {
    id: number;
    name: string;
    from: string;
    until: string;
}

export interface WorkScheduleModel {
    id: number;
    user_id: number;
    day_id: number;
    schedule_id: number;
    created_at: string;
    updated_at: string;
    day: {
        id: number;
        name: string;
    };
    schedule: ScheduleModel;
}

export interface WorkScheduleResponse {
  work_schedules: WorkScheduleModel[];
}

export interface RolModel {
    id: number;
    name: string;
    code: string
}