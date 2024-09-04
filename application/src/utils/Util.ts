export const getId = () => {
    const randomNumber = Math.floor(Math.random() * 10000); // Genera un número aleatorio de 4 dígitos
    const currentSeconds = Math.floor(Date.now() / 1000);

    return currentSeconds + '_' + randomNumber
}

export const getHoraLlegadaEstimada = (hora_llegada_estimada: string) => {
    let horaTransformada = ''
    if(hora_llegada_estimada){
        let lastCharIndex = hora_llegada_estimada.length;
        horaTransformada = hora_llegada_estimada.substring(lastCharIndex - 8, lastCharIndex)
    }

    return horaTransformada;
}

export const getDiaActual = () => {
    let fechaActual = new Date();
    let dia = fechaActual.getDate().toString().padStart(2, '0');
    let mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
    let año = fechaActual.getFullYear().toString(); // Obtiene los últimos 2 dígitos del año

    let fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada
}

export function camelCaseToSnakeCase(obj: any): any {
    if (!obj) {
        return {};
    }
    return Object.keys(obj).reduce((acc, key) => {
        const modifiedKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        acc[modifiedKey as keyof Object] = obj[key];
        return acc;
    }, {});
}

export const getFiltros = (filtros: any) => {
    let filtrosData = {...filtros};
    for(let key in filtrosData){
        if(filtrosData[key] === null || filtrosData[key] === ''){
            delete filtrosData[key]
        }
    }
    return objectKeysToSnakeCase(filtrosData);
}

export function toSnakeCase(str : string) {
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function objectKeysToSnakeCase(obj: any) {
    const newObj: { [key: string]: any } = {}; // Add type annotation to newObj
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[toSnakeCase(key) as keyof object] = obj[key];
        }
    }
    return newObj;
}

type ErrorResponse = {
    code: string;
    messages: Record<string, string[]>;
};

type ErrorObject = {
    property: string;
    message: string;
};

export function getErrors(response: ErrorResponse): ErrorObject[] {
    const errors: ErrorObject[] = [];
    for (const property in response.messages) {
        if (response.messages.hasOwnProperty(property)) {
            const messages = response.messages[property];
            messages.forEach(message => {
                errors.push({ property, message });
            });
        }
    }
    return errors;
}

export function keyByProperty<T extends { [key: string]: any }>(array: T[], key: keyof T = "id"): Record<string, T> {
    return array.reduce((acc: Record<string, T>, item: T) => {
        acc[item[key] as string] = item;
        return acc;
    }, {} as Record<string, T>);
}