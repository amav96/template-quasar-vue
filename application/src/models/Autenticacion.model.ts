export interface LoginModel {
    email: string,
    password: string,
}

export interface RegistrarRequestModel {
    nombre: string;
    email: string;
    password: string;
    pais_id: number;
    rol_id: number
}

export interface GoogleAuthLoginRequest {
    token: string
}

export interface GoogleAuthRegistrarRequest {
    token: string
}