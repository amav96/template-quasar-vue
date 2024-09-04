import { CapacitorHttp, HttpResponse, HttpHeaders } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

export interface ApiRequest<T = any> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: T;
  extraHeaders?: { [key: string]: string };
  params?: { [key: string]: string };
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text' | 'document';
  auth?: boolean;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  headers: HttpHeaders;
}

const request = async (call: ApiRequest): Promise<ApiResponse> => {
  try {

    const options : any = {
      url: call.url,
      method: call.method,
      data: call.data,
      params: call.params,
      headers: {
        ...call.extraHeaders,
      },
    };
    

    if (call.auth) {
      const tokenAutenticado = await Preferences.get({ key: '_token' });

      if (tokenAutenticado.value && options.headers) {
        options.headers['Authorization'] = `Bearer ${tokenAutenticado.value}`;
      }
    }
    
    const response: HttpResponse = await makeCapacitorHttpCall(options);
    
    if(response.status > 300){
      throw response
    }
    

    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
} catch (error: any) {

    throw {
      data: error.data,
      status: error.status,
      headers: error.headers,
    };
  }
};

const makeCapacitorHttpCall = async (options: any): Promise<HttpResponse> => {
  try {
    switch (options.method) {
      case 'GET':
        return await CapacitorHttp.get(options);
      case 'POST':
        return await CapacitorHttp.post(options);
      case 'PUT':
        return  await CapacitorHttp.put(options);
      case 'PATCH':
        return await CapacitorHttp.patch(options);
      case 'DELETE':
        return await CapacitorHttp.delete(options);
      default:
        throw new Error(`Unsupported HTTP method: ${options.method}`);
    }
  } catch (capacitorError) {
    console.log(capacitorError)
    throw capacitorError
  }
 
};

export default request;