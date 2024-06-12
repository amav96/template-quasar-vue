export const getId = () => {
    const randomNumber = Math.floor(Math.random() * 10000); // Genera un número aleatorio de 4 dígitos
    const currentSeconds = Math.floor(Date.now() / 1000);

    return currentSeconds + '_' + randomNumber
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

export function getError(error: any) {
    return JSON.stringify(error.data.messages)
}