export interface ProvinciaModel {
    country_id: number;
    id: number;
    name: string;
}

export interface PaisModel {
    
    id: number;
    name: string;
    code: string;
    prefix: string;
    minZipCode: number;
    maxZipCode: number;
    lengthPhoneNumber: number;
    taxPayer: string;
    prefixTaxPayer: string;
    text_contact: string;
      
}


export interface LocalidadModel {
    id: number;
    name: string;
    country_id: number;
    province_id: number;
    created_at: string | null;
    updated_at: string | null;
}


export interface PostalCodeModel {
    country_id: number;
    id: number;
    locality_id: number;
    locality: LocalidadModel;
    province_id: number;
    updated_at: string | null ;
    created_at: string | null ;
    postalCode: number
}

export interface PaginationModel {
    current_page: number;
    page_count: number;
    has_next_page: boolean;
    count: number;
    limit: number;
}