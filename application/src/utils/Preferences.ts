import { Preferences } from '@capacitor/preferences';

export const setPreference = async (key: string, value: string) => {
    return await Preferences.set({
        key,
        value
    });
}

export const getPreference = async (key: string) => {
    const ret = await Preferences.get({ key });
    if(!ret || !ret.value) {
        return null
    }

    return ret.value;
}

export const removePreference = async (key: string) => {
    await Preferences.remove({ key });
}
