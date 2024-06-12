import Compressor from 'compressorjs';

export function base64ToFile(base64String: string, filename: string, mimeType: string): Promise<File> {
    return new Promise((resolve, reject) => {
        // Decodifica la cadena base64 en un ArrayBuffer
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const arrayBuffer = new ArrayBuffer(byteArray.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        uint8Array.set(byteArray);

        // Crea un Blob a partir del ArrayBuffer
        const blob = new Blob([arrayBuffer], { type: mimeType });

        // Crea un objeto File a partir del Blob
        const file = new File([blob], filename, { type: mimeType });

        // Resuelve la promesa con el objeto File
        resolve(file);
    });
}

export const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.2,
        maxWidth: 720, // Máximo ancho permitido
        maxHeight: 720, // Máxima altura permitida
        success(result : File) {
          resolve(result);
        },
        error(err) {
          console.error(err.message);
          reject(err);
        },
      });
    });
    };