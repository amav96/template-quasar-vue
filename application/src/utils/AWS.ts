
import axios from 'axios';

export const uploadFileToS3 = async (signedURL: string, file: File) => {
  try {
    const response = await axios.put(signedURL, file, {
      headers: {
        'Content-Type': file.type, // Asegúrate de establecer el encabezado Content-Type correcto
      },
    });
    if (response.status < 300) {
      return response; // Retorna la respuesta si la carga es exitosa
    } else {
      throw new Error('Error al cargar el archivo success');
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error en la carga del archivo');
  }
};