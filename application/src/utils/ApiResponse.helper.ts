import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosResponseHeaders,
    ResponseType
} from 'axios';
import { Preferences } from '@capacitor/preferences';
import { API_BASE_URL } from './BaseUrl';
import { _KEY_TOKEN } from './Keys';

export interface ApiRequest<T = any> {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: T;
    extraHeaders?: { [key: string]: string };
    params?: URLSearchParams;
    responseType?: ResponseType;
    auth?: boolean
}

export interface ApiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: AxiosResponseHeaders;
}

const instance = axios.create({ baseURL: process.env.API_BASE_URL || API_BASE_URL });

const request = (call: ApiRequest): Promise<ApiResponse> => {
    return new Promise(async (resolve, reject) => {
        const onSuccess = (response: AxiosResponse) => {
            resolve({
                data: response.data,
                status: response.status,
                statusText: response.statusText,
                //@ts-ignore
                headers: response.headers
            });
        };

        const onError = (err: AxiosError) => {
            reject({
                data: err.response?.data,
                status: err.response?.status,
                statusText: err.response?.statusText,
                headers: err.response?.headers
            });
        };

        const axiosCall: AxiosRequestConfig = {
            url: call.url,
            method: call.method,
            data: call.data,
            params: call.params as any,
            responseType: call.responseType,
            headers: {
               
                ...call.extraHeaders
            }
        };

        if(call.auth){
            let tokenAutenticado = await Preferences.get({ key: _KEY_TOKEN });
            if (tokenAutenticado.value && axiosCall.headers) {
                axiosCall.headers['Authorization'] = `Bearer ${tokenAutenticado.value}`;
            }
        }


        instance(axiosCall).then(onSuccess).catch(onError);
    });
};

export default request;
